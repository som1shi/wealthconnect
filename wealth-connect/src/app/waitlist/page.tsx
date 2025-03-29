"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxPYfhUUGuiSQ0WbYwN-Yt-Sy9FOGWlJrvfLkd7idQd_t4NAfXjp5SZBQCMgXmwgj-9Qw/exec",
        {
          method: "POST",
          body: formData,
          mode: "no-cors"
        }
      );
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-background rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Join Our Waitlist
          </h1>
          <p className="text-muted-foreground mt-2">
            Be among the first to experience our powerful debt management tools.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Thanks for joining!</h2>
            <p className="text-muted-foreground">
              We&apos;ll notify you as soon as we&apos;re ready to launch.
            </p>
            <Button asChild className="mt-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Join Waitlist"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">
              We respect your privacy and will never share your information.
            </p>
          </form>
        )}
      </div>
    </div>
  );
} 