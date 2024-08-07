const defaultQuiz = [
  {
    id: 0,
    question: "The islands with Coral Covered Surfaces in Bay of Bengal are",
    correct_answer: "Andaman Island",
    incorrect_answers: ["Andaman Island", "Nicobar Island", "Both A and B", "None of the above"],
  },
  {
    id: 1,
    question: "question?",
    correct_answer: "correct_answer",
    incorrect_answers: ["option", "option", "option", "option"],
  },
  {
    id: 2,
    question: "question?",
    correct_answer: "correct_answer",
    incorrect_answers: ["option", "option", "option", "option"],
  },
  {
    id: 3,
    question: "question?",
    correct_answer: "correct_answer",
    incorrect_answers: ["option", "option", "option", "option"],
  },
  {
    id: 4,
    question: "question?",
    correct_answer: "correct_answer",
    incorrect_answers: ["option", "option", "option", "option"],
  },
];

const resetQuiz = () => {
  for (let i = 0; i < defaultQuiz.length; i++) {
    defaultQuiz[i] = {
      id: i,
      question: "question?",
      correct_answer: "correct_answer",
      incorrect_answers: ["option", "option", "option", "option"],
    };
  }
};

export {defaultQuiz, resetQuiz };
