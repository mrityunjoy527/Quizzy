import { create } from "zustand";

const useFirebaseUser = create((set) => ({
  uid: null,
  email: null,
  name: null,
  age: null,
  designation: null,
  feedback: 0,
  takenQuiz: 0,
  askedQuiz: 0,
  setFirebaseUser({
    uid,
    email,
    name,
    designation,
    feedback,
    takenQuiz,
    askedQuiz,
    age,
  }) {
    set({ uid, email, name, age, designation, feedback, takenQuiz, askedQuiz });
  },
}));

export default useFirebaseUser;
