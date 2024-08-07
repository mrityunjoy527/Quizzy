import { create } from "zustand";

const useAddQuiz = create((set) => ({
  totalQuestions: 0,
  questions: [],
  addQuestion: function (question) {
    if (this.totalQuestions === 5) return false;
    set((state) => ({
      questions: [...state.questions, question],
      totalQuestions: state.totalQuestions + 1,
    }));
    return true;
  },
}));

export default useAddQuiz;