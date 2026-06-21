'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { subjects } from '@/data/subjects';
import { ChevronRight, Play, BookOpen, Award, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-primary font-medium mb-6">
              <Link href="/subjects" className="hover:underline">Subjects</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/subjects/${subject.slug}`} className="hover:underline">{subject.name}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-muted-foreground">{chapter.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold mb-4">{chapter.title}</h1>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Badge variant="secondary">{subject.name}</Badge>
                  <Badge
                    variant="secondary"
                    className={
                      chapter.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' :
                      chapter.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' :
                      'bg-red-500/10 text-red-600'
                    }
                  >
                    {chapter.difficulty} Difficulty
                  </Badge>
                  <Badge variant="outline">50 MCQs</Badge>
                </div>

                <div className="prose dark:prose-invert max-w-none mb-12">
                  <h2 className="text-2xl font-bold mb-4">Quick Revision Notes</h2>
                  <Card className="bg-accent/30 border-none">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed">
                        This chapter covers essential concepts of {chapter.title} strictly according to the latest SSC CGL and BPSC syllabus.
                        We recommend going through the basic concepts before attempting the full practice mode.
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span>Focus on conceptual clarity and fast calculation techniques.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span>Includes Previous Year Questions (PYQs) from 2018-2024.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span>Detailed explanations provided for every question.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="hover:border-primary transition-colors cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <RocketIcon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Quick Practice</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Practice 25 selected questions to quickly test your knowledge.
                      </p>
                      <Link href={`/quiz/${subject.slug}/${chapter.slug}?mode=quick`}>
                        <Button className="w-full">Start (25 MCQs)</Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="hover:border-primary transition-colors cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <TargetIcon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Full Practice</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Complete set of 50 questions for comprehensive preparation.
                      </p>
                      <Link href={`/quiz/${subject.slug}/${chapter.slug}?mode=full`}>
                        <Button className="w-full">Start (50 MCQs)</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Chapter Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Total MCQs</span>
                      <span className="font-bold">50</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Complexity</span>
                      <span className="font-bold">{chapter.difficulty}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Avg. Time</span>
                      <span className="font-bold">35s / q</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary font-bold mb-2">
                      <Info className="h-5 w-5" />
                      <span>Exam Tip</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "In SSC CGL, speed is as important as accuracy. Try to solve easy questions in under 20 seconds."
                    </p>
                  </CardContent>
                </Card>
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
