import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";

export async function POST(req: NextRequest) {
  try {
    const { pdfData } = await req.json();
    
    if (!pdfData) {
      return NextResponse.json({ error: "No PDF data provided" }, { status: 400 });
    }
    
    // Create temporary file to store input data
    const tmpDir = os.tmpdir();
    const inputFileName = path.join(tmpDir, `pdf_input_${uuidv4()}.json`);
    const outputFileName = path.join(tmpDir, `pdf_output_${uuidv4()}.json`);
    
    // Write input data to temporary file
    await fs.writeFile(inputFileName, JSON.stringify({ pdf_data: pdfData }));
    
    // Get the script path
    const scriptPath = path.join(process.cwd(), "scripts", "extract_pdf_text.py");
    
    // Run Python script with file paths as arguments
    return new Promise<NextResponse>((resolve) => {
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
            resolve(NextResponse.json(
              { error: "Failed to extract text from PDF" },
              { status: 500 }
            ));
            return;
          }
          
          // Read the output file
          const outputData = await fs.readFile(outputFileName, 'utf8');
          
          // Clean up output file
          await fs.unlink(outputFileName).catch(e => console.error("Error removing output file:", e));
          
          // Parse the output
          const result = JSON.parse(outputData);
          
          resolve(NextResponse.json(result));
        } catch (error) {
          console.error("Error in Python script execution cleanup:", error);
          resolve(NextResponse.json(
            { error: "Failed to extract text from PDF" },
            { status: 500 }
          ));
        }
      });
    });
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return NextResponse.json(
      { error: "Failed to extract text from PDF" },
      { status: 500 }
    );
  }
} 