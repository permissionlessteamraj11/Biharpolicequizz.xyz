'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: {
    question: string;
    options: string[];
    explanation: string;
    correctOption: number;
    difficulty: string;
    topicTag: string;
  };
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  showExplanation: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  showExplanation,
  isBookmarked,
  onToggleBookmark,
}: QuestionCardProps) {
  return (
    <Card className="shadow-lg border-none bg-card overflow-visible">
      <CardContent className="p-6 md:p-10">
        <div className="flex justify-between items-start mb-8">
          <Badge variant="secondary" className="px-3 py-1">
            {question.topicTag}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleBookmark}
            className={cn(
              "rounded-full transition-colors",
              isBookmarked ? "text-primary bg-primary/10" : "text-muted-foreground"
            )}
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
          </Button>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-8 leading-tight">
          {question.question}
        </h2>

        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === question.correctOption;
            const showResult = showExplanation;

            let variantClass = "border-border hover:border-primary/50 hover:bg-primary/5";
            if (showResult) {
              if (isCorrect) {
                variantClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
              } else if (isSelected && !isCorrect) {
                variantClass = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
              }
            } else if (isSelected) {
              variantClass = "border-primary bg-primary/5 ring-1 ring-primary";
            }

            return (
              <button
                key={index}
                disabled={showResult}
                onClick={() => onSelectOption(index)}
                className={cn(
                  "w-full flex items-center p-4 rounded-xl border-2 text-left transition-all duration-200 group",
                  variantClass
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center mr-4 text-sm font-bold border-2 transition-colors",
                  isSelected ? "bg-primary border-primary text-white" : "border-border text-muted-foreground group-hover:border-primary/50"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-medium text-lg">{option}</span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="p-6 rounded-xl bg-accent/50 border border-border">
              <div className="flex items-center gap-2 text-primary font-bold mb-3">
                <HelpCircle className="h-5 w-5" />
                <span>Explanation</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
