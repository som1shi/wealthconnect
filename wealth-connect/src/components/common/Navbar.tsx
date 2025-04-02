import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              ReFi
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            href="/features"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Features
          </Link>
          <Link
            href="/use-cases"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Use Cases
          </Link>
          <Link
            href="/pricing"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/demo">Demo</Link>
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-teal-500" asChild>
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 
