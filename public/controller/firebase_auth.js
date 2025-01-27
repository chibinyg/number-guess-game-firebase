import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { app } from "./firebase_core.js";

const auth = getAuth(app);

export async function loginFirebase(email, password) {

    await signInWithEmailAndPassword(auth, email, password);

}

export async function logoutFirebase() {
    await signOut(auth);
}