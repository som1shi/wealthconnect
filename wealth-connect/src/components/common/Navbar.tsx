import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              ReFi
            </span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              href="/features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="/use-cases"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Use Cases
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Button asChild variant="outline">
              <Link href="/demo">Try Demo</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/features">Features</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/use-cases">Use Cases</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/pricing">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/demo">Try Demo</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/waitlist">Join Waitlist</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
} 