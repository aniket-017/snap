import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the LicenseVerification model
export interface License_item extends Document {
    candidate: mongoose.Schema.Types.ObjectId;
    licenseType: string;
    stateOfIssue: string;
    licenseNumber: string;
    certificationType?: string;
    status: string;
    motorVehicleHistory: string;
    apiResponse: any;
}

const LicenseVerificationSchema: Schema<License_item> = new Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    licenseType: { type: String, enum: ['INSTANT_DRIVER', 'PROFESSIONAL', 'HEALTHCARE_COMPLIANCE'], required: true },
    stateOfIssue: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    certificationType: { type: String }, 
    status: { type: String, required: true },
    motorVehicleHistory: { type: String, required: true },
    apiResponse: { type: Schema.Types.Mixed, default: "not available" }
},
{
    timestamps:true
});

// Create and export the LicenseVerification model
const LicenseVerificationModel = (mongoose.models.License_item as mongoose.Model<License_item>) || mongoose.model<License_item>("License_item", LicenseVerificationSchema);
export default LicenseVerificationModel;
