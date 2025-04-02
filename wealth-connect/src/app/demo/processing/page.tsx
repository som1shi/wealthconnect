"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Simulate processing steps
  useEffect(() => {
    // Define the stages of processing
    const processingSteps = [
      { step: 1, duration: 1000, progress: 15 },
      { step: 2, duration: 2000, progress: 35 },
      { step: 3, duration: 1500, progress: 60 },
      { step: 4, duration: 2000, progress: 80 },
      { step: 5, duration: 1500, progress: 100 }
    ];
    
    // Process each step in sequence
    const processSteps = async () => {
      for (const step of processingSteps) {
        await new Promise(resolve => setTimeout(resolve, step.duration));
        setCurrentStep(step.step);
        setProgress(step.progress);
      }
      
      // After all steps, redirect to the dashboard
      setTimeout(() => {
        // Save mock data to localStorage
        const mockData = {
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
        };
        
        localStorage.setItem('pdfDebtData', JSON.stringify(mockData));
        localStorage.setItem('dataUpdated', 'true');
        
        router.push('/demo/dashboard');
      }, 1000);
    };
    
    processSteps().catch(err => {
      console.error("Processing error:", err);
      setError("An error occurred while processing your document");
    });
    
    // Cleanup function
    return () => {
      // Nothing to clean up
    };
  }, [router]);
  
  // Step descriptions
  const stepDescriptions = [
    "Parsing document",
    "Extracting financial data",
    "Analyzing accounts",
    "Finding savings opportunities",
    "Preparing your dashboard"
  ];
  
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border bg-background">
        <CardHeader>
          <CardTitle className="text-center">Processing Your Document</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Analyzing your financial data to unlock personalized recommendations
            </p>
            <Progress value={progress} className="h-2 mb-4" />
            <p className="text-sm text-muted-foreground">Step {currentStep} of 5</p>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md">
              <p>{error}</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/demo">Try Again</Link>
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            {stepDescriptions.map((description, index) => (
              <div key={index} className="relative">
                <div className={`flex items-center space-x-2 ${currentStep >= index + 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    currentStep > index + 1 
                      ? 'bg-primary text-white' 
                      : currentStep === index + 1 
                        ? 'bg-primary text-white'
                        : 'border text-muted-foreground'
                  }`}>
                    {currentStep > index + 1 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span>{description}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
