import { create } from "zustand";

const useAddQuiz = create((set) => ({
  totalQuizzes: 0,
  quizzes: [],
  addQuiz: (quiz) =>
    set((state) => ({
      quizzes: [...state.quizzes, quiz],
      totalQuizzes: state.totalQuizzes + 1,
    })),
}));

export default useAddQuiz;
