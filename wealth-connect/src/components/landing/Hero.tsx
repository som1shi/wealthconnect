import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(37, 99, 235, 0.5), transparent 40%), " +
            "radial-gradient(circle at bottom left, rgba(20, 184, 166, 0.5), transparent 40%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Smart finance for the{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Everyone
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              WealthConnect combines AI-powered insights with human expertise to
              help you achieve financial freedom faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
                <Link href="/waitlist">Join Waitlist</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-neutral-100 dark:bg-neutral-800"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">2,500+</span> investors already
                growing their wealth
              </p>
            </div>
          </div>
          <div className="relative hidden md:flex justify-end">
            <div className="relative h-[500px] w-[400px] overflow-hidden rounded-lg border bg-background shadow-xl">
              <div className="p-4 border-b">
                <div className="h-6 w-2/3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500" />
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="h-32 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 opacity-70" />
                </div>
                <div className="h-4 w-3/4 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-4 w-2/3 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                <div className="flex gap-4 mt-4">
                  <div className="h-12 flex-1 rounded-md bg-neutral-100 dark:bg-neutral-800" />
                  <div className="h-12 flex-1 rounded-md bg-gradient-to-r from-blue-600 to-teal-500" />
                </div>
                <div className="mt-8">
                  <div className="h-32 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
                </div>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -left-12 top-1/4 h-20 w-20 rounded-xl bg-blue-500/20 backdrop-blur-xl animate-float-slow" />
            <div className="absolute -right-12 bottom-1/4 h-16 w-16 rounded-full bg-teal-500/20 backdrop-blur-xl animate-float" />
          </div>
        </div>
      </div>
    </div>
  );
} 