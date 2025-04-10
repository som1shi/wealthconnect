#!/usr/bin/env python3
import base64
import json
import sys
from PyPDF2 import PdfReader
import io

def extract_text_from_pdf_base64(base64_data):
    try:
        # Remove data URL prefix if present
        if "base64," in base64_data:
            base64_data = base64_data.split("base64,")[1]
        
        # Decode base64 to binary data
        binary_data = base64.b64decode(base64_data)
        
        # Create file-like object
        pdf_file = io.BytesIO(binary_data)
        
        # Create PDF reader
        reader = PdfReader(pdf_file)
        
        # Extract text from all pages
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        return text
    except Exception as e:
        print(f"Error extracting text: {e}", file=sys.stderr)
        return ""

if __name__ == "__main__":
    # Check if we have the right number of arguments
    if len(sys.argv) != 3:
        print("Usage: extract_pdf_text.py <input_file> <output_file>", file=sys.stderr)
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    try:
        # Read input file
        with open(input_file, 'r') as f:
            input_data = json.load(f)
        
        base64_data = input_data.get("pdf_data", "")
        
        # Extract text
        text = extract_text_from_pdf_base64(base64_data)
        
        # Write output to file
        with open(output_file, 'w') as f:
            json.dump({"text": text}, f)
        
        sys.exit(0)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1) 