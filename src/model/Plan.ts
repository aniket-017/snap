import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the Plan model
export interface Plan extends Document {
    planName: string;
    planPrice: number;
    products: mongoose.Schema.Types.ObjectId[];
}

const PlanSchema: Schema<Plan> = new Schema(
    {
        planName: { type: String, required: true },
        planPrice: { type: Number, required: true },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product_template', required: true }]
    },
    {
        timestamps: true
    }
);

// Create and export the Plan model
const PlanModel = (mongoose.models.Plan as mongoose.Model<Plan>) || mongoose.model<Plan>("Plan", PlanSchema);
export default PlanModel;
