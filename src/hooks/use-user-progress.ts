'use client';

import { UserProgress } from '@/types';
import { useLocalStorage } from './use-local-storage';

const initialProgress: UserProgress = {
  completedChapters: [],
  bookmarkedQuestions: [],
  incorrectQuestions: {},
  streaks: {
    current: 0,
    lastActive: 0,
  },
  stats: {
    totalAttempted: 0,
    totalCorrect: 0,
    totalTimeSpent: 0,
  },
  badges: [],
};

export function useUserProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('examprep-pro-progress', initialProgress);

  const completeChapter = (chapterSlug: string) => {
    if (!progress.completedChapters.includes(chapterSlug)) {
      setProgress((prev) => ({
        ...prev,
        completedChapters: [...prev.completedChapters, chapterSlug],
      }));
    }
  };

  const toggleBookmark = (questionId: string) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarkedQuestions.includes(questionId);
      return {
        ...prev,
        bookmarkedQuestions: isBookmarked
          ? prev.bookmarkedQuestions.filter((id) => id !== questionId)
          : [...prev.bookmarkedQuestions, questionId],
      };
    });
  };

  const recordAttempt = (questionId: string, isCorrect: boolean, timeSpent: number) => {
    setProgress((prev) => {
      const newIncorrectQuestions = { ...prev.incorrectQuestions };
      if (!isCorrect) {
        newIncorrectQuestions[questionId] = (newIncorrectQuestions[questionId] || 0) + 1;
      }

      return {
        ...prev,
        incorrectQuestions: newIncorrectQuestions,
        stats: {
          totalAttempted: prev.stats.totalAttempted + 1,
          totalCorrect: prev.stats.totalCorrect + (isCorrect ? 1 : 0),
          totalTimeSpent: prev.stats.totalTimeSpent + timeSpent,
        },
      };
    });
  };

  const updateStreak = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    setProgress((prev) => {
      const lastActive = prev.streaks.lastActive;
      const diff = now - lastActive;

      if (diff < oneDay && new Date(now).getDate() === new Date(lastActive).getDate()) {
        return prev; // Already active today
      }

      if (diff < oneDay * 2) {
        return {
          ...prev,
          streaks: { current: prev.streaks.current + 1, lastActive: now },
        };
      }

      return {
        ...prev,
        streaks: { current: 1, lastActive: now },
      };
    });
  };

  return {
    progress,
    completeChapter,
    toggleBookmark,
    recordAttempt,
    updateStreak,
  };
}
