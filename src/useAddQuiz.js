import { create } from "zustand";

const useAddQuiz = create((set) => ({
  totalQuizzes: 0,
  uploaded: false,
  quizzes: [],
  addQuiz: (quiz) =>
    set((state) => ({
      quizzes: [...state.quizzes, quiz],
      totalQuizzes: state.totalQuizzes + 1,
    })),
  setUploaded() {
    set({ uploaded: true });
  },
  resetQuiz() {
    set({ totalQuizzes: 0, uploaded: false, quizzes: [] });
  },
}));

export default useAddQuiz;
