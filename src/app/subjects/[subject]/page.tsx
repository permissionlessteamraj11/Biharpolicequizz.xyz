'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { subjects } from '@/data/subjects';
import { ChevronRight, Filter, BookOpen, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectSlug = params.subject as string;
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  const subject = useMemo(() =>
    subjects.find(s => s.slug === subjectSlug),
  [subjectSlug]);

  const filteredChapters = useMemo(() => {
    if (!subject) return [];
    if (!difficultyFilter) return subject.chapters;
    return subject.chapters.filter(c => c.difficulty === difficultyFilter);
  }, [subject, difficultyFilter]);

  if (!subject) {
    return <div>Subject not found</div>;
  }

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-primary font-medium mb-4">
                <Link href="/subjects" className="hover:underline">Subjects</Link>
                <ChevronRight className="h-4 w-4" />
                <span>{subject.name}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{subject.name} Chapters</h1>
              <p className="text-muted-foreground">
                Master {subject.name} with our comprehensive chapter-wise MCQs.
                Focus on each topic individually to build a strong foundation.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={difficultyFilter === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter(null)}
                className="rounded-full"
              >
                All
              </Button>
              {difficulties.map(d => (
                <Button
                  key={d}
                  variant={difficultyFilter === d ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDifficultyFilter(d)}
                  className="rounded-full"
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChapters.map((chapter, i) => (
              <motion.div
                key={chapter.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge
                        variant="secondary"
                        className={
                          chapter.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' :
                          chapter.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' :
                          'bg-red-500/10 text-red-600'
                        }
                      >
                        {chapter.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> 20-30 min
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{chapter.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                      Practice 50 high-quality MCQs including previous year questions from SSC CGL and BPSC.
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-sm">
                        <span className="font-medium">50</span>
                        <span className="text-muted-foreground ml-1">MCQs</span>
                      </div>
                      <Link href={`/chapter/${subject.slug}/${chapter.slug}`}>
                        <Button size="sm">Start Practice</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
