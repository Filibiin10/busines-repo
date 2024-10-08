import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../../constants/Colors';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';

export default function Reviews({ businessDetail, businessid }) {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const q = query(collection(db, 'BusinessList', businessid, 'reviews'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [businessid]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const timestamp = new Date();
      await addDoc(collection(db, 'BusinessList', businessid, 'reviews'), {
        rating,
        comment,
        userName: user?.fullName || 'Anonymous',
        userId: user.id,
        userImage: user.imageUrl,
        businessName: businessDetail.name,
        timestamp,
      });

      setComment('');
      setRating(4);

      setSuccessMessage(`Thank you for reviewing ${businessDetail.name}! Your review has been submitted.`);
    } catch (error) {
      console.error('Error adding review: ', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontFamily: 'outfit-bold', marginBottom: 20 }}>Reviews</Text>

      <View style={{ marginTop: 10 }}>
        <Rating
          type="star"
          imageSize={30}
          startingValue={rating}
          onFinishRating={setRating}
        />
      </View>

      <View style={{ marginTop: 15 }}>
        <TextInput
          style={{
            paddingHorizontal: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            fontSize: 16,
            fontFamily: 'outfit',
            height: 100,
          }}
          placeholder="Enter your comment"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting || comment.trim() === ''}
          style={{
            backgroundColor: isSubmitting ? '#ccc' : Colors.PRIMARY,
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{
            fontSize: 18,
            fontFamily: 'outfit-bold',
            color: '#fff',
          }}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>

      {successMessage !== '' && (
        <View style={{ marginTop: 20, padding: 15, backgroundColor: '#e0f7fa', borderRadius: 8 }}>
          <Text style={{ fontFamily: 'outfit', fontSize: 16, color: '#00796b' }}>
            {successMessage}
          </Text>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                marginTop: 15,
                backgroundColor: '#fff',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 5 },
                shadowRadius: 5,
                elevation: 3,
                borderWidth: 1,
                borderColor: '#ddd',
              }}
            >
              <Image
                source={{ uri: item.userImage }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 15,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 16, marginBottom: 5 }}>
                  {item.userName}
                </Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 12, color: '#777', marginBottom: 5 }}>
                  {moment(item.timestamp.toDate()).fromNow()}
                </Text>
                <Rating
                  type="star"
                  imageSize={20}
                  readonly
                  startingValue={item.rating}
                  style={{ marginBottom: 10 }}
                />
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: '#333' }}>
                  {item.comment}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
