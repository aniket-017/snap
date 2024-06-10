import mongoose, { Schema, Document } from "mongoose";

// Create and export the Admin model
export interface Admin extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

const AdminSchema: Schema<Admin> = new Schema({
    first_name: { type: String, required: [true, "First name is required"] },
    last_name: { type: String, required: [true, "Last name is required"] },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] 
    },
    password: { type: String, required: [true, "Password is required"] }
},
{
    timestamps: true
});

const AdminModel = (mongoose.models.Admin as mongoose.Model<Admin>) || mongoose.model<Admin>("Admin", AdminSchema);
export default AdminModel;
