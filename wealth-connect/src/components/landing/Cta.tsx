import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="py-24 relative overflow-hidden w-full">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.5), transparent 40%), " +
            "radial-gradient(circle at top left, rgba(20, 184, 166, 0.5), transparent 40%)",
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-background/80 backdrop-blur-lg border rounded-xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to start your journey to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                financial freedom?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of investors who are already growing their wealth with WealthConnect.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">See Demo</Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-center text-muted-foreground">
            <p>Early access coming soon. Be the first to know when we launch.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 