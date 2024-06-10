import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the EducationVerification model
export interface Education_item extends Document {
    candidate: mongoose.Schema.Types.ObjectId;
    institutionName: string;
    registrarContact: {
        number: string;
        fax: string;
        email: string;
    };
    address: {
        type: string; 
        street: string;
        city: string;
        stateOrProvince: string;
        postalCode: string;
        country: string;
    };
    startDate: Date;
    endDate: Date;
    firstName: string;
    lastName: string;
    middleName?: string;
    degree: string;
    degreeDate: Date;
    gpa: number;
    apiResponse: any;
}

const EducationVerificationSchema: Schema<Education_item> = new Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    institutionName: { type: String, required: true },
    registrarContact: {
        number: { type: String, required: true, match: [/\(\d{3}\)\s\d{3}-\d{4}/, 'Phone number must be in the format (###) ###-####'] },
        fax: { type: String },
        email: { type: String }
    },
    address: {
        type: { type: String, enum: ['Domestic', 'International'], required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        stateOrProvince: { type: String },
        postalCode: { type: String },
        country: { type: String, required: true }
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    degree: { type: String, required: true },
    degreeDate: { type: Date, required: true },
    gpa: { type: Number, required: true },
    apiResponse: { type: Schema.Types.Mixed, default: "not available" }
},
{
    timestamps:true
});

// Create and export the EducationVerification model
const EducationVerificationModel = (mongoose.models.Education_item as mongoose.Model<Education_item>) || mongoose.model<Education_item>("Education_item", EducationVerificationSchema);
export default EducationVerificationModel;
