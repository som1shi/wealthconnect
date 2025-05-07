import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, PiggyBank, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-50 dark:from-background dark:to-neutral-900/50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Payment Methods</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to pay for ReFi services
            </p>
          </div>

          <Tabs defaultValue="subscription" className="mb-16">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="subscription">Monthly Subscription</TabsTrigger>
              <TabsTrigger value="savings">Savings Cut</TabsTrigger>
              <TabsTrigger value="transaction">Transaction Fee</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subscription">
              <Card className="border bg-background shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="h-6 w-6 text-blue-500" />
                    <CardTitle>Monthly Subscription</CardTitle>
                  </div>
                  <CardDescription>$12 monthly fee after a 1-week trial period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Our base subscription gives you access to all core features:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Debt analysis dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Refinancing opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Payment tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Basic financial insights</span>
                      </li>
                    </ul>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mt-6">
                      <p className="text-sm">
                        <strong>Note:</strong> The subscription fee is charged regardless of whether you use our refinancing services.
                      </p>
                    </div>
                    
                    <Button 
                      asChild
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
                    >
                      <Link href="/pricing/checkout">Start 7-Day Free Trial</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="savings">
              <Card className="border bg-background shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <PiggyBank className="h-6 w-6 text-blue-500" />
                    <CardTitle>10% of Savings</CardTitle>
                  </div>
                  <CardDescription>We take a small percentage of what we help you save</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>How our savings fee works:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>We identify refinancing opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>You save money through lower interest rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>We take 10% of your total savings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>You keep 90% of the savings</span>
                      </li>
                    </ul>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md mt-6">
                      <p className="text-sm">
                        <strong>Example:</strong> If we help you save $3,600 through refinancing, our fee would be $360, and you'd keep $3,240.
                      </p>
                    </div>
                    
                    <Button 
                      asChild
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
                    >
                      <Link href="/pricing/checkout">View Refinancing Options</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transaction">
              <Card className="border bg-background shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="h-6 w-6 text-blue-500" />
                    <CardTitle>1.75% Transaction Fee</CardTitle>
                  </div>
                  <CardDescription>Applied only to payments made through our platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Our transaction fee applies when:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>You make loan payments through ReFi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>You use our auto-payment features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>You make extra payments to reduce principal</span>
                      </li>
                    </ul>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mt-6">
                      <p className="text-sm">
                        <strong>Example:</strong> On a $350 student loan payment, the fee would be $6.13.
                      </p>
                    </div>
                    
                    <Button 
                      asChild
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
                    >
                      <Link href="/pricing/checkout">Make a Payment</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who are saving money with ReFi's hybrid pricing model.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 group"
            >
              <Link href="/pricing/checkout">
                <span className="flex items-center gap-2">
                  Sign Up Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}