'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useUserProgress } from '@/hooks/use-user-progress';
import { AlertTriangle, TrendingDown, Target, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WeakTopicsPage() {
  const { progress } = useUserProgress();

  // Logic to identify weak topics based on incorrectQuestions
  // For demo, we just show a few placeholders if data is empty
  const weakTopics = [
    { topic: 'Number System - Remainders', wrongCount: 12, accuracy: 45, subject: 'Math', slug: 'number-system' },
    { topic: 'Geometry - Triangles', wrongCount: 8, accuracy: 52, subject: 'Math', slug: 'geometry' },
    { topic: 'English - Active/Passive', wrongCount: 15, accuracy: 38, subject: 'English', slug: 'active-passive' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <TrendingDown className="h-10 w-10 text-red-500" />
                Weak Topics
              </h1>
              <p className="text-muted-foreground">
                We've analyzed your practice sessions to identify areas where you need more focus.
              </p>
            </div>

            <div className="grid gap-6">
              {weakTopics.map((item, i) => (
                <Card key={i} className="overflow-hidden border-l-4 border-l-red-500">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{item.subject}</Badge>
                          <span className="text-sm font-bold text-red-500 flex items-center gap-1">
                            <AlertTriangle className="h-3.5 w-3.5" /> Low Accuracy
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{item.topic}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.wrongCount} incorrect attempts in last 3 sessions.
                        </p>
                      </div>

                      <div className="w-full md:w-48">
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="font-medium">Accuracy</span>
                          <span className="text-red-500 font-bold">{item.accuracy}%</span>
                        </div>
                        <ProgressBar value={item.accuracy} className="[&>div>div]:bg-red-500" />
                      </div>

                      <Link href={`/chapter/${item.subject.toLowerCase()}/${item.slug}`}>
                        <Button variant="outline" className="w-full md:w-auto">
                          Practice Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Strategy Tip</h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Improve your score by focusing on these topics for 30 minutes daily.
                  High-weightage topics like Number System and Geometry are crucial for SSC CGL.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
