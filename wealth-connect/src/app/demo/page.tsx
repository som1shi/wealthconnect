"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DemoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 1500);
    
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
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
                Upload a financial document to see how our debt management tools can help you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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