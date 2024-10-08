import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../config/FirebaseConfig.js';

const BusinessList = [
  {
    name: "Modern Clothing Center",
    category: "Shopping",
    contact: "123-456-7890",
    address: "456 Fashion Ave, New York, NY",
    imageUrl: "https://img.freepik.com/free-photo/fashion-store-clothing-rack_1098-21015.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/clothes.png",
    about: "A trendy store offering the latest in modern fashion.",
    website: "https://www.modernclothingcenter.com"
  },
  {
    name: "Tech Gadgets Store",
    category: "Electronics",
    contact: "987-654-3210",
    address: "789 Tech St, San Francisco, CA",
    imageUrl: "https://img.freepik.com/free-photo/electronic-store-with-modern-gadgets_23-2148499312.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/laptop.png",
    about: "Your one-stop shop for all the latest tech gadgets.",
    website: "https://www.techgadgets.com"
  },
  {
    name: "Fresh Organic Market",
    category: "Groceries",
    contact: "555-123-4567",
    address: "123 Greenway Blvd, Los Angeles, CA",
    imageUrl: "https://img.freepik.com/free-photo/organic-fruits-vegetables-basket_23-2148474885.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/vegetable.png",
    about: "A market specializing in fresh organic produce.",
    website: "https://www.freshorganicmarket.com"
  },
  {
    name: "Home Decor Boutique",
    category: "Home Goods",
    contact: "333-444-5555",
    address: "321 Decor Ave, Miami, FL",
    imageUrl: "https://img.freepik.com/free-photo/home-interior-with-modern-furniture_23-2148489255.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/home.png",
    about: "Unique home decor items to enhance your living space.",
    website: "https://www.homedecorboutique.com"
  },
  {
    name: "Fitness Hub",
    category: "Health & Fitness",
    contact: "888-999-0000",
    address: "654 Fit St, Chicago, IL",
    imageUrl: "https://img.freepik.com/free-photo/woman-doing-yoga-exercise-gym_23-2148503474.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/weightlifting.png",
    about: "A fitness center that offers a variety of classes and training.",
    website: "https://www.fitnesshub.com"
  },
  {
    name: "Gourmet Coffee Shop",
    category: "Cafes",
    contact: "444-555-6666",
    address: "987 Brew St, Seattle, WA",
    imageUrl: "https://img.freepik.com/free-photo/coffee-shop-interior-with-coffee-ingredients_23-2148506911.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/coffee.png",
    about: "A cozy cafe serving gourmet coffee and pastries.",
    website: "https://www.gourmetcoffeeshop.com"
  },
  {
    name: "Pet Supply Store",
    category: "Pet Services",
    contact: "222-333-4444",
    address: "111 Pet Lane, Austin, TX",
    imageUrl: "https://img.freepik.com/free-photo/pet-supply-store-with-dog-accessories_23-2148499736.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/pet.png",
    about: "Everything you need for your furry friends.",
    website: "https://www.petsupplystore.com"
  },
  {
    name: "Craft Beer Brewery",
    category: "Food & Beverage",
    contact: "666-777-8888",
    address: "222 Brew House, Denver, CO",
    imageUrl: "https://img.freepik.com/free-photo/close-up-craft-beer-creating_23-2148507492.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/beer.png",
    about: "Locally brewed craft beers with a unique flavor.",
    website: "https://www.craftbeerbrewery.com"
  },
  {
    name: "Online Bookstore",
    category: "Books",
    contact: "999-888-7777",
    address: "Online Only",
    imageUrl: "https://img.freepik.com/free-photo/online-bookstore-with-unique-covers_23-2148508921.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/book.png",
    about: "Find your next favorite read with us.",
    website: "https://www.onlinebookstore.com"
  },
  {
    name: "Yoga and Wellness Center",
    category: "Health & Fitness",
    contact: "555-678-1234",
    address: "890 Wellness Way, San Diego, CA",
    imageUrl: "https://img.freepik.com/free-photo/yoga-therapy-class-with-meditation_23-2148496412.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/yoga.png",
    about: "Holistic wellness and yoga classes for all levels.",
    website: "https://www.yogawellness.com"
  },
  {
    name: "Gourmet Bakery",
    category: "Bakeries",
    contact: "333-222-1111",
    address: "345 Sweet St, New Orleans, LA",
    imageUrl: "https://img.freepik.com/free-photo/freshly-baked-bread-and-pastries_23-2148501914.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/bakery.png",
    about: "Delicious baked goods made fresh daily.",
    website: "https://www.gourmetbakery.com"
  },
  {
    name: "Community Library",
    category: "Education",
    contact: "777-777-7777",
    address: "234 Learn St, Portland, OR",
    imageUrl: "https://img.freepik.com/free-photo/people-studying-library-with-bookshelves_23-2148506978.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/library.png",
    about: "A local library with a wide range of books and resources.",
    website: "https://www.communitylibrary.com"
  },
  {
    name: "Local Gym",
    category: "Health & Fitness",
    contact: "123-456-7890",
    address: "123 Fitness Ave, Miami, FL",
    imageUrl: "https://img.freepik.com/free-photo/gym-workout_23-2148349346.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/gym.png",
    about: "A local gym offering various fitness programs.",
    website: "https://www.localgym.com"
  },
  {
    name: "Art Gallery",
    category: "Art",
    contact: "321-654-9870",
    address: "456 Art St, San Francisco, CA",
    imageUrl: "https://img.freepik.com/free-photo/art-gallery_23-2148481247.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/art.png",
    about: "A gallery showcasing local artists.",
    website: "https://www.artgallery.com"
  },
  {
    name: "Pet Grooming Services",
    category: "Pet Services",
    contact: "888-888-8888",
    address: "789 Grooming Ln, Chicago, IL",
    imageUrl: "https://img.freepik.com/free-photo/pet-grooming_23-2148503211.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/grooming.png",
    about: "Professional grooming services for your pets.",
    website: "https://www.petgrooming.com"
  },
  {
    name: "Local Diner",
    category: "Food & Beverage",
    contact: "555-555-5555",
    address: "234 Diner Rd, Boston, MA",
    imageUrl: "https://img.freepik.com/free-photo/diner_23-2148508912.jpg",
    icon: "https://img.icons8.com/ios-filled/50/000000/diner.png",
    about: "A local diner offering classic American dishes.",
    website: "https://www.localdiner.com"
  }
];


  export const addBusinessesList = async () => {
    try {
      // Fetch existing businesses from the "BusinessList" collection
      const existingBusinesses = await getDocs(collection(db, "BusinessList"));
      const existingNames = existingBusinesses.docs.map(doc => doc.data().name);
  
      for (const business of BusinessList) {
        // Check if the business name already exists
        if (!existingNames.includes(business.name)) {
          // Add the new business to the "BusinessList" collection
          const docRef = await addDoc(collection(db, "BusinessList"), business);
          console.log("Business added with ID: ", docRef.id);
        } else {
          console.log(`Business ${business.name} already exists, skipping.`);
        }
      }
    } catch (error) {
      console.error("Error adding business: ", error);
    }
  };
  