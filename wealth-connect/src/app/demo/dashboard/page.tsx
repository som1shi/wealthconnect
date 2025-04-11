"use client"

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
} from "lucide-react";
import Link from "next/link";

interface DebtData {
  totalAmount: number;
  interestRate: number;
  monthlyPayment: number;
  paidAmount: number;
  remainingAmount: number;
  percentPaid: number;
}

interface SummaryMetricsType {
  totalDebt: number;
  monthlyChange: number;
  monthlyPayment: number;
  nextPaymentDate: string;
  debtFreeDate: string;
  yearsRemaining: number;
  interestSaved: number;
  interestSavedChange: number;
}

// Add UpdateNotification component
const UpdateNotification = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isUpdated = localStorage.getItem('dataUpdated');
    if (isUpdated === 'true') {
      setShow(true);
      localStorage.removeItem('dataUpdated');
      
      // Hide notification after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Data updated successfully!</span>
        <button onClick={() => setShow(false)} className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Add RefinanceDetails component before the main DashboardPage component
const RefinanceDetails = () => {
  const refinanceOptions = [
    {
      lender: "SoFi",
      type: "Student Loan Refinancing",
      rate: "4.25%",
      monthlySavings: 85,
      totalSavings: 5200,
      terms: "5-15 years"
    },
    {
      lender: "LendingClub",
      type: "Credit Card Consolidation",
      rate: "8.99%",
      monthlySavings: 120,
      totalSavings: 3600,
      terms: "3-5 years"
    },
    {
      lender: "Earnest",
      type: "Student Loan Refinancing",
      rate: "4.45%",
      monthlySavings: 75,
      totalSavings: 4800,
      terms: "5-20 years"
    }
  ];

  return (
    <div className="space-y-4">
      {refinanceOptions.map((option, index) => (
        <div key={index} className="border rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{option.lender}</h3>
              <p className="text-sm text-muted-foreground">{option.type}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{option.rate}</p>
              <p className="text-sm text-muted-foreground">Fixed APR</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Monthly Savings</p>
              <p className="font-medium text-green-600">${option.monthlySavings}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-muted-foreground">Total Savings</p>
              <p className="font-medium text-green-600">${option.totalSavings}</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [debtData, setDebtData] = useState<Record<string, DebtData>>({
    studentLoans: {
      totalAmount: 0,
      interestRate: 0,
      monthlyPayment: 0,
      paidAmount: 0,
      remainingAmount: 0,
      percentPaid: 0
    },
    creditCards: {
      totalAmount: 0,
      interestRate: 0,
      monthlyPayment: 0,
      paidAmount: 0,
      remainingAmount: 0,
      percentPaid: 0
    },
    autoLoan: {
      totalAmount: 0,
      interestRate: 0,
      monthlyPayment: 0,
      paidAmount: 0,
      remainingAmount: 0,
      percentPaid: 0
    }
  });
  const [summaryMetrics, setSummaryMetrics] = useState<SummaryMetricsType>({
    totalDebt: 0,
    monthlyChange: 0,
    monthlyPayment: 0,
    nextPaymentDate: '',
    debtFreeDate: '',
    yearsRemaining: 0,
    interestSaved: 0,
    interestSavedChange: 0
  });

  // Add the calculateTotalDebt function
  const calculateTotalDebt = (): number => {
    if (!debtData) return 0;
    return Object.values(debtData).reduce((sum, debt) => {
      return sum + (debt?.totalAmount || 0);
    }, 0);
  };

  useEffect(() => {
    // Get the most recent data from localStorage
    const storedData = localStorage.getItem('debtData');
    
    if (storedData) {
      try {
        // Check if storedData is undefined or "undefined" string
        if (storedData === "undefined" || storedData === "null") {
          return; // Use default values
        }
        
        // Add proper type assertion here
        const extractedData = JSON.parse(storedData) as Record<string, DebtData>;
        
        // Validate extracted data has the expected shape
        if (!extractedData || typeof extractedData !== 'object') {
          return; // Use default values
        }
        
        // Set the debt data state with the parsed data
        setDebtData(extractedData);
        
        // Calculate summary metrics - TypeScript will now understand the types
        const totalDebt = Object.values(extractedData).reduce((sum, debt) => 
          sum + (debt?.totalAmount || 0), 0);
        
        const monthlyPayment = Object.values(extractedData).reduce((sum, debt) => 
          sum + (debt?.monthlyPayment || 0), 0);
        
        // Calculate weighted average interest rate
        const weightedRate = totalDebt > 0 
          ? Object.values(extractedData).reduce((sum, debt) => 
              sum + ((debt?.totalAmount || 0) * (debt?.interestRate || 0)), 0) / totalDebt 
          : 0;

        // Calculate months remaining
        const totalRemaining = Object.values(extractedData).reduce((sum, debt) => 
          sum + (debt?.remainingAmount || 0), 0);
        
        const months = monthlyPayment > 0 ? Math.ceil(totalRemaining / monthlyPayment) : 0;

        // Next payment date and debt-free date calculation
        const nextPaymentDate = new Date();
        nextPaymentDate.setDate(15);
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

        const debtFreeDate = new Date();
        debtFreeDate.setMonth(debtFreeDate.getMonth() + months);

        setSummaryMetrics({
          totalDebt,
          monthlyChange: -monthlyPayment,
          monthlyPayment,
          nextPaymentDate: nextPaymentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
          debtFreeDate: debtFreeDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          yearsRemaining: Math.round((months / 12) * 10) / 10,
          interestSaved: Math.round(totalDebt * (weightedRate/100) * 0.15),
          interestSavedChange: Math.round(monthlyPayment * (weightedRate/1200))
        });

      } catch (error) {
        console.error('Error parsing debt data:', error);
      }
    }
  }, []);

  // Fix the calculatePercentages function
  const calculatePercentages = () => {
    if (!debtData?.studentLoans) {
      return {
        studentLoanPercent: 0,
        creditCardPercent: 0,
        autoLoanPercent: 0
      };
    }

    const total = calculateTotalDebt();
    if (total === 0) {
      return {
        studentLoanPercent: 0,
        creditCardPercent: 0,
        autoLoanPercent: 0
      };
    }

    return {
      studentLoanPercent: Math.round((debtData.studentLoans.totalAmount / total) * 100),
      creditCardPercent: Math.round((debtData.creditCards.totalAmount / total) * 100),
      autoLoanPercent: Math.round((debtData.autoLoan.totalAmount / total) * 100)
    };
  };

  const { studentLoanPercent, creditCardPercent, autoLoanPercent } = calculatePercentages();

  const DebtBreakdownDetails = () => {
    // Return early if data is not loaded
    if (!debtData.studentLoans || !debtData.creditCards || !debtData.autoLoan) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Loading debt breakdown...
        </div>
      );
    }

    const total = calculateTotalDebt();
    
    return (
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
                />
              </svg>
            </div>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold">Total Debt</p>
                <p className="text-xl font-bold">
                  ${total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Debt Breakdown Details */}
        <div className="space-y-4">
          {/* Student Loans */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Student Loans</span>
              <span className="text-sm font-medium">
                ${debtData.studentLoans.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full" 
                style={{ width: `${(debtData.studentLoans.totalAmount / total * 100).toFixed(1)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{(debtData.studentLoans.totalAmount / total * 100).toFixed(1)}% of total</span>
              <span>Interest: {debtData.studentLoans.interestRate}%</span>
            </div>
          </div>

          {/* Credit Cards */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Credit Cards</span>
              <span className="text-sm font-medium">
                ${debtData.creditCards.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-400 h-2 rounded-full" 
                style={{ width: `${(debtData.creditCards.totalAmount / total * 100).toFixed(1)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{(debtData.creditCards.totalAmount / total * 100).toFixed(1)}% of total</span>
              <span>Interest: {debtData.creditCards.interestRate}%</span>
            </div>
          </div>

          {/* Auto Loan */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Auto Loan</span>
              <span className="text-sm font-medium">
                ${debtData.autoLoan.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-400 h-2 rounded-full" 
                style={{ width: `${(debtData.autoLoan.totalAmount / total * 100).toFixed(1)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{(debtData.autoLoan.totalAmount / total * 100).toFixed(1)}% of total</span>
              <span>Interest: {debtData.autoLoan.interestRate}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add the SummaryMetrics component
  const SummaryMetrics = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Total Debt</h3>
          <div className="text-2xl font-bold">
            ${(summaryMetrics?.totalDebt || 0).toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">
            ${Math.abs(summaryMetrics?.monthlyChange || 0).toLocaleString()} since last month
          </p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
          <div className="text-2xl font-bold">
            ${(summaryMetrics?.monthlyPayment || 0).toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">
            Next payment: {summaryMetrics?.nextPaymentDate || 'N/A'}
          </p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Debt-Free Date</h3>
          <div className="text-2xl font-bold">
            {summaryMetrics?.debtFreeDate || 'N/A'}
          </div>
          <p className="text-sm text-muted-foreground">
            {summaryMetrics?.yearsRemaining || 0} years remaining
          </p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Interest Saved</h3>
          <div className="text-2xl font-bold">
            ${(summaryMetrics?.interestSaved || 0).toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">
            ${summaryMetrics?.interestSavedChange || 0} since last month
          </p>
        </div>
      </Card>
    </div>
  );

  // Community highlight component
  const CommunityHighlight = () => {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Community Highlights
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <CheckSquare className="h-4 w-4 text-primary" />
            </div>
            <div className="grid gap-1">
              <p className="font-medium">Magali paid off 25% of their loan</p>
              <p className="text-muted-foreground">
                &quot;I&apos;ve been making consistent extra payments through your auto loan term. It&apos;s amazing to see the progress!&quot;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

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
            <SummaryMetrics />
            
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
                          />
                        </svg>
                      </div>
                      
                      {/* Center text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm font-semibold">Total Debt</p>
                          <p className="text-xl font-bold">
                            ${calculateTotalDebt().toLocaleString()}
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
                <CommunityHighlight />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
