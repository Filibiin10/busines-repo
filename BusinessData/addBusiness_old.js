import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import BusinessList from "../BusinessList.json";

export const addBusiness = async () => {
  try {
    // Loop through the list and add each business to Firestore if it doesn't already exist
    for (const business of BusinessList) {
      // Create a query to check if the business already exists
      const q = query(collection(db, "BusinessList"), where("name", "==", business.name));
      const querySnapshot = await getDocs(q);

      // If no document is found, add the business
      if (querySnapshot.empty) {
        const docRef = await addDoc(collection(db, "BusinessList"), business);
        console.log("New business added with ID: ", docRef.id);
      } else {
        console.log(`Business '${business.name}' already exists, skipping...`);
      }
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
