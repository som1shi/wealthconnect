import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-50 dark:from-background dark:to-neutral-900/50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">ReFi Pricing: Hybrid Model</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our transparent pricing structure is designed to align our success with yours
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-6">How Our Pricing Works</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">$12 Monthly Subscription</h3>
                    <p className="text-muted-foreground">We charge a $12 monthly subscription fee after a 1-week trial period</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">10% of Savings</h3>
                    <p className="text-muted-foreground">10% cut of any savings our platform helps users save</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">1.75% Transaction Fee</h3>
                    <p className="text-muted-foreground">1.75% transaction fee on payments through the app</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
                >
                  <Link href="/pricing/methods">View Payment Methods</Link>
                </Button>
              </div>
            </div>
            
            <Card className="border bg-background shadow-lg">
              <CardHeader>
                <CardTitle>Current Refinance Opportunity</CardTitle>
                <CardDescription>LendingClub Credit Card Consolidation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">Fixed APR</span>
                  <span className="font-semibold text-lg">8.99%</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-xl font-semibold text-green-500">$120</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Savings</p>
                    <p className="text-xl font-semibold text-green-500">$3600</p>
                  </div>
                </div>
                
                <Button asChild className="w-full mb-4">
                  <Link href="/demo/dashboard">View Details</Link>
                </Button>
                
                <div className="border-t pt-4 mt-2">
                  <h4 className="font-medium mb-3">Upcoming Payments</h4>
                  <div className="flex items-center gap-4 p-3 border rounded-lg mb-3">
                    <div className="text-center bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md">
                      <p className="text-lg font-bold">15</p>
                      <p className="text-xs">JUN</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Student Loan Payment</h4>
                      <p className="text-sm text-muted-foreground">Federal Student Aid</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">$350</p>
                      <Button asChild size="sm" className="mt-1 bg-blue-500 hover:bg-blue-600">
                        <Link href="/payment/checkout">Pay Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-16">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">Why This Model Works</h3>
                <p className="text-muted-foreground">
                  Our hybrid pricing model ensures we're incentivized to help you save money. 
                  We only benefit when you do, creating a true partnership in your financial journey.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
            >
              <Link href="/demo">Try Our Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
