import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
}