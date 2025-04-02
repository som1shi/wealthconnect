import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UseCasesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Use Cases</h1>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">For Individual Investors</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Retirement Planning</h3>
                <p className="text-muted-foreground">Build and maintain a retirement portfolio that meets your goals.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Wealth Building</h3>
                <p className="text-muted-foreground">Create a diversified portfolio for long-term wealth accumulation.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">For Financial Advisors</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Client Management</h3>
                <p className="text-muted-foreground">Efficiently manage multiple client portfolios with our advanced tools.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Portfolio Analysis</h3>
                <p className="text-muted-foreground">Generate detailed reports and insights for client presentations.</p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500">
              <Link href="/waitlist">Start Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}