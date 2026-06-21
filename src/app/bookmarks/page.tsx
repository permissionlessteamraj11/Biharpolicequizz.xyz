'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserProgress } from '@/hooks/use-user-progress';
import { mathNumberSystemQuestions } from '@/data/questions/math-number-system';
import { Bookmark, Trash2, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export default function BookmarksPage() {
  const { progress, toggleBookmark } = useUserProgress();

  // For demo, we search in mathNumberSystemQuestions
  // In real app, you'd search in all question data files
  const bookmarkedQuestions = useMemo(() => {
    return mathNumberSystemQuestions.filter(q =>
      progress.bookmarkedQuestions.includes(q.id)
    );
  }, [progress.bookmarkedQuestions]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold mb-2">My Bookmarks</h1>
                <p className="text-muted-foreground">
                  Review and practice questions you've saved for later.
                </p>
              </div>
              <Badge variant="secondary" className="px-4 py-1 text-base">
                {progress.bookmarkedQuestions.length} Questions
              </Badge>
            </div>

            {bookmarkedQuestions.length === 0 ? (
              <Card className="p-12 text-center border-dashed">
                <CardContent>
                  <div className="h-16 w-16 rounded-full bg-accent text-muted-foreground flex items-center justify-center mx-auto mb-6">
                    <Bookmark className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No bookmarks yet</h3>
                  <p className="text-muted-foreground mb-8">
                    Bookmark questions during practice to see them here.
                  </p>
                  <Link href="/subjects">
                    <Button>Start Practicing</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {bookmarkedQuestions.map((question) => (
                  <Card key={question.id} className="group overflow-visible">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2">
                          <Badge variant="outline">{question.subjectSlug.toUpperCase()}</Badge>
                          <Badge variant="secondary">{question.difficulty}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-red-500"
                          onClick={() => toggleBookmark(question.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      <h3 className="text-lg font-bold mb-6 leading-relaxed">
                        {question.question}
                      </h3>

                      <div className="p-4 rounded-xl bg-accent/50 mb-6">
                        <p className="text-sm font-bold text-primary mb-2">Correct Answer:</p>
                        <p className="font-medium">{question.options[question.correctOption]}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <Link href={`/chapter/${question.subjectSlug}/${question.chapterSlug}`}>
                          <Button variant="ghost" size="sm" className="text-xs">
                            View Chapter <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Show Explanation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
