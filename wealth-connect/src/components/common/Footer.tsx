import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900/50 border-t w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                ReFi
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Empowering investors to build wealth and achieve financial freedom.
            </p>
            <div className="flex gap-4">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground transition-colors">
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Use Cases
              </Link>
              <Link href="/testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Security
              </Link>
              <Link href="/compliance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Compliance
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="font-medium mb-4">Subscribe to our newsletter</h3>
          <div className="flex gap-2 max-w-md">
            <Input type="email" placeholder="Enter your email" className="max-w-sm" />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WealthConnect. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 