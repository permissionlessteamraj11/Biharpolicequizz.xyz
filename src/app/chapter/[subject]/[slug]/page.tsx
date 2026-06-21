'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { subjects } from '@/data/subjects';
import { ChevronRight, BookOpen, Award, CheckCircle, Info, Star, Zap, BarChart, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ChapterPage() {
  const params = useParams();
  const subjectSlug = params.subject as string;
  const chapterSlug = params.slug as string;

  const subject = useMemo(() => subjects.find(s => s.slug === subjectSlug), [subjectSlug]);
  const chapter = useMemo(() => subject?.chapters.find(c => c.slug === chapterSlug), [subject, chapterSlug]);

  if (!subject || !chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background/95">
      <Navbar />

      <main className="flex-1 py-12 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-8 bg-card/50 w-fit px-4 py-2 rounded-full border border-border/50"
            >
              <Link href="/subjects" className="hover:text-primary transition-colors">Subjects</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/subjects/${subject.slug}`} className="hover:text-primary transition-colors">{subject.name}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary">{chapter.title}</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="rounded-full px-3 py-1 bg-primary/5 border-primary/20 text-primary">
                      Premium Module
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" /> 4.9/5
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                    {chapter.title} <span className="text-primary underline decoration-primary/20">Mastery</span>
                  </h1>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-2xl shadow-sm">
                      <div className="p-1.5 rounded-lg bg-green-500/10 text-green-600">
                        <BarChart className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                        <p className="text-muted-foreground font-medium uppercase tracking-wider">Difficulty</p>
                        <p className="font-bold">{chapter.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-2xl shadow-sm">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                        <p className="text-muted-foreground font-medium uppercase tracking-wider">Questions</p>
                        <p className="font-bold">50 MCQs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-2xl shadow-sm">
                      <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                        <p className="text-muted-foreground font-medium uppercase tracking-wider">Verified</p>
                        <p className="font-bold">PYQ 2024</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Highly Advanced Sections */}
                <div className="space-y-8">
                  {/* Revision Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="border-none bg-gradient-to-br from-primary/10 via-background to-background shadow-lg overflow-hidden border border-primary/10">
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <h2 className="text-2xl font-bold">Concept Overview</h2>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          Our experts have curated this set specifically for {subject.name} enthusiasts.
                          It covers {chapter.title} in great depth, ensuring you're prepared for the most challenging questions in SSC CGL and BPSC Mains.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Strategic approach to complex problems",
                            "2024 Exam pattern alignment",
                            "Time-saving shortcut techniques",
                            "Comprehensive conceptual coverage"
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-card/40 border border-border/50">
                              <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* CTAs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="h-full border-border/60 hover:border-primary/50 transition-all duration-300 bg-card/60 backdrop-blur-sm group">
                        <CardContent className="p-8 flex flex-col h-full">
                          <div className="h-14 w-14 rounded-2xl bg-accent text-muted-foreground flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <RocketIcon className="h-7 w-7" />
                          </div>
                          <h3 className="text-2xl font-bold mb-3">Quick Sprint</h3>
                          <p className="text-muted-foreground text-sm mb-8 flex-grow">
                            A focused session of 25 hand-picked MCQs to sharpen your concepts quickly.
                          </p>
                          <Link href={`/quiz/${subject.slug}/${chapter.slug}?mode=quick`} className="mt-auto">
                            <Button variant="outline" className="w-full rounded-xl py-6 font-bold group-hover:bg-accent group-hover:text-foreground transition-all">
                              Start Sprint (25 MCQs)
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="h-full border-primary/30 shadow-2xl shadow-primary/10 bg-primary/[0.02] overflow-hidden group relative">
                        <div className="absolute top-0 right-0 p-4">
                          <Badge className="bg-primary text-white animate-pulse">Recommended</Badge>
                        </div>
                        <CardContent className="p-8 flex flex-col h-full relative z-10">
                          <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-xl shadow-primary/30">
                            <TargetIcon className="h-7 w-7" />
                          </div>
                          <h3 className="text-2xl font-bold mb-3">Ultimate Practice</h3>
                          <p className="text-muted-foreground text-sm mb-8 flex-grow">
                            Full-length simulation with 50 high-quality MCQs. The gold standard for exam preparation.
                          </p>
                          <Link href={`/quiz/${subject.slug}/${chapter.slug}?mode=full`} className="mt-auto">
                            <Button className="w-full rounded-xl py-8 text-lg font-bold shadow-xl shadow-primary/25 group-hover:scale-[1.02] transition-transform">
                              Full Practice (50 MCQs)
                            </Button>
                          </Link>
                        </CardContent>
                        <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="lg:col-span-4 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="sticky top-24 bg-card/80 backdrop-blur-lg border-border/50 shadow-xl overflow-hidden">
                    <div className="h-2 w-full bg-primary" />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Chapter Intel
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="space-y-4">
                        {[
                          { label: "Completion Time", value: "35-45 mins", icon: Clock },
                          { label: "Target Accuracy", value: "85%+", icon: ShieldCheck },
                          { label: "Success Rate", value: "72%", icon: BarChart },
                          { label: "Total Students", value: "4.8k+", icon: Star },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center justify-between py-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <stat.icon className="h-4 w-4" />
                              <span className="text-sm font-medium">{stat.label}</span>
                            </div>
                            <span className="font-bold">{stat.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-2xl bg-accent/50 border border-border/50 relative overflow-hidden group">
                        <div className="flex items-center gap-2 text-primary font-bold mb-2">
                          <Info className="h-4 w-4" />
                          <span className="text-sm">Expert Tip</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                          "Focus on the explanations of incorrect answers. That's where real learning happens."
                        </p>
                        <div className="absolute -right-4 -bottom-4 h-12 w-12 bg-primary/5 rounded-full blur-xl" />
                      </div>

                      <div className="space-y-3">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Ready to begin?</p>
                        <Link href={`/quiz/${subject.slug}/${chapter.slug}?mode=full`}>
                          <Button className="w-full rounded-xl" size="lg">
                            Go Full Mode
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function RocketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.71-2.5.71-2.5s-1.79 0-2.5-.71Z" />
      <path d="M12 10 9 13l-2 2 4 4 3-3 2.5-7.5L12 10Z" />
      <path d="m16.5 4.5-4.5 4.5-1.5 1.5 6 6 1.5-1.5 4.5-4.5c1.26-1.5.5-6.5.5-6.5s-5-.76-6.5.5Z" />
      <path d="m12 15.8 1 1" />
      <path d="m15 18 1 1" />
    </svg>
  );
}

function TargetIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
