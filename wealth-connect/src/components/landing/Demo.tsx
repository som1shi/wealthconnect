"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const demoFeatures = [
  {
    title: "Debt Breakdown Analysis",
    description: "Visualize your debt allocation and track progress with intuitive charts and insights.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-blue-500">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
      </svg>
    ),
    details: (
      <div className="mt-6 space-y-6">
        {/* Mini Pie Chart */}
        <div className="flex justify-center mb-6">
          <div className="relative h-40 w-40">
            {/* Student Loans - 50% */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 36 36" className="h-40 w-40">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  strokeDasharray="50, 100"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Credit Cards - 22% */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 36 36" className="h-40 w-40">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#5eead4"
                  strokeWidth="3"
                  strokeDasharray="22, 100"
                  strokeDashoffset="-50"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Auto Loan - 28% */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 36 36" className="h-40 w-40">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="3"
                  strokeDasharray="28, 100"
                  strokeDashoffset="-72"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold">Total Debt</p>
                <p className="text-xl font-bold">$24,850</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-400"></div>
            <span className="text-xs">Student Loans</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-teal-400"></div>
            <span className="text-xs">Credit Cards</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-purple-400"></div>
            <span className="text-xs">Auto Loan</span>
          </div>
        </div>
        
        <Tabs defaultValue="breakdown" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breakdown" className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Student Loans</span>
                <span className="text-sm font-medium">$12,500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: "50%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50% of total</span>
                <span>Interest: 5.8%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Credit Cards</span>
                <span className="text-sm font-medium">$5,350</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-400 h-2 rounded-full" style={{ width: "22%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>22% of total</span>
                <span>Interest: 18.9%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Auto Loan</span>
                <span className="text-sm font-medium">$7,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: "28%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>28% of total</span>
                <span>Interest: 4.2%</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Student Loans</span>
                <span className="text-sm font-medium">45% paid</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$10,200 paid</span>
                <span>$12,500 remaining</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Credit Cards</span>
                <span className="text-sm font-medium">20% paid</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-400 h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$1,350 paid</span>
                <span>$5,350 remaining</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Auto Loan</span>
                <span className="text-sm font-medium">60% paid</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$10,500 paid</span>
                <span>$7,000 remaining</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
  {
    title: "Refinance Opportunities",
    description: "Discover potential savings through AI-powered refinancing recommendations and alerts.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-blue-500">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    details: (
      <div className="mt-6 space-y-6">
        {/* Savings Bar Chart */}
        <div className="flex flex-col space-y-2">
          <div className="text-center text-sm font-medium mb-2">Potential Interest Savings</div>
          <div className="relative h-28 flex items-end gap-2 border-b border-gray-200 pt-2 pb-4">
            {/* Current Rates */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-full bg-red-200 dark:bg-red-900/30 h-20 rounded-t-sm relative flex items-center justify-center">
                <span className="absolute text-xs font-medium">$4,980</span>
              </div>
              <span className="text-xs pt-1">Current</span>
            </div>
            
            {/* Refinanced Rates */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-full bg-green-200 dark:bg-green-900/30 h-12 rounded-t-sm relative flex items-center justify-center">
                <span className="absolute text-xs font-medium">$2,850</span>
              </div>
              <span className="text-xs pt-1">Refinanced</span>
            </div>
            
            {/* Savings */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="h-16 w-[2px] bg-dashed bg-gray-300 dark:bg-gray-600 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 absolute -top-2 -right-2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-green-600 mt-1">$2,130</span>
                <span className="text-xs text-green-600">saved</span>
              </div>
              <span className="text-xs pt-1">Savings</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="student">Student Loan</TabsTrigger>
            <TabsTrigger value="credit">Credit Card</TabsTrigger>
          </TabsList>
          
          <TabsContent value="student" className="space-y-4">
            <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Rate Drop Alert: Student Loan</h4>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Current rate: 6.8%</span> 
                    <span>Available rate: 4.5%</span>
                  </div>
                  
                  <div className="mt-3 mb-2">
                    <div className="text-xs mb-1">Loan term: <span className="font-medium">10 years</span></div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">5</span>
                      <div className="flex-1">
                        <Slider defaultValue={10} max={20} step={1} className="w-full" />
                      </div>
                      <span className="text-xs">20</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs mt-2">
                    <span>Monthly payment: <span className="font-medium">$144 → $130</span></span>
                    <span className="text-green-600 font-medium">Save $2,450</span>
                  </div>
                  
                  <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                    See Pre-qualified Rates
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="credit" className="space-y-4">
            <div className="p-3 border rounded-lg bg-teal-50 dark:bg-teal-900/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Balance Transfer Opportunity</h4>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Current rate: 18.9% APR</span>
                    <span>Offer: 0% APR</span>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 rounded-md p-2 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Transfer amount:</span>
                      <span className="text-xs font-medium">$5,350</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs">Monthly payment:</span>
                      <span className="text-xs font-medium">$297/mo</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs">Promotion period:</span>
                      <span className="text-xs font-medium">18 months</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs">Transfer fee:</span>
                      <span className="text-xs font-medium">$160 (3%)</span>
                    </div>
                    <div className="border-t mt-2 pt-2 flex items-center justify-between">
                      <span className="text-xs font-medium">Net savings:</span>
                      <span className="text-xs font-medium text-green-600">$680</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                    Apply for Transfer
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
  {
    title: "Financial Insights",
    description: "Receive personalized tips and strategies to accelerate your debt payoff journey.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-blue-500">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    ),
    details: (
      <div className="mt-6 space-y-6">
        <Tabs defaultValue="snowball" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="snowball">Debt Snowball</TabsTrigger>
            <TabsTrigger value="budget">Budget Rule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="snowball" className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border">
              <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                      <line x1="19" y1="5" x2="5" y2="19"></line>
                      <circle cx="6.5" cy="6.5" r="2.5"></circle>
                      <circle cx="17.5" cy="17.5" r="2.5"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Debt Snowball Method</h4>
                    <p className="text-xs text-muted-foreground">Pay off smaller debts first to build momentum and motivation.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-medium">Your debt payoff order:</span>
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">Why this works</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-xs font-medium">1</span>
                    <div className="flex-1 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                      <span className="text-xs font-medium">Credit Card</span>
                      <span className="text-xs">$5,350</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-xs font-medium">2</span>
                    <div className="flex-1 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                      <span className="text-xs font-medium">Auto Loan</span>
                      <span className="text-xs">$7,000</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-xs font-medium">3</span>
                    <div className="flex-1 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                      <span className="text-xs font-medium">Student Loans</span>
                      <span className="text-xs">$12,500</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div className="text-xs">
                      Using this method, you'll be debt-free <span className="font-medium">7 months sooner</span> and save <span className="font-medium">$840</span> in interest!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="budget" className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border">
              <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <line x1="12" y1="22" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">50/30/20 Budget Rule</h4>
                    <p className="text-xs text-muted-foreground">Allocate 50% to needs, 30% to wants, and 20% to savings & debt.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <div className="text-xs mb-2">Monthly income: <span className="font-medium">$4,500</span></div>
                
                {/* Interactive budget chart */}
                <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex overflow-hidden">
                  <div className="bg-blue-400 h-full flex items-center justify-center" style={{ width: "50%" }}>
                    <span className="text-xs font-medium text-white">Needs<br/>$2,250</span>
                  </div>
                  <div className="bg-purple-400 h-full flex items-center justify-center" style={{ width: "30%" }}>
                    <span className="text-xs font-medium text-white">Wants<br/>$1,350</span>
                  </div>
                  <div className="bg-green-400 h-full flex items-center justify-center" style={{ width: "20%" }}>
                    <span className="text-xs font-medium text-white">Savings<br/>$900</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      <span className="text-xs">Needs</span>
                    </div>
                    <div className="text-xs">
                      Housing, utilities, groceries, transportation, insurance
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                      <span className="text-xs">Wants</span>
                    </div>
                    <div className="text-xs">
                      Dining out, entertainment, shopping, subscriptions
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="text-xs">Savings & Debt</span>
                    </div>
                    <div className="text-xs">
                      Emergency fund, retirement, extra debt payments
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div className="text-xs">
                      Putting an extra <span className="font-medium">$250/month</span> toward debt can save you <span className="font-medium">$1,850</span> in interest over time!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }
];

export function Demos() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 w-full" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Smart tools for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              debt management
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience our powerful features designed to help you take control of your finances and eliminate debt faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {demoFeatures.map((feature, index) => (
            <Card
              key={index}
              className="border bg-background shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
                {feature.details}
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
} 