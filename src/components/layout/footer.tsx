import Link from 'next/link';
import { GraduationCap, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary p-1 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">ExamPrep <span className="text-primary">Pro</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium chapter-wise practice platform for SSC CGL and BPSC aspirants.
              No login, no payments, just high-quality practice.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/subjects/math" className="hover:text-primary transition-colors">Mathematics</Link></li>
              <li><Link href="/subjects/reasoning" className="hover:text-primary transition-colors">Reasoning</Link></li>
              <li><Link href="/subjects/gs" className="hover:text-primary transition-colors">General Studies</Link></li>
              <li><Link href="/subjects/english" className="hover:text-primary transition-colors">English</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/mock-test" className="hover:text-primary transition-colors">Full Mock Tests</Link></li>
              <li><Link href="/mixed-quiz" className="hover:text-primary transition-colors">Mixed Quiz</Link></li>
              <li><Link href="/bookmarks" className="hover:text-primary transition-colors">Bookmarked MCQs</Link></li>
              <li><Link href="/revision" className="hover:text-primary transition-colors">Revision Mode</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 rounded-full bg-accent hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Designed for serious exam preparation.
            </p>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ExamPrep Pro. Built with ❤️ for aspirants.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-primary">Terms</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
