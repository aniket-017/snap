import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the Customer model
export interface Customer extends Document {
    name: string;
    email: string;
    contract_id: string;
    cost_rate: number;
}

const CustomerSchema: Schema<Customer> = new Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] 
    },
    contract_id: { type: String, required: true, unique: true },
    cost_rate: { type: Number, required: true }
},
{
    timestamps: true
});

// Create and export the Customer model
const CustomerModel = (mongoose.models.Customer as mongoose.Model<Customer>) || mongoose.model<Customer>("Customer", CustomerSchema);
export default CustomerModel;
