import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../config/FirebaseConfig.js';  // Adjust the import path if necessary

// Sample Business Data
const newBusinesses = [
  {
    name: "Shopping",
    category: "Shopping",
    address: "123 Market St, Los Angeles",
    description: "Your one-stop shop for all daily needs.",
    icon: "https://cdn-icons-png.flaticon.com/128/2769/2769448.png", // Shopping icon
    imageUrl: "https://images.pexels.com/photos/3965549/pexels-photo-3965549.jpeg" // Real shopping image
  },
  {
    name: "Plumber",
    category: "Services",
    address: "456 Waterway Rd, San Francisco",
    description: "Professional plumbing services for all your needs.",
    icon: "https://cdn-icons-png.flaticon.com/128/4417/4417534.png", // Plumber icon
    imageUrl: "https://images.pexels.com/photos/7441597/pexels-photo-7441597.jpeg" // Real plumber image
  },
  {
    name: "Beauty Salons",
    category: "Beauty",
    address: "789 Glam Ave, New York",
    description: "Top-notch beauty services and salon treatments.",
    icon: "https://cdn-icons-png.flaticon.com/128/1057/1057317.png", // Beauty icon
    imageUrl: "https://images.pexels.com/photos/3993442/pexels-photo-3993442.jpeg" // Real beauty salon image
  },
  {
    name: "Shoes",
    category: "Fashion",
    address: "321 Footwear Blvd, Miami",
    description: "Stylish and comfortable shoes for every occasion.",
    icon: "https://cdn-icons-png.flaticon.com/128/2742/2742674.png", // Shoes icon
    imageUrl: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" // Real shoes image
  },
  {
    name: "Clothing",
    category: "Fashion",
    address: "654 Fashion St, Chicago",
    description: "Latest trends in clothing for men and women.",
    icon: "https://cdn-icons-png.flaticon.com/128/9752/9752702.png", // Clothing icon
    imageUrl: "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg" // Real clothing image
  },
  {
    name: "Laptop",
    category: "Technology",
    address: "987 Tech Park, Seattle",
    description: "Latest laptops and tech gadgets available.",
    icon: "https://cdn-icons-png.flaticon.com/128/428/428001.png", // Laptop icon
    imageUrl: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg" // Real laptop image
  },
  {
    name: "Gym ",
    category: "Fitness",
    address: "102 Fitness Ave, Dallas",
    description: "Your go-to place for fitness and wellness.",
    icon: "https://cdn-icons-png.flaticon.com/128/6793/6793958.png", // Gym icon
    imageUrl: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg" // Real gym image
  },
  {
    name: "Home Cleaning",
    category: "Cleaning",
    address: "321 Clean St, Boston",
    description: "Professional home cleaning services.",
    icon: "https://cdn-icons-png.flaticon.com/128/2829/2829848.png", // Cleaning icon
    imageUrl: "https://images.pexels.com/photos/7018471/pexels-photo-7018471.jpeg" // Real cleaning service image
  },
  {
    name: "Digital Marketing",
    category: "Marketing",
    address: "213 Marketing Rd, Atlanta",
    description: "Experts in digital marketing strategies.",
    icon: "https://cdn-icons-png.flaticon.com/128/7271/7271639.png", // Marketing icon
    imageUrl: "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg" // Real marketing agency image
  },
  {
    name: "Coffee Shop",
    category: "Food & Drink",
    address: "45 Brew St, Portland",
    description: "Cozy coffee shop for your caffeine fix.",
    icon: "https://cdn-icons-png.flaticon.com/128/3010/3010061.png", // Coffee shop icon
    imageUrl: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg" // Real coffee shop image
  },
  {
    name: "Book Store",
    category: "Education",
    address: "125 Paper Rd, Boston",
    description: "A wide selection of books and educational material.",
    icon: "https://cdn-icons-png.flaticon.com/128/2932/2932584.png", // Bookstore icon
    imageUrl: "https://images.pexels.com/photos/3184470/pexels-photo-3184470.jpeg" // Real bookstore image
  },
  {
    name: "Restaurant",
    category: "Food & Drink",
    address: "321 Gourmet St, Las Vegas",
    description: "Fine dining experience with international cuisines.",
    icon: "https://cdn-icons-png.flaticon.com/128/3081/3081394.png", // Restaurant icon
    imageUrl: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg" // Real restaurant image
  },
  {
    name: "Auto Repair",
    category: "Services",
    address: "587 Motorway Rd, Detroit",
    description: "Professional car repair and maintenance services.",
    icon: "https://cdn-icons-png.flaticon.com/128/4247/4247419.png", // Auto repair icon
    imageUrl: "https://images.pexels.com/photos/3807369/pexels-photo-3807369.jpeg" // Real auto repair shop image
  }
];

// Export the function
export const addBusinessesToExistingCollection = async () => {
  try {
    // Fetch existing businesses from the "category" collection
    const existingBusinesses = await getDocs(collection(db, "category"));
    const existingNames = existingBusinesses.docs.map(doc => doc.data().name);

    for (const business of newBusinesses) {
      // Check if the business name already exists
      if (!existingNames.includes(business.name)) {
        // Add the new business to the "category" collection
        const docRef = await addDoc(collection(db, "category"), business);
        console.log("Business added with ID: ", docRef.id);
      } else {
        console.log(`Business ${business.name} already exists, skipping.`);
      }
    }
  } catch (error) {
    console.error("Error adding business: ", error);
  }
};
