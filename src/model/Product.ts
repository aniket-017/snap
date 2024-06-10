import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the Product_Template model
export interface Product_template extends Document {
    productName: string;
    productPrice: number;
}

const ProductTemplateSchema: Schema<Product_template> = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true }
},
{
    timestamps:true
});

// Create and export the Product_Template model
const ProductTemplateModel = (mongoose.models.Product_template as mongoose.Model<Product_template>) || mongoose.model<Product_template>("Product_template", ProductTemplateSchema);
export default ProductTemplateModel;
