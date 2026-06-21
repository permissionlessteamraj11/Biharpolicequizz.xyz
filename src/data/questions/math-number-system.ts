import { Question } from "@/types";

export const mathNumberSystemQuestions: Question[] = [
  {
    id: "m-ns-1",
    question: "Which of the following is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctOption: 2,
    explanation: "2 is the smallest prime number and it is the only even prime number.",
    difficulty: "Easy",
    topicTag: "Prime Numbers",
    subjectSlug: "math",
    chapterSlug: "number-system"
  },
  {
    id: "m-ns-2",
    question: "The sum of first 50 natural numbers is:",
    options: ["1225", "1275", "1325", "1375"],
    correctOption: 1,
    explanation: "Sum of first n natural numbers = n(n+1)/2. For n=50, sum = 50(51)/2 = 25 * 51 = 1275.",
    difficulty: "Easy",
    topicTag: "Natural Numbers",
    subjectSlug: "math",
    chapterSlug: "number-system"
  },
  {
    id: "m-ns-3",
    question: "If a number is divisible by both 11 and 13, then it must be necessarily divisible by:",
    options: ["(11 + 13)", "(13 - 11)", "(11 * 13)", "None of these"],
    correctOption: 2,
    explanation: "If a number is divisible by two co-prime numbers, it must be divisible by their product.",
    difficulty: "Medium",
    topicTag: "Divisibility",
    subjectSlug: "math",
    chapterSlug: "number-system"
  },
  {
    id: "m-ns-4",
    question: "The unit digit in the product (784 * 618 * 917 * 463) is:",
    options: ["2", "3", "4", "5"],
    correctOption: 0,
    explanation: "Unit digit = 4 * 8 * 7 * 3 = 32 * 21 -> 2 * 1 = 2.",
    difficulty: "Medium",
    topicTag: "Units Digit",
    subjectSlug: "math",
    chapterSlug: "number-system"
  },
  {
    id: "m-ns-5",
    question: "What is the remainder when 2^31 is divided by 5?",
    options: ["1", "2", "3", "4"],
    correctOption: 2,
    explanation: "2^1=2, 2^2=4, 2^3=8(rem 3), 2^4=16(rem 1). Cycle is 2, 4, 3, 1. 31 mod 4 = 3. So remainder is same as 2^3, which is 3.",
    difficulty: "Hard",
    topicTag: "Remainders",
    subjectSlug: "math",
    chapterSlug: "number-system"
  }
];
