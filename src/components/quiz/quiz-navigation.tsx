import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
  canNext: boolean;
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  onNext,
  onPrev,
  onSubmit,
  isLastQuestion,
  canNext,
}: QuizNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8 pb-12">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="rounded-full px-6"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      <div className="text-sm font-medium text-muted-foreground">
        Question <span className="text-foreground">{currentIndex + 1}</span> of {totalQuestions}
      </div>

      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white"
        >
          Finish Quiz
          <Send className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canNext}
          className="rounded-full px-8"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
