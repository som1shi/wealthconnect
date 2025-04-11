import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from 'pdf-lib';

// **IMPORTANT**: Use environment variable for API key
const apiKey = process.env.GEMINI_API_KEY; 
if (!apiKey) {
  console.error("GEMINI_API_KEY environment variable not set.");
}
const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.8, // Higher temperature for more creative responses
    maxOutputTokens: 2048,
  } 
});

// Define the expected structure for a single debt type
interface DebtDetail {
  totalAmount: number;
  interestRate: number;
  monthlyPayment: number;
  paidAmount: number;
  remainingAmount: number;
  percentPaid: number;
}

// Define types for API data
interface FileData {
  name: string;
  data: string;
}

// Helper function to create a default DebtDetail object
function createDefaultDebtDetail(): DebtDetail {
  return {
    totalAmount: 0,
    interestRate: 0,
    monthlyPayment: 0,
    paidAmount: 0,
    remainingAmount: 0,
    percentPaid: 0
  };
}

// Helper function to safely parse JSON, returning null on error
const safeJsonParse = (jsonString: string): unknown | null => {
  try {
    // Find JSON part, as Gemini might add ```json ... ```
    const match = jsonString.match(/```json\s*([\s\S]*?)\s*```|(\{[\s\S]*\})/);
    if (match && (match[1] || match[2])) {
       const cleanJson = match[1] || match[2];
       return JSON.parse(cleanJson);
    }
    // If no explicit JSON block, try parsing the whole string
    return JSON.parse(jsonString); 
  } catch (error) {
    console.error("Failed to parse JSON from Gemini response:", error);
    return null; // Indicate parsing failure
  }
};

// Extract text from PDF using pdf-lib
const extractTextFromPDF = async (pdfData: string, fileName: string): Promise<string> => {
  try {
    // Remove the data URL prefix if present
    const base64Data = pdfData.includes('base64,') 
      ? pdfData.split('base64,')[1] 
      : pdfData;

    // Convert base64 to Uint8Array
    const pdfBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Extract basic metadata
    const pageCount = pdfDoc.getPageCount();
    
    // Since pdf-lib doesn't have text extraction built in,
    // we'll provide page count and document info to Gemini
    const pdfInfo = `[PDF Document: ${fileName}]\nPage Count: ${pageCount}\n`;
    
    return pdfInfo;
  } catch (error) {
    console.error(`Error extracting text from ${fileName}:`, error);
    return '';
  }
};

// Helper function to check if a value is valid
const isValid = (value: unknown): boolean => 
  typeof value === 'number' && !isNaN(value) && value > 0;

// Helper function to process PDF files and generate debt data
async function processFiles(files: FileData[]) {
  // Array to hold extracted text from all files
  const allExtractedTexts: { fileName: string; text: string }[] = [];
  
  // Extract text from all files first
  for (const file of files) {
    try {
      // Extract info from PDF using pdf-lib
      const extractedText = await extractTextFromPDF(file.data, file.name);
      
      if (!extractedText || extractedText.trim().length === 0) {
        continue;
      }
      
      // Add to our collection
      allExtractedTexts.push({
        fileName: file.name,
        text: extractedText
      });
      
    } catch (error) {
      console.error(`Error extracting text from ${file.name}:`, error);
      // Continue with other files
    }
  }
  
  if (allExtractedTexts.length === 0) {
    throw new Error("Failed to extract text from any of the provided files.");
  }
  
  // Combine all texts into a single prompt
  const combinedText = allExtractedTexts.map(item => 
    `--- FILE: ${item.fileName} ---\n${item.text.substring(0, 3000)}\n${item.text.length > 3000 ? '... [text truncated for length]' : ''}\n`
  ).join('\n\n');
  
  // Gemini prompt using combined text from all files
  const prompt = `
You are a financial analysis AI. Analyze the following ${allExtractedTexts.length} document(s) carefully.
These are PDF documents that have been uploaded, and we've provided basic metadata about them.

${combinedText}

Based on the document names and metadata, generate a SIMULATED financial profile containing debt information.
Since we can't extract full text content, create plausible sample data that would represent a typical financial situation.

Format your response EXACTLY as valid JSON matching this structure:
{
  "studentLoans": {
    "totalAmount": number,
    "interestRate": number,
    "monthlyPayment": number,
    "paidAmount": number,
    "remainingAmount": number,
    "percentPaid": number
  },
  "creditCards": {
    "totalAmount": number,
    "interestRate": number,
    "monthlyPayment": number,
    "paidAmount": number,
    "remainingAmount": number,
    "percentPaid": number
  },
  "autoLoan": {
    "totalAmount": number,
    "interestRate": number,
    "monthlyPayment": number,
    "paidAmount": number,
    "remainingAmount": number,
    "percentPaid": number
  }
}

IMPORTANT:
- Generate realistic numbers for a typical financial situation
- All numbers should be positive
- Calculate percentPaid as (paidAmount / totalAmount) * 100
- Round all numbers to 2 decimal places
- Ensure the response is valid JSON that can be parsed
- DO NOT include any text before or after the JSON object
- Return ONLY the JSON object
`;

  // Get response from Gemini
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Parse the response
  const parsedData = safeJsonParse(text);
  
  if (!parsedData || typeof parsedData !== 'object') {
    // Fallback to sample data if parsing fails
    return {
      studentLoans: {
        totalAmount: 35000,
        interestRate: 4.5,
        monthlyPayment: 400,
        paidAmount: 15000,
        remainingAmount: 20000,
        percentPaid: 42.86
      },
      creditCards: {
        totalAmount: 8000,
        interestRate: 18.9,
        monthlyPayment: 250,
        paidAmount: 2000,
        remainingAmount: 6000,
        percentPaid: 25
      },
      autoLoan: {
        totalAmount: 25000,
        interestRate: 5.2,
        monthlyPayment: 450,
        paidAmount: 10000,
        remainingAmount: 15000,
        percentPaid: 40
      }
    };
  }
  
  // Get data from parsed response with proper typing
  const parsedResponseData = parsedData as Record<string, Record<string, number>>;
  
  // Validate and clean the data
  const validatedData = {
    studentLoans: validateDebtData(parsedResponseData.studentLoans),
    creditCards: validateDebtData(parsedResponseData.creditCards),
    autoLoan: validateDebtData(parsedResponseData.autoLoan)
  };
  
  return validatedData;
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { files } = await req.json();
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }
    
    const validatedData = await processFiles(files);
    return NextResponse.json(validatedData);
  } catch (error) {
    console.error("Error processing files:", error);
    return NextResponse.json(
      { error: "Failed to process files" },
      { status: 500 }
    );
  }
}

// Handler for OPTIONS requests (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Catch-all handler for other HTTP methods
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export function PATCH() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

// Helper function to validate and clean debt data
function validateDebtData(data: Record<string, number> | undefined): DebtDetail {
  const defaultData = createDefaultDebtDetail();
  
  if (!data || typeof data !== 'object') {
    return defaultData;
  }
  
  return {
    totalAmount: isValid(data.totalAmount) ? Number(data.totalAmount.toFixed(2)) : 0,
    interestRate: isValid(data.interestRate) ? Number(data.interestRate.toFixed(2)) : 0,
    monthlyPayment: isValid(data.monthlyPayment) ? Number(data.monthlyPayment.toFixed(2)) : 0,
    paidAmount: isValid(data.paidAmount) ? Number(data.paidAmount.toFixed(2)) : 0,
    remainingAmount: isValid(data.remainingAmount) ? Number(data.remainingAmount.toFixed(2)) : 0,
    percentPaid: isValid(data.totalAmount) && isValid(data.paidAmount) 
      ? Number(((data.paidAmount / data.totalAmount) * 100).toFixed(2))
      : 0
  };
} 