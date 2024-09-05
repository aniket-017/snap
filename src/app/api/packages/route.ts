// src/app/api/packages/route.ts

import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';

// Define the type for the parsed packages data
interface Package {
  // Define the properties based on the expected XML structure
  // Example: name: string;
  // Add more fields here based on the XML response structure
}

// Function to parse XML to JSON
async function parseXML(xml: string): Promise<Package[]> {
  try {
    const result = await parseStringPromise(xml, { explicitArray: false });
    return result; // Replace with the actual parsing logic based on your XML structure
  } catch (error) {
    throw new Error('Failed to parse XML');
  }
}

// Named export for the GET method
export async function GET(req: NextRequest) {
  try {

    
    const xmlRequestBody = `<Accio_Order>
      <mode>DRAFT</mode>
      <login>
        <account>AG0000</account>
        <username>PrashantP</username>
        <password>Snapcheck@2024</password>
      </login>
      <getPackages/>
    </Accio_Order>`;

    // Make the API call with axios
    const response: AxiosResponse<string> = await axios.post(
      'https://orders.snapcheck.ai/c/p/researcherxml',
      xmlRequestBody,
      {
        headers: { 'Content-Type': 'text/xml' },
      }
    );

    console.log(response.data);
    // Parse the XML response to JSON
    const packages: Package[] = await parseXML(response.data);
    console.log("below");
    console.log(packages);
    
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ message: 'Failed to fetch packages' }, { status: 500 });
  }
}
