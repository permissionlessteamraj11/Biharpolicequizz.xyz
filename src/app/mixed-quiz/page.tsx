'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { subjects } from '@/data/subjects';
import { Shuffle, Settings2, Play } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MixedQuizPage() {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(subjects.map(s => s.slug));
  const [questionCount, setQuestionCount] = useState(50);

  const toggleSubject = (slug: string) => {
    setSelectedSubjects(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleStart = () => {
    // For demo, we'll just redirect to a sample quiz
    router.push(`/quiz/math/number-system?mode=full&mixed=true`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <Shuffle className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Mixed Quiz Generator</h1>
              <p className="text-muted-foreground">
                Challenge yourself with a randomized selection of questions from your chosen subjects.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Settings2 className="h-5 w-5 text-primary" />
                    Quiz Settings
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground block mb-3">
                        Include Subjects
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {subjects.map(subject => (
                          <button
                            key={subject.slug}
                            onClick={() => toggleSubject(subject.slug)}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                              selectedSubjects.includes(subject.slug)
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-muted-foreground'
                            }`}
                          >
                            {subject.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground block mb-3">
                        Number of Questions
                      </label>
                      <div className="flex gap-4">
                        {[25, 50, 75, 100].map(count => (
                          <button
                            key={count}
                            onClick={() => setQuestionCount(count)}
                            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                              questionCount === count
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-muted-foreground'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-xl h-14 text-lg font-bold"
                  onClick={handleStart}
                  disabled={selectedSubjects.length === 0}
                >
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Generate Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
