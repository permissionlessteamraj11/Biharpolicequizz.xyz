'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { subjects } from '@/data/subjects';
import { useUserProgress } from '@/hooks/use-user-progress';
import { Search, Rocket, Target, BookOpen, Clock, ChevronRight, Award, Flame, GraduationCap, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const { progress } = useUserProgress();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChapters = useMemo(() => {
    if (!searchQuery) return [];
    const chapters: any[] = [];
    subjects.forEach(subject => {
      subject.chapters.forEach(chapter => {
        if (chapter.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          chapters.push({ ...chapter, subjectSlug: subject.slug, subjectName: subject.name });
        }
      });
    });
    return chapters.slice(0, 5);
  }, [searchQuery]);

  const stats = [
    { label: 'Chapters Done', value: progress.completedChapters.length, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Accuracy', value: progress.stats.totalAttempted > 0 ? `${Math.round((progress.stats.totalCorrect / progress.stats.totalAttempted) * 100)}%` : '0%', icon: Target, color: 'text-green-500' },
    { label: 'Daily Streak', value: progress.streaks.current, icon: Flame, color: 'text-orange-500' },
    { label: 'Total Practice', value: progress.stats.totalAttempted, icon: Rocket, color: 'text-purple-500' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-background">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="mb-4 py-1 px-4">
                  The Premium Preparation Hub
                </Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                  Master SSC CGL & BPSC <br />
                  <span className="text-primary">Chapter by Chapter</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  High-quality MCQ practice for Math, Reasoning, GS, and English.
                  No login, no payments—just pure exam-focused learning.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative max-w-xl mx-auto mb-12"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search chapters (e.g. Percentage, History...)"
                    className="w-full h-14 pl-12 pr-4 rounded-full border border-border bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {searchQuery && filteredChapters.length > 0 && (
                  <Card className="absolute top-full left-0 right-0 mt-2 z-20 text-left">
                    <CardContent className="p-2">
                      {filteredChapters.map((chapter) => (
                        <Link
                          key={`${chapter.subjectSlug}-${chapter.slug}`}
                          href={`/chapter/${chapter.subjectSlug}/${chapter.slug}`}
                          className="flex items-center justify-between p-3 hover:bg-accent rounded-md transition-colors"
                        >
                          <div>
                            <p className="font-medium">{chapter.title}</p>
                            <p className="text-xs text-muted-foreground">{chapter.subjectName}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full px-8">
                  Start Practice
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Daily Quiz
                </Button>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className={`${stat.color} mb-2 p-2 bg-background rounded-lg shadow-sm`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Subject Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Explore Subjects</h2>
                <p className="text-muted-foreground">Choose a subject to start your chapter-wise journey</p>
              </div>
              <Button variant="outline" className="hidden md:flex">
                View All Subjects <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {subjects.map((subject) => (
                <Link key={subject.slug} href={`/subjects/${subject.slug}`}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all group">
                    <CardContent className="p-8">
                      <div className="mb-6 inline-block p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {subject.chapterCount} chapters with {subject.questionCount}+ exam-level MCQs.
                      </p>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span>Progress</span>
                          <span>0%</span>
                        </div>
                        <ProgressBar value={0} />
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-none">
                            Easy: {subject.difficultyStats.easy}
                          </Badge>
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-none">
                            Medium: {subject.difficultyStats.medium}
                          </Badge>
                          <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400 border-none">
                            Hard: {subject.difficultyStats.hard}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why ExamPrep Pro?</h2>
              <p className="text-muted-foreground">The ultimate platform designed for serious aspirants who want to crack SSC and BPSC exams.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Practice Mode', desc: 'Step-by-step learning with instant explanations for every single question.', icon: Rocket },
                { title: 'Mock Test Mode', desc: 'Real exam simulation with timer, negative marking and detailed analytics.', icon: Target },
                { title: 'Mixed Quiz', desc: 'Test your overall preparedness with questions from multiple subjects.', icon: GraduationCap },
                { title: 'Local Progress', desc: 'Your progress is saved in your browser automatically. No login required.', icon: Clock },
                { title: 'Bookmark Logic', desc: 'Save difficult questions and review them later in dedicated bookmark section.', icon: Bookmark },
                { title: 'Topic Analytics', desc: 'Identify your weak and strong topics based on your practice history.', icon: Award },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-background border border-border shadow-sm">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
