// src/app/api/create-model/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose, { Schema } from 'mongoose';
import dbConnect from '@/lib/dbConnect';

type SchemaDefinition = {
  [path: string]: any;
};

interface RequestBody {
  modelName: string;
  schemaDefinition: SchemaDefinition;
}

export async function POST(req: NextRequest) {
    try {
      await dbConnect();
      console.log('Database connected successfully');
  
      const body: RequestBody = await req.json();
      console.log('Request body:', body);
  
      const { modelName, schemaDefinition } = body;
  
      // Corrected schema definition
      const correctedSchemaDefinition = {
        candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
        employerName: { type: String, required: true },
        employmentPlaceContact: {
          number: { type: String, required: true },
          email: {
            type: String,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
          },
          fax: { type: String },
        },
        address: {
          type: { type: String, enum: ['Domestic', 'International'], required: true },
          street: { type: String, required: true },
          city: { type: String, required: true },
          stateOrProvince: { type: String },
          postalCode: { type: String },
          country: { type: String, required: true },
        },
        applicantName: {
          firstName: { type: String, required: true },
          middleName: { type: String },
          lastName: { type: String, required: true },
        },
        employmentDates: {
          startDate: { type: Date, required: true },
          endDate: { type: Date },
        },
        jobDetails: {
          title: { type: String, required: true },
          supervisorName: { type: String, required: true },
          salary: { type: Number, required: true },
        },
        reasonForLeaving: { type: String, required: true },
        apiResponse: { type: String, default: 'not available' },
      };
  
      // Create a new schema dynamically
      const dynamicSchema = new Schema(correctedSchemaDefinition, {
        timestamps: true,
      });
  
      // Check if the model already exists, if not create a new one
      const DynamicModel = mongoose.models[modelName] || mongoose.model(modelName, dynamicSchema);
  
      console.log('Model created/exists:', modelName);
      
      return NextResponse.json({ success: true, model: modelName }, { status: 200 });
    } catch (error) {
      console.error('Error in POST handler:', error);
      return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
  }