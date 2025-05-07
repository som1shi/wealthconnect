import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-50 dark:from-background dark:to-neutral-900/50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">About ReFi</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto"></div>
          </div>
          
          <div className="space-y-20">
            <section>
              <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                At ReFi, we're revolutionizing wealth building through cutting-edge technology. 
                Our mission is to democratize access to sophisticated financial tools and strategies, 
                making professional-grade investment capabilities available to everyone. We believe that 
                financial prosperity shouldn't be limited by traditional barriers - it should be 
                accessible to all who seek it.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-12 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Leadership Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <div className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold mb-1">Ben Greenlee</h3>
                  <p className="text-muted-foreground font-medium mb-3">Chief Executive Officer</p>
                  <div className="h-px w-12 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                </div>
                
                <div className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold mb-1">Ajay Madala</h3>
                  <p className="text-muted-foreground font-medium mb-3">Chief Financial Officer</p>
                  <div className="h-px w-12 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                </div>
                
                <div className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold mb-1">Pratik Gandhi</h3>
                  <p className="text-muted-foreground font-medium mb-3">Chief Operating Officer</p>
                  <div className="h-px w-12 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                </div>
                
                <div className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold mb-1">Sarvagya Somvanshi</h3>
                  <p className="text-muted-foreground font-medium mb-3">Chief Technology Officer</p>
                  <div className="h-px w-12 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                </div>
                
                <div className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold mb-1">Rohil Khare</h3>
                  <p className="text-muted-foreground font-medium mb-3">Chief Technology Officer</p>
                  <div className="h-px w-12 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                </div>
                
                <div className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold mb-1">Mihika Bhatnagar</h3>
                  <p className="text-muted-foreground font-medium mb-3">Chief Information Officer</p>
                  <div className="h-px w-12 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                </div>
              </div>
            </section>

            <section className="text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6">Join Our Journey</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We're always looking for passionate individuals who share our vision 
                  of making financial freedom accessible to everyone.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                  <Link href="/careers">View Open Positions</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
