import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the AddressVerification model
export interface Address_item extends Document {
    candidate: mongoose.Schema.Types.ObjectId;
    street: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
    apiResponse: any;
}

const AddressVerificationSchema: Schema<Address_item> = new Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    stateOrProvince: { type: String },
    postalCode: { type: String },
    country: { type: String, required: true },
    apiResponse: { type: Schema.Types.Mixed, default: "not available" }
},
{
    timestamps:true
});

// Create and export the AddressVerification model
const AddressVerificationModel = (mongoose.models.Address_item as mongoose.Model<Address_item>) || mongoose.model<Address_item>("Address_item", AddressVerificationSchema);
export default AddressVerificationModel;
