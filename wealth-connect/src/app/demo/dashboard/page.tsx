"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

export default function DemoDashboard() {
  const [debtData, setDebtData] = useState({
    studentLoans: {
      totalAmount: 12500,
      interestRate: 5.8,
      monthlyPayment: 350,
      paidAmount: 10200,
      remainingAmount: 12500,
      percentPaid: 45
    },
    creditCards: {
      totalAmount: 5350,
      interestRate: 18.9,
      monthlyPayment: 125,
      paidAmount: 1350,
      remainingAmount: 5350,
      percentPaid: 20
    },
    autoLoan: {
      totalAmount: 7000,
      interestRate: 4.2,
      monthlyPayment: 400,
      paidAmount: 10500,
      remainingAmount: 7000,
      percentPaid: 60
    }
  });
  
  const [totalDebt, setTotalDebt] = useState(24850);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    // Check if we have debt data from the processing page
    const storedDebtData = localStorage.getItem('debtData');
    if (storedDebtData) {
      const parsedData = JSON.parse(storedDebtData);
      setDebtData(parsedData);
      
      // Calculate total debt
      const total = parsedData.studentLoans.totalAmount + 
                    parsedData.creditCards.totalAmount + 
                    parsedData.autoLoan.totalAmount;
      setTotalDebt(total);
      
      // Mark that data has been updated
      setIsDataUpdated(true);
      
      // Clear the stored data to prevent showing the highlight on refresh
      setTimeout(() => {
        localStorage.removeItem('debtData');
        setIsDataUpdated(false);
      }, 5000);
    }
  }, []);

  // Add notification component for updates
  const UpdateNotification = () => {
    if (!isDataUpdated) return null;

    return (
      <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Updated! </strong>
        <span className="block sm:inline">Your financial information has been updated based on the uploaded document.</span>
      </div>
    );
  };

  // Calculate percentages for the pie chart
  const studentLoanPercent = Math.round((debtData.studentLoans.totalAmount / totalDebt) * 100);
  const creditCardPercent = Math.round((debtData.creditCards.totalAmount / totalDebt) * 100);
  const autoLoanPercent = Math.round((debtData.autoLoan.totalAmount / totalDebt) * 100);

  // Add the missing RefinanceDetails component
  const RefinanceDetails = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Refinance Options</h3>
        <p className="text-sm text-muted-foreground">
          Based on your current debt profile, you may be eligible for these refinancing options.
        </p>
        
        <div className="space-y-4 mt-4">
          {/* Credit Card Refinance Option */}
          <div className="border rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-sm">Credit Card Consolidation</h4>
                <p className="text-xs text-muted-foreground">Personal Loan</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 text-xs px-2 py-1 rounded-full">
                Save $1,240
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>Current: 18.9%</span>
                  <span className="font-medium">New: 8.5%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "55%" }}></div>
                </div>
              </div>
            </div>
            <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
              Apply Now
            </Button>
          </div>
          
          {/* Student Loan Refinance Option */}
          <div className="border rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-sm">Student Loan Refinance</h4>
                <p className="text-xs text-muted-foreground">Fixed Rate</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 text-xs px-2 py-1 rounded-full">
                Save $850
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>Current: 5.8%</span>
                  <span className="font-medium">New: 4.2%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "28%" }}></div>
                </div>
              </div>
            </div>
            <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const DebtBreakdownDetails = () => (
    <div className="space-y-6">
      {/* Mini Pie Chart */}
      <div className="flex justify-center mb-6">
        <div className="relative h-40 w-40">
          {/* Student Loans */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 36 36" className="h-40 w-40">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeDasharray={`${studentLoanPercent}, 100`}
                strokeLinecap="round"
                className={isDataUpdated ? "animate-pulse" : ""}
              />
            </svg>
          </div>
          
          {/* Credit Cards */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 36 36" className="h-40 w-40">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#5eead4"
                strokeWidth="3"
                strokeDasharray={`${creditCardPercent}, 100`}
                strokeDashoffset={`-${studentLoanPercent}`}
                strokeLinecap="round"
                className={isDataUpdated ? "animate-pulse" : ""}
              />
            </svg>
          </div>
          
          {/* Auto Loan */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 36 36" className="h-40 w-40">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="3"
                strokeDasharray={`${autoLoanPercent}, 100`}
                strokeDashoffset={`-${studentLoanPercent + creditCardPercent}`}
                strokeLinecap="round"
                className={isDataUpdated ? "animate-pulse" : ""}
              />
            </svg>
          </div>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-semibold">Total Debt</p>
              <p className={`text-xl font-bold ${isDataUpdated ? "text-blue-600" : ""}`}>
                ${totalDebt.toLocaleString()}
              </p>
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
              <span className={`text-sm font-medium ${isDataUpdated ? "text-blue-600" : ""}`}>
                ${debtData.studentLoans.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-blue-400 h-2 rounded-full ${isDataUpdated ? "animate-pulse" : ""}`} 
                style={{ width: `${studentLoanPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{studentLoanPercent}% of total</span>
              <span>Interest: {debtData.studentLoans.interestRate}%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Credit Cards</span>
              <span className={`text-sm font-medium ${isDataUpdated ? "text-blue-600" : ""}`}>
                ${debtData.creditCards.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-teal-400 h-2 rounded-full ${isDataUpdated ? "animate-pulse" : ""}`} 
                style={{ width: `${creditCardPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{creditCardPercent}% of total</span>
              <span>Interest: {debtData.creditCards.interestRate}%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Auto Loan</span>
              <span className={`text-sm font-medium ${isDataUpdated ? "text-blue-600" : ""}`}>
                ${debtData.autoLoan.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-purple-400 h-2 rounded-full ${isDataUpdated ? "animate-pulse" : ""}`} 
                style={{ width: `${autoLoanPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{autoLoanPercent}% of total</span>
              <span>Interest: {debtData.autoLoan.interestRate}%</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Student Loans</span>
              <span className="text-sm font-medium">{debtData.studentLoans.percentPaid}% paid</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-blue-400 h-2 rounded-full ${isDataUpdated ? "animate-pulse" : ""}`} 
                style={{ width: `${debtData.studentLoans.percentPaid}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${debtData.studentLoans.paidAmount.toLocaleString()} paid</span>
              <span>${debtData.studentLoans.remainingAmount.toLocaleString()} remaining</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Credit Cards</span>
              <span className="text-sm font-medium">{debtData.creditCards.percentPaid}% paid</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-teal-400 h-2 rounded-full ${isDataUpdated ? "animate-pulse" : ""}`} 
                style={{ width: `${debtData.creditCards.percentPaid}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${debtData.creditCards.paidAmount.toLocaleString()} paid</span>
              <span>${debtData.creditCards.remainingAmount.toLocaleString()} remaining</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Auto Loan</span>
              <span className="text-sm font-medium">{debtData.autoLoan.percentPaid}% paid</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-purple-400 h-2 rounded-full ${isDataUpdated ? "animate-pulse" : ""}`} 
                style={{ width: `${debtData.autoLoan.percentPaid}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${debtData.autoLoan.paidAmount.toLocaleString()} paid</span>
              <span>${debtData.autoLoan.remainingAmount.toLocaleString()} remaining</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Show notification when data is updated */}
      <UpdateNotification />
      
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
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Debt Breakdown</h3>
                  <p className="text-sm text-muted-foreground">
                    Your current debt distribution.
                  </p>
                  
                  <div className="flex justify-center mb-6">
                    <div className="relative h-40 w-40">
                      {/* Student Loans */}
                      <div className="absolute inset-0">
                        <svg viewBox="0 0 36 36" className="h-40 w-40">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#60a5fa"
                            strokeWidth="3"
                            strokeDasharray={`${studentLoanPercent}, 100`}
                            strokeLinecap="round"
                            className={isDataUpdated ? "animate-pulse" : ""}
                          />
                        </svg>
                      </div>
                      
                      {/* Credit Cards */}
                      <div className="absolute inset-0">
                        <svg viewBox="0 0 36 36" className="h-40 w-40">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#5eead4"
                            strokeWidth="3"
                            strokeDasharray={`${creditCardPercent}, 100`}
                            strokeDashoffset={`-${studentLoanPercent}`}
                            strokeLinecap="round"
                            className={isDataUpdated ? "animate-pulse" : ""}
                          />
                        </svg>
                      </div>
                      
                      {/* Auto Loan */}
                      <div className="absolute inset-0">
                        <svg viewBox="0 0 36 36" className="h-40 w-40">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#a78bfa"
                            strokeWidth="3"
                            strokeDasharray={`${autoLoanPercent}, 100`}
                            strokeDashoffset={`-${studentLoanPercent + creditCardPercent}`}
                            strokeLinecap="round"
                            className={isDataUpdated ? "animate-pulse" : ""}
                          />
                        </svg>
                      </div>
                      
                      {/* Center text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm font-semibold">Total Debt</p>
                          <p className={`text-xl font-bold ${isDataUpdated ? "text-blue-600" : ""}`}>
                            ${totalDebt.toLocaleString()}
                          </p>
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
                </div>
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
