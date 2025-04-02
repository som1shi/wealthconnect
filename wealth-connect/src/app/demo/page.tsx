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
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSampleFileSelect = async (path: string) => {
    try {
      setIsUploading(true);
      const response = await fetch(path);
      const blob = await response.blob();
      const fileName = path.split('/').pop() || 'sample.pdf';
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        sessionStorage.setItem('uploadedFile', base64Data);
        localStorage.setItem('uploadedFileName', fileName);
        window.location.href = '/demo/processing';
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error loading sample file:', error);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Read file as Data URL (this automatically handles base64 encoding)
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      
      // Store the base64 data (it's already in the correct format)
      sessionStorage.setItem('uploadedFile', base64Data);
      localStorage.setItem('uploadedFileName', file.name);
      
      window.location.href = '/demo/processing';
    } catch (error) {
      console.error('Error handling file:', error);
      setIsUploading(false);
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
              <CardTitle className="text-2xl text-center">Upload Successful!</CardTitle>
              <CardDescription className="text-center mt-2">
                Your document has been processed successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-6 text-center text-muted-foreground">
                We&apos;ve analyzed your financial document and prepared a personalized debt management dashboard for you.
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
                Upload a financial document or try one of our sample statements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Sample Statements Section */}
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

              {/* Your existing file upload form */}
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
                      {file ? file.name : "Drag and drop your PDF here or click to browse"}
                    </label>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className="mt-2"
                      >
                        Select File
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">PDF files only, max 10MB</p>
                  </div>
                </div>
                
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
                  disabled={!file || isUploading}
                >
                  {isUploading ? "Processing..." : "Upload & Process"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 
