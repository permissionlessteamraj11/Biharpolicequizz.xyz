export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number; // 0-3
  explanation: string;
  difficulty: Difficulty;
  topicTag: string;
  sourceTag?: string;
  chapterSlug: string;
  subjectSlug: string;
}

export interface Chapter {
  title: string;
  slug: string;
  description?: string;
  difficulty: Difficulty;
  totalQuestions: number;
  previewQuestions: number;
  fullQuestions: number;
  shortNotes?: string;
  formulas?: string[];
}

export interface Subject {
  name: string;
  slug: string;
  icon: string;
  chapterCount: number;
  questionCount: number;
  chapters: Chapter[];
  difficultyStats: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface UserProgress {
  completedChapters: string[]; // list of chapter slugs
  bookmarkedQuestions: string[]; // list of question ids
  incorrectQuestions: Record<string, number>; // question id -> count of wrong attempts
  lastAttemptedChapter?: {
    subjectSlug: string;
    chapterSlug: string;
    timestamp: number;
    lastQuestionIndex: number;
  };
  streaks: {
    current: number;
    lastActive: number; // timestamp
  };
  stats: {
    totalAttempted: number;
    totalCorrect: number;
    totalTimeSpent: number; // in seconds
  };
  badges: string[];
}

export interface MockTest {
  id: string;
  title: string;
  subjectSlug?: string; // undefined if mixed
  questionIds: string[];
  duration: number; // minutes
  totalMarks: number;
}
