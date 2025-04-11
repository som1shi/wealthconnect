import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from 'pdf-lib';

export async function POST(req: NextRequest) {
  try {
    const { pdfData } = await req.json();
    
    if (!pdfData) {
      return NextResponse.json({ error: "No PDF data provided" }, { status: 400 });
    }

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
    // we'll return metadata about the PDF
    return NextResponse.json({ 
      pageCount: pageCount,
      metadata: "PDF document loaded successfully",
      text: `[PDF Document]\nPage Count: ${pageCount}\n`
    });
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return NextResponse.json(
      { error: "Failed to extract PDF text" },
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