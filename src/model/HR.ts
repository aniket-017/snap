import mongoose, { Schema, Document } from "mongoose";

// Create and export the InternalHr model
export interface Hr extends Document {
    name: string;
    email: string;
    role:string;
    company:string;
    password: string;
    plan: mongoose.Schema.Types.ObjectId[]; // Foreign key to Plan
    report_access: boolean;
}

const HrSchema: Schema<Hr> = new Schema({
    name: { type: String, required: [true,"Name is required"] },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] 
    },
    role: { type: String, required: [true,"role is required"] },
    company: { type: String, required: [true,"Company name is required"] },
    password: { type: String, required: [true,"Password is required"] },
    plan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true }], // Foreign key to Plan
    report_access: { type: Boolean, required: true, default: false }
},
{
    timestamps:true
});






 
const HrModel= (mongoose.models.Hr as mongoose.Model<Hr>)|| mongoose.model<Hr>("Hr", HrSchema);
export default HrModel;