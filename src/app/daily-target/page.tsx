'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useUserProgress } from '@/hooks/use-user-progress';
import { CheckCircle2, Circle, Flame, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DailyTargetPage() {
  const { progress } = useUserProgress();

  const targets = [
    { id: 1, title: 'Complete 50 MCQs in Math', progress: 20, goal: 50, done: false },
    { id: 2, title: 'Solve 2 Reasoning Puzzles', progress: 1, goal: 2, done: false },
    { id: 3, title: 'Daily Current Affairs Quiz', progress: 1, goal: 1, done: true },
    { id: 4, title: 'Review 10 Vocabulary Words', progress: 0, goal: 10, done: false },
  ];

  const overallProgress = (targets.filter(t => t.done).length / targets.length) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">Daily Targets</h1>
                <p className="text-muted-foreground">
                  Stay consistent and reach your goals. Small daily steps lead to big results.
                </p>
              </div>
              <Card className="shrink-0 bg-primary/10 border-primary/20">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Current Streak</p>
                    <p className="text-3xl font-bold">{progress.streaks.current} Days</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" /> Today's Progress
                  </h3>
                  <span className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</span>
                </div>
                <ProgressBar value={overallProgress} className="h-4" />
                <p className="text-sm text-muted-foreground mt-4 italic text-center">
                  "{targets.filter(t => !t.done).length} more tasks to go to complete today's target!"
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Checklist</h2>
              {targets.map((target) => (
                <Card key={target.id} className={target.done ? 'opacity-70 bg-accent/30' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`shrink-0 h-8 w-8 rounded-full border-2 flex items-center justify-center ${
                        target.done ? 'bg-green-500 border-green-500 text-white' : 'border-border'
                      }`}>
                        {target.done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold ${target.done ? 'line-through text-muted-foreground' : ''}`}>
                          {target.title}
                        </h4>
                        {!target.done && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-32">
                              <ProgressBar value={(target.progress / target.goal) * 100} />
                            </div>
                            <span className="text-xs text-muted-foreground">{target.progress}/{target.goal}</span>
                          </div>
                        )}
                      </div>
                      <Link href="/subjects">
                        <Button size="sm" variant={target.done ? 'ghost' : 'outline'}>
                          {target.done ? 'Done' : 'Go to Practice'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Consistency', desc: 'Maintain a 7-day streak to earn a Consistency badge.', icon: Flame },
                { title: 'Accuracy', desc: 'Score above 90% in 5 consecutive quizzes.', icon: Target },
                { title: 'Mastery', desc: 'Complete all chapters in any one subject.', icon: Trophy },
              ].map((achievement, i) => (
                <Card key={i} className="text-center">
                  <CardContent className="p-6">
                    <achievement.icon className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-bold mb-2">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
