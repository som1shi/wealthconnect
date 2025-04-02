"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardDemo() {
  const [debtData, setDebtData] = useState({
    studentLoans: {
      totalAmount: 15750,
      interestRate: 5.25,
      monthlyPayment: 225,
      amountPaid: 8450,
      remaining: 7300
    },
    creditCards: {
      totalAmount: 3875,
      interestRate: 16.99,
      monthlyPayment: 95,
      amountPaid: 950,
      remaining: 2925
    },
    autoLoan: {
      totalAmount: 28500,
      interestRate: 3.75,
      monthlyPayment: 485,
      amountPaid: 12650,
      remaining: 15850
    }
  });
  const [newData, setNewData] = useState(false);

  // Check for updated data in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('pdfDebtData');
    const dataUpdated = localStorage.getItem('dataUpdated');
    
    if (storedData && dataUpdated === 'true') {
      try {
        const parsedData = JSON.parse(storedData);
        setDebtData(parsedData);
        setNewData(true);
        // Reset the flag
        localStorage.setItem('dataUpdated', 'false');
      } catch (error) {
        console.error("Error parsing stored debt data:", error);
      }
    }
  }, []);

  // Calculate total debt
  const totalDebt = 
    debtData.studentLoans.totalAmount + 
    debtData.creditCards.totalAmount + 
    debtData.autoLoan.totalAmount;
  
  // Calculate remaining debt
  const remainingDebt = 
    debtData.studentLoans.remaining + 
    debtData.creditCards.remaining + 
    debtData.autoLoan.remaining;
  
  // Calculate monthly payments
  const totalMonthlyPayment = 
    debtData.studentLoans.monthlyPayment + 
    debtData.creditCards.monthlyPayment + 
    debtData.autoLoan.monthlyPayment;
  
  // Calculate weighted average interest rate
  const weightedInterestRate = (
    (debtData.studentLoans.interestRate * debtData.studentLoans.totalAmount) +
    (debtData.creditCards.interestRate * debtData.creditCards.totalAmount) +
    (debtData.autoLoan.interestRate * debtData.autoLoan.totalAmount)
  ) / totalDebt;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Debt Dashboard</h1>
        <Button asChild variant="outline" size="sm">
          <Link href="/demo">← Back to Home</Link>
        </Button>
      </div>
      
      {newData && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-green-700 dark:text-green-300 font-medium">
            Your data has been successfully imported and analyzed! 
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Debt</CardDescription>
            <CardTitle className="text-3xl">${totalDebt.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Combined balance across all accounts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Remaining Balance</CardDescription>
            <CardTitle className="text-3xl">${remainingDebt.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {((remainingDebt / totalDebt) * 100).toFixed(1)}% of original debt remaining
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Payment</CardDescription>
            <CardTitle className="text-3xl">${totalMonthlyPayment.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Combined monthly payments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Interest Rate</CardDescription>
            <CardTitle className="text-3xl">{weightedInterestRate.toFixed(2)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Weighted average across accounts
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Debt Breakdown */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Debt Breakdown</CardTitle>
            <CardDescription>
              Your current debt portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Student Loans */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Student Loans</span>
                  <span className="text-sm text-muted-foreground">
                    ${debtData.studentLoans.remaining.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div 
                    className="h-2 rounded-full bg-blue-500" 
                    style={{ width: `${(debtData.studentLoans.remaining / remainingDebt) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Credit Cards */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Credit Cards</span>
                  <span className="text-sm text-muted-foreground">
                    ${debtData.creditCards.remaining.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div 
                    className="h-2 rounded-full bg-teal-500" 
                    style={{ width: `${(debtData.creditCards.remaining / remainingDebt) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Auto Loan */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Auto Loan</span>
                  <span className="text-sm text-muted-foreground">
                    ${debtData.autoLoan.remaining.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div 
                    className="h-2 rounded-full bg-purple-500" 
                    style={{ width: `${(debtData.autoLoan.remaining / remainingDebt) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Refinance Opportunities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Refinance Opportunities</CardTitle>
            <CardDescription>
              Potential savings through refinancing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Credit Card Refinance */}
              <div className="p-4 border rounded-md bg-teal-50 dark:bg-teal-900/20">
                <h4 className="font-medium mb-2">Credit Card Debt Consolidation</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Current Rate:</span>
                  <span className="text-sm font-medium">{debtData.creditCards.interestRate}%</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Potential Rate:</span>
                  <span className="text-sm font-medium text-green-600">9.99%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Monthly Savings:</span>
                  <span className="text-sm font-medium text-green-600">$22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Savings:</span>
                  <span className="text-sm font-medium text-green-600">$792</span>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:opacity-90 transition-opacity">
                  See Offers
                </Button>
              </div>
              
              {/* Student Loan Refinance */}
              <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-medium mb-2">Student Loan Refinance</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Current Rate:</span>
                  <span className="text-sm font-medium">{debtData.studentLoans.interestRate}%</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Potential Rate:</span>
                  <span className="text-sm font-medium text-green-600">4.25%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Monthly Savings:</span>
                  <span className="text-sm font-medium text-green-600">$18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Savings:</span>
                  <span className="text-sm font-medium text-green-600">$648</span>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:opacity-90 transition-opacity">
                  See Offers
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Financial Insights */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Financial Insights</CardTitle>
              <CardDescription>
                Tips to improve your financial health
              </CardDescription>
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-medium">Debt Avalanche Strategy</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Pay off your credit card debt first to save approximately $342 in interest over 12 months.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-medium">Emergency Fund</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Consider saving at least 3 months of expenses ($4,800) in an emergency fund before accelerating debt payments.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h4 className="font-medium">Auto Loan Payoff Milestone</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  You{"'"}re 44% through your auto loan term. Maintaining your current payment schedule will have it paid off in 32 months.
                </p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h4 className="font-medium">Bi-weekly Payments</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Making bi-weekly payments instead of monthly could save you $1,260 in interest and pay off your debt 8 months earlier.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
