"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const DebtBreakdownDetails = () => (
  <div className="space-y-6">
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
);

const RefinanceDetails = () => (
  <div className="space-y-6">
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
);

const FinancialInsightsDetails = () => (
  <div className="space-y-6">
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
                  Using this method, you&apos;ll be debt-free <span className="font-medium">7 months sooner</span> and save <span className="font-medium">$840</span> in interest!
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
);

export default function DemoDashboard() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Top Navigation */}
      <nav className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">ReFi</span>
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  <Link href="#dashboard" className="bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <Link href="#accounts" className="text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-md text-sm font-medium">My Accounts</Link>
                  <Link href="#repayment" className="text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-md text-sm font-medium">Debt Plan</Link>
                  <Link href="#alerts" className="text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-md text-sm font-medium">Alerts</Link>
                  <Link href="#insights" className="text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-md text-sm font-medium">Insights</Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/waitlist">Exit Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-background rounded-lg border p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Welcome Back</h3>
                  <p className="text-sm text-muted-foreground">Guest User</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <Link href="#dashboard" className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Dashboard</span>
                </Link>
                <Link href="#accounts" className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  <span>My Accounts</span>
                </Link>
                <Link href="#repayment" className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <span>Debt Plan</span>
                </Link>
                <Link href="#alerts" className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span>Alerts</span>
                </Link>
                <Link href="#insights" className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>Insights</span>
                </Link>
              </nav>
              
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-md p-3">
                <h4 className="text-sm font-medium">Debt Freedom Calculator</h4>
                <p className="text-xs text-muted-foreground mt-1">See how fast you can become debt-free</p>
                <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                  Calculate Now
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Your Debt Dashboard</h1>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 4v6h-6" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                  Refresh
                </Button>
              </div>
            </div>
            
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="p-4 border bg-background">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Debt</h3>
                    <p className="text-2xl font-bold mt-1">$24,850</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                      $750 since last month
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border bg-background">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                    <p className="text-2xl font-bold mt-1">$875</p>
                    <p className="text-xs text-muted-foreground mt-1">Next payment: June 15</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border bg-background">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Debt-Free Date</h3>
                    <p className="text-2xl font-bold mt-1">Mar 2026</p>
                    <p className="text-xs text-muted-foreground mt-1">2.8 years remaining</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                      <line x1="4" y1="22" x2="4" y2="15"></line>
                    </svg>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border bg-background">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Interest Saved</h3>
                    <p className="text-2xl font-bold mt-1">$3,219</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                      </svg>
                      $120 since last month
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Demo Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border bg-background overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">Debt Breakdown</h2>
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                      View All
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <DebtBreakdownDetails />
                </div>
              </Card>
              
              <Card className="border bg-background overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">Refinance Opportunities</h2>
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                      View All
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <RefinanceDetails />
                </div>
              </Card>
            </div>
            
            <Card className="border bg-background overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">Upcoming Payments</h2>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                    View All
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="text-center bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md">
                      <p className="text-lg font-bold">15</p>
                      <p className="text-xs">JUN</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Student Loan Payment</h4>
                      <p className="text-sm text-muted-foreground">Federal Student Aid</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$350</p>
                      <Button size="sm" className="mt-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="text-center bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md">
                      <p className="text-lg font-bold">18</p>
                      <p className="text-xs">JUN</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Credit Card Minimum</h4>
                      <p className="text-sm text-muted-foreground">Chase Freedom</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$125</p>
                      <Button size="sm" className="mt-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="text-center bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md">
                      <p className="text-lg font-bold">22</p>
                      <p className="text-xs">JUN</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Auto Loan Payment</h4>
                      <p className="text-sm text-muted-foreground">Capital One Auto</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$400</p>
                      <Button size="sm" className="mt-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right Sidebar */}
          <div className="md:col-span-3 space-y-6">
            <Card className="border bg-background overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Financial Insights</h3>
              </div>
              <div className="p-4">
                <FinancialInsightsDetails />
              </div>
            </Card>
            
            <Card className="border bg-background overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Premium Features</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="rounded-full h-8 w-8 bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16 8a4 4 0 0 0-8 0v2h8V8z"></path>
                        <rect x="8" y="10" width="8" height="10" rx="1"></rect>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Round-Up Payments</h4>
                      <p className="text-xs text-muted-foreground">Pay off debt faster with spare change</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="rounded-full h-8 w-8 bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Contract Analysis</h4>
                      <p className="text-xs text-muted-foreground">AI-powered loan term review</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="rounded-full h-8 w-8 bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1v22"></path>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Rate Negotiation</h4>
                      <p className="text-xs text-muted-foreground">Automated interest rate reduction</p>
                    </div>
                  </li>
                </ul>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                  Upgrade to Premium
                </Button>
              </div>
            </Card>
            
            <Card className="border bg-background overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Community Highlights</h3>
              </div>
              <div className="p-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                    <span className="font-medium text-sm">Sarah J.</span>
                  </div>
                  <p className="text-sm">"Just made my final student loan payment! The snowball method really worked for me."</p>
                  <div className="flex items-center gap-3 mt-2 text-muted-foreground text-xs">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      42
                    </span>
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      15
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Join the Community
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 