import { db } from "./firebase"; // Adjust this import to your Firebase config file
import {
  doc,
  collection,
  collectionGroup,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export const createNotification = async (fromId, toId, message) => {
  try {
    await addDoc(collection(db, "notifications"), {
      fromId,
      toId,
      message,
      viewed: false,
      notifiedAt: serverTimestamp(),
    });
    return { success: true, message: "Notification created successfully." };
  } catch (error) {
    console.log(`Create Notification Error: ${error}`);
    return { success: false, message: "Error." };
  }
};
