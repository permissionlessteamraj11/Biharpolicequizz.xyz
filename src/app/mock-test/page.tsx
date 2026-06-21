'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { subjects } from '@/data/subjects';
import { Trophy, Clock, Target, AlertCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MockTestPage() {
  const mockTests = [
    { id: 'cgl-tier1-1', title: 'SSC CGL Tier-1 Full Mock #1', subject: 'Mixed', questions: 100, time: 60, difficulty: 'Medium' },
    { id: 'bpsc-pre-1', title: 'BPSC Prelims Full Mock #1', subject: 'Mixed', questions: 150, time: 120, difficulty: 'Medium' },
    { id: 'math-sectional-1', title: 'Mathematics Sectional Mock', subject: 'Math', questions: 25, time: 20, difficulty: 'Hard' },
    { id: 'gs-sectional-1', title: 'GS Sectional Mock', subject: 'GS', questions: 50, time: 15, difficulty: 'Medium' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">Exam Hall</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Real exam simulations with strict timing and negative marking.
                Perfect your strategy and manage your time effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTests.map((test) => (
                <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline">{test.subject}</Badge>
                      <Badge
                        variant="secondary"
                        className={test.difficulty === 'Hard' ? 'text-red-600 bg-red-500/10' : 'text-blue-600 bg-blue-500/10'}
                      >
                        {test.difficulty}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-4">{test.title}</h3>

                    <div className="flex gap-6 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Target className="h-4 w-4 mr-1.5" />
                        {test.questions} MCQs
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1.5" />
                        {test.time} Mins
                      </div>
                    </div>

                    <Button className="w-full">
                      Start Mock Test
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Mixed Quiz Generator</h3>
                  <p className="text-muted-foreground mb-0">
                    Want a custom quiz? Generate a mixed quiz with questions from multiple subjects to test your overall preparedness.
                  </p>
                </div>
                <Link href="/mixed-quiz" className="shrink-0">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Generate Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
