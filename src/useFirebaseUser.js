import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase/configuration";

const useFirebaseUser = create((set) => ({
  uid: null,
  email: null,
  imgUrl: null,
  name: null,
  designation: null,
  feedback: 0,
  takenQuiz: [],
  askedQuiz: [],
  setLocalFirebaseUser(userData) {
    set({ ...userData });
  },
  async fetchFirebaseUser(uid) {
    try {
      const ref = doc(db, "users", uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ ...data });
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  async fetchAskedQuiz(uid) {
    try {
      const ref = doc(db, "users", uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const { askedQuiz } = docSnap.data();
        set((state) => ({...state, askedQuiz: [...askedQuiz] }));
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useFirebaseUser;
