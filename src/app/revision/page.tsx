'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserProgress } from '@/hooks/use-user-progress';
import { History, RotateCcw, Play, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function RevisionPage() {
  const { progress } = useUserProgress();

  const incorrectCount = Object.keys(progress.incorrectQuestions).length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <History className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Revision Center</h1>
              <p className="text-muted-foreground">
                Strengthen your weak areas by practicing questions you got wrong.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-red-200 dark:border-red-900/30">
                <CardContent className="p-8">
                  <Badge className="bg-red-500 hover:bg-red-600 mb-4">Focus Required</Badge>
                  <h3 className="text-2xl font-bold mb-2">Incorrect Questions</h3>
                  <p className="text-muted-foreground mb-8">
                    You have {incorrectCount} questions that need another look.
                  </p>
                  <Button className="w-full bg-red-500 hover:bg-red-600" disabled={incorrectCount === 0}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Practice Wrong Questions
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-900/30">
                <CardContent className="p-8">
                  <Badge className="bg-green-500 hover:bg-green-600 mb-4">Quick Revision</Badge>
                  <h3 className="text-2xl font-bold mb-2">Topic Flashcards</h3>
                  <p className="text-muted-foreground mb-8">
                    Review short notes and formulas from completed chapters.
                  </p>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Open Revision Cards
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <Card>
                <CardContent className="p-0">
                  {progress.completedChapters.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                      No recent activity found. Start a chapter to track your progress.
                    </div>
                  ) : (
                    <div className="divide-y">
                      {progress.completedChapters.slice(-5).reverse().map((slug) => (
                        <div key={slug} className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                              <Play className="h-5 w-5 fill-current" />
                            </div>
                            <div>
                              <p className="font-bold capitalize">{slug.replace(/-/g, ' ')}</p>
                              <p className="text-xs text-muted-foreground">Completed successfully</p>
                            </div>
                          </div>
                          <Link href={`/chapter/math/${slug}`}>
                            <Button variant="ghost" size="sm">Review</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
