import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
    doc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { app } from "./firebase_core.js";
import { currentUser } from "./firebase_auth.js";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const COLLECTION_DICEGAME = 'dicegame_collection';

export async function addPlayHistory(history) {
    const docRef = await addDoc(collection(db, COLLECTION_DICEGAME), history);
}

export async function getPlayHistoryList() {
    let historyList = [];
    const q = query(
        collection(db, COLLECTION_DICEGAME),
        where('email', '==', currentUser.email),
        orderBy('timestamp', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const t = { docId: doc.id, ...doc.data() };
        historyList.push(t);
    });
    return historyList;
}

// delete all play history for the current user
export async function deletePlayHistoryByEmail() {
    const q = query(
        collection(db, COLLECTION_DICEGAME),
        where('email', '==', currentUser.email)
    );

    // Get the documents that match the query
    const querySnapshot = await getDocs(q);

    // Delete each document
    querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}



