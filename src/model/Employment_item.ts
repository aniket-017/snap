import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the EmploymentVerification model
export interface Employment_item extends Document {
    candidate: mongoose.Schema.Types.ObjectId;
    employerName: string;
    employmentPlaceContact: {
        number: string;
        email: string;
        fax: string;
    };
    address: {
        type: string; // Domestic or International
        street: string;
        city: string;
        stateOrProvince: string;
        postalCode: string;
        country: string;
    };
    applicantName: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    employmentDates: {
        startDate: Date;
        endDate?: Date;
    };
    jobDetails: {
        title: string;
        supervisorName: string;
        salary: number;
    };
    reasonForLeaving: string;
    apiResponse: any;
}

const EmploymentVerificationSchema: Schema<Employment_item> = new Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true }, 
    employerName: { type: String, required: true },
    employmentPlaceContact: {
        number: { type: String, required: true },
        email: { 
            type: String, 
            required: true, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] 
        },
        fax: { type: String }
    },
    address: {
        type: { type: String, enum: ['Domestic', 'International'], required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        stateOrProvince: { type: String },
        postalCode: { type: String },
        country: { type: String, required: true }
    },
    applicantName: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true }
    },
    employmentDates: {
        startDate: { type: Date, required: true },
        endDate: { type: Date }
    },
    jobDetails: {
        title: { type: String, required: true },
        supervisorName: { type: String, required: true },
        salary: { type: Number, required: true }
    },
    reasonForLeaving: { type: String, required: true },
    apiResponse: { type: Schema.Types.Mixed, default: "not available" }
},
{
    timestamps:true
});

// Create and export the EmploymentVerification model
const EmploymentVerificationModel = (mongoose.models.Employment_item as mongoose.Model<Employment_item>) || mongoose.model<Employment_item>("Employment_item", EmploymentVerificationSchema);
export default EmploymentVerificationModel;
