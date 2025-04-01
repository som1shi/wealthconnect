"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// mock data extraction results
const mockExtractionResults = {
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
};

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("initializing");
  const [extractedData, setExtractedData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [processingComplete, setProcessingComplete] = useState(false);

  useEffect(() => {
    // Get the uploaded file name from localStorage
    const uploadedFileName = localStorage.getItem('uploadedFileName') || "financial_document.pdf";
    setFileName(uploadedFileName);

    // Simulate the document processing steps
    const simulateProcessing = async () => {
      // Step 1: Initialize
      setCurrentStep("initializing");
      await incrementProgress(0, 10);
      
      // Step 2: Document loading
      setCurrentStep("loading");
      await incrementProgress(10, 20);
      
      // Step 3: OCR processing
      setCurrentStep("ocr");
      await incrementProgress(20, 40);
      
      // Step 4: Data extraction
      setCurrentStep("extracting");
      await incrementProgress(40, 70);
      
      // Step 5: Analysis
      setCurrentStep("analyzing");
      await incrementProgress(70, 90);
      
      // Step 6: Finalizing
      setCurrentStep("finalizing");
      
      // Show the extracted data
      setExtractedData(mockExtractionResults);
      
      await incrementProgress(90, 100);
      
      // Mark processing as complete
      setProcessingComplete(true);
      
      // After 3 seconds, redirect to the dashboard
      setTimeout(() => {
        // Store the extracted data in localStorage for the dashboard to use
        localStorage.setItem('debtData', JSON.stringify(mockExtractionResults));
        router.push('/demo/dashboard');
      }, 3000);
    };
    
    simulateProcessing();
  }, [router]);
  
  // Helper function to increment progress smoothly
  const incrementProgress = async (from, to) => {
    const step = (to - from) / 10;
    for (let i = 0; i <= 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(Math.min(from + step * i, to));
    }
  };
  
  // Function to render the current processing step
  const renderProcessingStep = () => {
    switch (currentStep) {
      case "initializing":
        return "Initializing document processor...";
      case "loading":
        return "Loading document into memory...";
      case "ocr":
        return "Performing OCR on document pages...";
      case "extracting":
        return "Extracting financial data from document...";
      case "analyzing":
        return "Analyzing debt information...";
      case "finalizing":
        return "Finalizing and preparing dashboard...";
      default:
        return "Processing document...";
    }
  };
  
  // Function to render the extracted data
  const renderExtractedData = () => {
    if (!extractedData) return null;
    
    return (
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium">Extracted Financial Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Student Loans Card */}
          <Card className="border bg-blue-50 dark:bg-blue-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Student Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">${extractedData.studentLoans.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium">{extractedData.studentLoans.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Payment:</span>
                  <span className="font-medium">${extractedData.studentLoans.monthlyPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Percent Paid:</span>
                  <span className="font-medium">{extractedData.studentLoans.percentPaid}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Credit Cards Card */}
          <Card className="border bg-teal-50 dark:bg-teal-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Credit Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">${extractedData.creditCards.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium">{extractedData.creditCards.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Payment:</span>
                  <span className="font-medium">${extractedData.creditCards.monthlyPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Percent Paid:</span>
                  <span className="font-medium">{extractedData.creditCards.percentPaid}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Auto Loan Card */}
          <Card className="border bg-purple-50 dark:bg-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Auto Loan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">${extractedData.autoLoan.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium">{extractedData.autoLoan.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Payment:</span>
                  <span className="font-medium">${extractedData.autoLoan.monthlyPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Percent Paid:</span>
                  <span className="font-medium">{extractedData.autoLoan.percentPaid}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium">Analysis Complete</h4>
              <p className="text-xs text-muted-foreground mt-1">
                We've successfully extracted your financial information. Redirecting you to your personalized debt dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <Card className="border bg-background shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Processing Your Financial Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M8 10v8" />
                    <path d="M12 14v4" />
                    <path d="M16 12v6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{fileName}</h3>
                  <p className="text-sm text-muted-foreground">Analyzing your financial document to extract debt information</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{renderProcessingStep()}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              {processingComplete && renderExtractedData()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 