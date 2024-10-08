import { View, Text, Image, StyleSheet, TouchableOpacity, Share, Linking } from 'react-native';
import React from 'react';

export default function ActionButton({ businessDetail }) {
    const Actions = [
        {
            id: 1,
            icon: require('../../../assets/images/call.png'),
            name: 'Call',
            contact: businessDetail.contact,
        },
        {
            id: 2,
            icon: require('../../../assets/images/pin.jpg'),
            name: 'Location',
            address: businessDetail.address,
        },
        {
            id: 3,
            icon: require('../../../assets/images/share.png'),
            name: 'Share',
            // You can add the business name or any relevant text to share
            shareText: `Check out ${businessDetail.name}: ${businessDetail.address || 'No website available'}`,
        },
        {
            id: 4,
            icon: require('../../../assets/images/website.png'),
            name: 'Website',
            website: businessDetail.website
        },
    ];

    const handleShare = async (shareText) => {
        try {
            await Share.share({
                message: shareText,
            });
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    return (
        <View style={styles.container}>
            {Actions.map((btn) => {
                return (
                    <TouchableOpacity
                        key={btn.id}
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (btn.contact) {
                                Linking.openURL(`tel:${btn.contact}`);
                            }else if (btn.address) {
                                // Open Google Maps with the address
                                const formattedAddress = encodeURIComponent(btn.address);
                                const url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
                                Linking.openURL(url).catch((err) => console.error("Error opening maps:", err));
                            }else if (btn.shareText) {
                                handleShare(btn.shareText);
                            } else if (btn.website) {
                                Linking.openURL(btn.website);
                            } else {
                                console.log('No action defined for ' + btn.name);
                            }
                        }}
                    >
                        <Image source={btn.icon} style={styles.icon} />
                        <Text style={styles.buttonText}>{btn.name}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        alignItems: 'center',
        padding: 10,
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    buttonText: {
        fontFamily: 'outfit-medium',
        fontSize: 18,
        color: '#333',
    },
});
