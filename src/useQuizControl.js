import { create } from "zustand";

const useQuizControl = create((set) => ({
  quizIdx: 0,
  creatingQuiz: false,
  nextQuiz: () => {
    set((state) => ({ quizIdx: Math.min(state.quizIdx + 1, 4) }));
  },
  prevQuiz: () => {
    set((state) => ({ quizIdx: Math.max(state.quizIdx - 1, 0) }));
  },
}));

export default useQuizControl;