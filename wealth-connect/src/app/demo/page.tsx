"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sampleStatements = [
  {
    name: "Financial Statement 1",
    description: "Sample financial statement with student loans",
    path: "/sample-statements/statement1.pdf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
  {
    name: "Financial Statement 2",
    description: "Sample financial statement with credit cards",
    path: "/sample-statements/statement2.pdf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
  {
    name: "Financial Statement 3",
    description: "Sample financial statement with auto loans",
    path: "/sample-statements/statement3.pdf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
];

export default function DemoPage() {
  const [files, setFiles] = useState<File[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      setFiles((prevFiles) => (prevFiles ? [...prevFiles, ...newFiles] : newFiles));
      
      e.target.value = '';
    }
  };

  const handleSampleFileSelect = async (path: string) => {
    try {
      setIsUploading(true);
      setProcessingStatus("Fetching sample file...");
      
      const response = await fetch(path);
      const blob = await response.blob();
      const fileName = path.split('/').pop() || 'sample.pdf';
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        sessionStorage.setItem('uploadedFile', base64Data);
        localStorage.setItem('uploadedFileName', fileName);
        
        window.location.href = '/demo/processing';
      };
      reader.readAsDataURL(blob);
    } catch (error: unknown) {
      console.error('Error loading sample file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Could not load sample file.';
      setProcessingStatus(`Error: ${errorMessage}`);
      setIsUploading(false);
      
      setTimeout(() => {
        setProcessingStatus("");
      }, 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setIsProcessing(true);
    setProcessingStatus("Reading files...");
    
    try {
      const fileDataArray = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProcessingStatus(`Reading file ${i + 1} of ${files.length}...`);
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        fileDataArray.push({ name: file.name, data: base64Data });
      }

      setProcessingStatus("Sending files for AI analysis...");

      const response = await fetch('/api/process-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: fileDataArray }),
      });

      if (!response.ok) {
        let errorMsg = 'Failed to process files.';
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) { /* Ignore parsing error */ } 
        throw new Error(errorMsg);
      }

      const result = await response.json();

      localStorage.setItem('debtData', JSON.stringify(result.combinedData));
      localStorage.setItem('dataUpdated', 'true');

      setProcessingStatus("Analysis complete!");
      setIsProcessing(false);
      setIsUploading(false);
      setIsUploaded(true);

    } catch (error: unknown) {
      console.error('Error handling files:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setProcessingStatus(`Error: ${errorMessage}`);
      
      setTimeout(() => {
        setIsUploading(false);
        setIsProcessing(false);
        setProcessingStatus("");
      }, 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {isUploaded ? (
          <Card className="border bg-background shadow-lg">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Analysis Complete!</CardTitle>
              <CardDescription className="text-center mt-2">
                Your financial documents have been processed successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-6 text-center text-muted-foreground">
                View your personalized debt management dashboard.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90">
                <Link href="/demo/dashboard">View Your Debt Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border bg-background shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Try Our Demo</CardTitle>
              <CardDescription className="text-center mt-2">
                Upload financial documents or try one of our sample statements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Sample Statements</h3>
                <div className="grid gap-4">
                  {sampleStatements.map((statement, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors"
                      onClick={() => handleSampleFileSelect(statement.path)}
                    >
                      <div className="mr-4">
                        {statement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{statement.name}</h4>
                        <p className="text-sm text-muted-foreground">{statement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or upload your own</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-muted-foreground">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M8 10v8" />
                    <path d="M12 14v4" />
                    <path d="M16 12v6" />
                  </svg>
                  
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-1">
                      {files && files.length > 0
                        ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
                        : "Drag and drop PDFs pertaining to your auto loan, credit card, and student loan here or click to browse"}
                    </label>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                    />
                    <div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className="mt-2"
                      >
                        Select Files
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">PDF files only, max 10MB per file</p>
                  </div>
                </div>
                
                {files && files.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
                    <div className="max-h-40 overflow-y-auto rounded-lg border bg-background p-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between py-1 px-2 text-sm">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <path d="M14 2v6h6" />
                            </svg>
                            <span className="truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2"><strong>Don&apos;t have a document?</strong> No problem! You can:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use our <Link href="/demo/dashboard" className="text-blue-600 hover:underline">sample dashboard</Link> instead</li>
                    <li>Or just <Button variant="link" className="h-auto p-0 text-blue-600" onClick={() => setIsUploaded(true)}>skip the upload</Button></li>
                  </ul>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
                  disabled={!files || files.length === 0 || isUploading || isProcessing}
                >
                  {isProcessing ? processingStatus : (isUploading ? "Uploading..." : "Upload & Analyze")}
                </Button>
              </form>

              {isProcessing && !isUploaded && (
                 <div className="mt-4 text-center text-sm text-muted-foreground">
                   {processingStatus}
                   <div className="flex justify-center mt-2">
                     <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                   </div>
                 </div>
              )}

            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 