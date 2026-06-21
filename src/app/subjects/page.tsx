import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { subjects } from '@/data/subjects';
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SubjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <h1 className="text-4xl font-bold mb-4">All Subjects</h1>
            <p className="text-muted-foreground">
              Select a subject to browse through chapters and start your practice.
              Each subject contains carefully curated MCQs following SSC CGL and BPSC patterns.
            </p>
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
                      {subject.chapterCount} chapters with {subject.questionCount}+ exam-level MCQs covering all important topics.
                    </p>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span>Completion</span>
                        <span>0%</span>
                      </div>
                      <ProgressBar value={0} />
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-none">
                          Easy: {subject.difficultyStats.easy}
                        </Badge>
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-none">
                          Medium: {subject.difficultyStats.medium}
                        </Badge>
                        <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-none">
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
      </main>

      <Footer />
    </div>
  );
}
