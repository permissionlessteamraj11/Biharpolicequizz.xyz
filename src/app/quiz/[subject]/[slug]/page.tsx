'use client';

import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { QuestionCard } from '@/components/quiz/question-card';
import { QuizNavigation } from '@/components/quiz/quiz-navigation';
import { subjects } from '@/data/subjects';
import { mathNumberSystemQuestions } from '@/data/questions/math-number-system';
import { useUserProgress } from '@/hooks/use-user-progress';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Clock, AlertCircle, Trophy, Home, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { progress, recordAttempt, toggleBookmark, completeChapter } = useUserProgress();

  const subjectSlug = params.subject as string;
  const chapterSlug = params.slug as string;
  const mode = searchParams.get('mode') || 'full';

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime] = useState(Date.now());

  // Get subject and chapter
  const subject = useMemo(() => subjects.find(s => s.slug === subjectSlug), [subjectSlug]);
  const chapter = useMemo(() => subject?.chapters.find(c => c.slug === chapterSlug), [subject, chapterSlug]);

  // For demo purposes, we'll use mathNumberSystemQuestions for any math chapter
  // In a real app, you'd fetch questions based on slugs
  const allQuestions = useMemo(() => {
    // If it's a real data file for the specific slug, use it
    if (subjectSlug === 'math' && chapterSlug === 'number-system') {
      return mathNumberSystemQuestions;
    }
    // Otherwise fallback to sample questions for testing
    return mathNumberSystemQuestions;
  }, [subjectSlug, chapterSlug]);

  const questions = useMemo(() => {
    return mode === 'quick' ? allQuestions.slice(0, 25) : allQuestions;
  }, [allQuestions, mode]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!showResult && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showResult, isPaused]);

  if (!subject || !chapter) return <div>Not Found</div>;

  const handleSelectOption = (optionIndex: number) => {
    if (selectedOptions[currentIndex] !== undefined) return;

    setSelectedOptions(prev => ({ ...prev, [currentIndex]: optionIndex }));

    const question = questions[currentIndex];
    const isCorrect = optionIndex === question.correctOption;

    // In actual practice, we'd calculate time per question
    recordAttempt(question.id, isCorrect, 30);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
    if (Object.keys(selectedOptions).length / questions.length > 0.8) {
      completeChapter(chapterSlug);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateStats = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = questions.length - Object.keys(selectedOptions).length;

    Object.entries(selectedOptions).forEach(([idx, opt]) => {
      if (opt === questions[parseInt(idx)].correctOption) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = correct * 2 - wrong * 0.5; // SSC CGL pattern: +2 for correct, -0.5 for wrong
    const accuracy = correct + wrong > 0 ? (correct / (correct + wrong)) * 100 : 0;

    return { correct, wrong, skipped, score, accuracy };
  };

  if (showResult) {
    const stats = calculateStats();
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 bg-accent/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="text-center p-8 md:p-12 shadow-xl border-none">
                <div className="mb-8">
                  <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    <Trophy className="h-10 w-10" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
                  <p className="text-muted-foreground">{chapter.title} - {mode === 'quick' ? 'Quick' : 'Full'} Practice</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  {[
                    { label: 'Score', value: stats.score, color: 'text-primary' },
                    { label: 'Accuracy', value: `${Math.round(stats.accuracy)}%`, color: 'text-blue-500' },
                    { label: 'Correct', value: stats.correct, color: 'text-green-500' },
                    { label: 'Time', value: formatTime(timer), color: 'text-orange-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-2xl bg-accent/50">
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => window.location.reload()} className="rounded-full px-8">
                    <RotateCcw className="mr-2 h-4 w-4" /> Restart
                  </Button>
                  <Button variant="outline" onClick={() => router.push(`/subjects/${subjectSlug}`)} className="rounded-full px-8">
                    <Home className="mr-2 h-4 w-4" /> Subject Home
                  </Button>
                </div>
              </Card>

              <div className="mt-8 space-y-4">
                <h2 className="text-xl font-bold px-2">Question Summary</h2>
                {questions.map((q, i) => {
                  const selected = selectedOptions[i];
                  const isCorrect = selected === q.correctOption;
                  return (
                    <Card key={q.id} className={cn("border-l-4",
                      selected === undefined ? "border-l-gray-400" :
                      isCorrect ? "border-l-green-500" : "border-l-red-500"
                    )}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn("h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm",
                            selected === undefined ? "bg-gray-100" :
                            isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          )}>
                            {i + 1}
                          </div>
                          <p className="text-sm font-medium line-clamp-1">{q.question}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowResult(false);
                            setCurrentIndex(i);
                          }}
                        >
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-accent/10">
      <nav className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="font-bold hidden sm:block">{chapter.title}</h1>
              <p className="text-xs text-muted-foreground">{subject.name} • {mode === 'quick' ? '25' : '50'} Questions</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-mono text-lg font-bold text-primary">
              <Clock className="h-5 w-5" />
              {formatTime(timer)}
            </div>
            <Button size="sm" onClick={handleSubmit} className="hidden sm:flex">Finish</Button>
          </div>
        </div>
      </nav>

      <div className="h-1.5 w-full bg-accent">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionCard
                question={questions[currentIndex]}
                selectedOption={selectedOptions[currentIndex] ?? null}
                onSelectOption={handleSelectOption}
                showExplanation={selectedOptions[currentIndex] !== undefined}
                isBookmarked={progress.bookmarkedQuestions.includes(questions[currentIndex].id)}
                onToggleBookmark={() => toggleBookmark(questions[currentIndex].id)}
              />
            </motion.div>
          </AnimatePresence>

          <QuizNavigation
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            isLastQuestion={currentIndex === questions.length - 1}
            canNext={selectedOptions[currentIndex] !== undefined}
          />
        </div>
      </main>

      <div className="md:hidden sticky bottom-0 bg-background border-t p-4 flex justify-between items-center">
        <div className="text-sm font-medium">
          {currentIndex + 1} / {questions.length}
        </div>
        <Button size="sm" onClick={handleSubmit}>Finish Quiz</Button>
      </div>
    </div>
  );
}
