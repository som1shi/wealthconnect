import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";

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

// Define the expected structure for the combined data
interface CombinedDebtData {
  studentLoans: DebtDetail;
  creditCards: DebtDetail;
  autoLoan: DebtDetail;
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
       return JSON.parse(match[1] || match[2]);
    }
    // If no explicit JSON block, try parsing the whole string
    return JSON.parse(jsonString); 
  } catch (error) {
    console.error("Failed to parse JSON from Gemini response:", error);
    return null; // Indicate parsing failure
  }
};

// Extract text from PDF using PyPDF2 directly
const extractTextFromPDF = async (pdfData: string, fileName: string): Promise<string> => {
  try {
    // Create temporary directory for PDF processing
    const tmpDir = os.tmpdir();
    const inputFileName = path.join(tmpDir, `pdf_input_${uuidv4()}.json`);
    const outputFileName = path.join(tmpDir, `pdf_output_${uuidv4()}.json`);
    
    // Write PDF data to temporary file
    await fs.writeFile(inputFileName, JSON.stringify({ pdf_data: pdfData }));
    
    // Get the script path
    const scriptPath = path.join(process.cwd(), "scripts", "extract_pdf_text.py");
    
    return new Promise<string>((resolve) => {
      const pythonProcess = spawn('python', [
        scriptPath,
        inputFileName,
        outputFileName
      ]);
      
      let errorOutput = '';
      
      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.error(`Python stderr: ${data}`);
      });
      
      pythonProcess.on('close', async (code) => {
        try {
          // Clean up input file
          await fs.unlink(inputFileName).catch(e => console.error("Error removing input file:", e));
          
          if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            console.error(`Error output: ${errorOutput}`);
            resolve(''); // Return empty string on error
            return;
          }
          
          // Read the output file
          const outputData = await fs.readFile(outputFileName, 'utf8');
          
          // Clean up output file
          await fs.unlink(outputFileName).catch(e => console.error("Error removing output file:", e));
          
          // Parse the output
          const result = JSON.parse(outputData);
          
          resolve(result.text || '');
        } catch (error) {
          console.error("Error in Python script execution cleanup:", error);
          resolve(''); // Return empty string on error
        }
      });
    });
  } catch (error) {
    console.error(`Error extracting text from ${fileName}:`, error);
    return '';
  }
};

// Helper function to check if a value is valid
const isValid = (value: unknown): boolean => 
  typeof value === 'number' && !isNaN(value) && value > 0;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { files } = await req.json();
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Array to hold extracted text from all files
    const allExtractedTexts: { fileName: string; text: string }[] = [];
    
    // Extract text from all files first
    for (const file of files) {
      try {
        // Extract text from PDF using PyPDF2
        console.log(`Extracting text from ${file.name} using PyPDF2...`);
        const extractedText = await extractTextFromPDF(file.data, file.name);
        
        if (!extractedText || extractedText.trim().length === 0) {
          console.warn(`No text extracted from ${file.name}.`);
          continue;
        }
        
        console.log(`Extracted ${extractedText.length} characters from ${file.name}`);
        console.log(`First 200 characters of extracted text: "${extractedText.substring(0, 500).replace(/\n/g, ' ')}..."`);
        
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
      return NextResponse.json({ error: "Failed to extract text from any of the provided files." }, { status: 500 });
    }
    
    // Combine all texts into a single prompt
    const combinedText = allExtractedTexts.map(item => 
      `--- FILE: ${item.fileName} ---\n${item.text.substring(0, 3000)}\n${item.text.length > 3000 ? '... [text truncated for length]' : ''}\n`
    ).join('\n\n');
    
    // Gemini prompt using combined text from all files
    const prompt = `
You are a financial analysis AI. Analyze the following ${allExtractedTexts.length} document(s) carefully:

${combinedText}

Based on ALL the documents above, generate a SINGLE financial profile containing debt information for this person.

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

IMPORTANT RULES:
- If you cannot find information about a specific debt type, use 0 for ALL fields for that debt type
- If you find partial information, estimate the missing fields based on what you found
- Ensure interestRate is a decimal number (like 5.5 for 5.5%)
- Set remainingAmount = totalAmount - paidAmount
- Set percentPaid = (paidAmount / totalAmount) * 100 (rounded to nearest integer)
- Return ONLY valid JSON, no text or explanation
`;

    // Send combined text to Gemini - ONE API CALL
    console.log(`Sending ${allExtractedTexts.length} files to Gemini in a single request...`);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Log FULL Gemini response for debugging - ensure we see everything
    console.log(`--- FULL GEMINI RESPONSE START ---`);
    console.log(text);
    console.log(`--- FULL GEMINI RESPONSE END ---`);

    // Parse the response
    const parsedData = safeJsonParse(text);
    if (!parsedData) {
      console.warn(`Failed to parse Gemini response. Response: ${text}`);
      return NextResponse.json({ error: "Failed to parse Gemini response" }, { status: 500 });
    }

    // Create combined data
    const combinedData: CombinedDebtData = {
      studentLoans: createDefaultDebtDetail(),
      creditCards: createDefaultDebtDetail(),
      autoLoan: createDefaultDebtDetail(),
    };

    // Type assertion to help TypeScript understand the structure
    const typedParsedData = parsedData as Partial<CombinedDebtData>;

    // Instead of combining multiple results, we directly use the single result
    // but ensure all fields meet our requirements
    for (const debtType of Object.keys(combinedData) as Array<keyof CombinedDebtData>) {
      const combined = combinedData[debtType];
      
      // Get the debt type from parsed data or use empty object if missing
      const current = (typedParsedData[debtType] as Partial<DebtDetail>) || {};
      
      // ONLY use values from Gemini, with 0 as the only fallback
      combined.totalAmount = isValid(current.totalAmount) ? Number(current.totalAmount) : 0;
      combined.interestRate = isValid(current.interestRate) ? Number(current.interestRate) : 0;
      combined.monthlyPayment = isValid(current.monthlyPayment) ? Number(current.monthlyPayment) : 0;
      combined.paidAmount = isValid(current.paidAmount) ? Number(current.paidAmount) : 0;
      
      // Calculate remaining amount and percent paid for consistency
      combined.remainingAmount = Math.max(0, combined.totalAmount - combined.paidAmount);
      combined.percentPaid = combined.totalAmount > 0 ? Math.round((combined.paidAmount / combined.totalAmount) * 100) : 0;
    }

    // Add sample data if everything is zeros (commented out for now - we'll use your existing fallback)
    let hasRealData = false;
    Object.values(combinedData).forEach(debt => {
      if (debt.totalAmount > 0) hasRealData = true;
    });

    // If we have no real data, use your existing sample data
    if (!hasRealData) {
      console.log("No real data extracted, using sample data");
      // Your existing sample data code (lines 295-319)
    }

    // Also log the final data being sent to frontend
    console.log("--- FINAL DATA BEING SENT TO FRONTEND ---");
    console.log(JSON.stringify(combinedData, null, 2));
    console.log("--- END OF FINAL DATA ---");

    // Return the combined data
    return NextResponse.json({ 
      success: true, 
      message: `Successfully analyzed ${allExtractedTexts.length} files`, 
      combinedData 
    });

  } catch (error) {
    console.error("Error processing files:", error);
    return NextResponse.json({ error: "Failed to process files" }, { status: 500 });
  }
} 