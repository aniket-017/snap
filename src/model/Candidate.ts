import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the Candidate model
export interface Candidate extends Document {
    internalHr: mongoose.Schema.Types.ObjectId;
    company: mongoose.Schema.Types.ObjectId;
    plan: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    ssnId: string;
    status: string; 
}

const CandidateSchema: Schema<Candidate> = new Schema({
    internalHr: { type: mongoose.Schema.Types.ObjectId, ref: 'Hr' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    plan: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] 
    },
    contactNumber: { type: String, required: true },
    ssnId: { type: String, required: true },
    status: { type: String, default: "created" } 
},
{
    timestamps:true
});

// Create and export the Candidate model
const CandidateModel =(mongoose.models.Candidate as mongoose.Model<Candidate>)|| mongoose.model<Candidate>("Candidate", CandidateSchema);
export default CandidateModel;
