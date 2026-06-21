'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { subjects } from '@/data/subjects';
import { ChevronRight, CheckCircle, Clock, Search } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserProgress } from '@/hooks/use-user-progress';

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectSlug = params.subject as string;
  const { progress } = useUserProgress();
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'title' | 'difficulty'>('default');

  const subject = useMemo(() =>
    subjects.find(s => s.slug === subjectSlug),
  [subjectSlug]);

  const filteredAndSortedChapters = useMemo(() => {
    if (!subject) return [];

    let result = [...subject.chapters];

    // Filter by difficulty
    if (difficultyFilter) {
      result = result.filter(c => c.difficulty === difficultyFilter);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'difficulty') {
      const diffOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      result.sort((a, b) => diffOrder[a.difficulty as keyof typeof diffOrder] - diffOrder[b.difficulty as keyof typeof diffOrder]);
    }

    return result;
  }, [subject, difficultyFilter, searchQuery, sortBy]);

  if (!subject) {
    return <div>Subject not found</div>;
  }

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="flex flex-col min-h-screen bg-background/95">
      <Navbar />

      <main className="flex-1 py-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-primary font-medium mb-4"
              >
                <Link href="/subjects" className="hover:underline transition-all">Subjects</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-muted-foreground">{subject.name}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
              >
                {subject.name} <span className="text-primary text-2xl align-top">Advanced</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                Master {subject.name} with our premium, high-difficulty MCQs tailored for SSC CGL & BPSC toppers.
                Each chapter is structured for maximum retention.
              </motion.p>
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-auto">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search chapters..."
                  className="w-full lg:w-64 h-10 pl-10 pr-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={difficultyFilter === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDifficultyFilter(null)}
                  className="rounded-full px-4"
                >
                  All
                </Button>
                {difficulties.map(d => (
                  <Button
                    key={d}
                    variant={difficultyFilter === d ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDifficultyFilter(d)}
                    className="rounded-full px-4"
                  >
                    {d}
                  </Button>
                ))}
                <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />
                <select
                  className="h-9 px-3 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="default">Sort: Default</option>
                  <option value="title">Sort: A-Z</option>
                  <option value="difficulty">Sort: Difficulty</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedChapters.map((chapter, i) => {
                const isCompleted = progress.completedChapters.includes(chapter.slug);
                return (
                  <motion.div
                    key={chapter.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-xl hover:border-primary/40 transition-all duration-300 group overflow-hidden bg-card/40 backdrop-blur-md">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <Badge
                              variant="secondary"
                              className={
                                chapter.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                                chapter.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                                'bg-red-500/10 text-red-600 border-red-500/20'
                              }
                            >
                              {chapter.difficulty}
                            </Badge>
                            {isCompleted ? (
                              <Badge className="bg-primary text-white border-none flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Mastered
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground flex items-center bg-accent/50 px-2 py-1 rounded-full">
                                <Clock className="h-3 w-3 mr-1" /> 20-30 min
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{chapter.title}</h3>
                          <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                            {chapter.description || "Deep dive into advanced concepts and solve 50+ hand-picked MCQs including previous year questions."}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Questions</span>
                              <span className="text-lg font-bold">50 MCQs</span>
                            </div>
                            <Link href={`/chapter/${subject.slug}/${chapter.slug}`}>
                              <Button size="sm" className="rounded-full px-6 group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                                Start Now
                              </Button>
                            </Link>
                          </div>
                        </div>
                        {/* Progress bar at bottom of card */}
                        {isCompleted && (
                          <div className="h-1 w-full bg-primary" />
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredAndSortedChapters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 rounded-full bg-accent mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No chapters found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setDifficultyFilter(null);
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
