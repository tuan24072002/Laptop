import mongoose from "mongoose";
const specsSchema = new mongoose.Schema({
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    graphics: { type: String, required: true },
    display: { type: String, required: true },
    battery: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: false },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    specs: { type: specsSchema, required: true },
    description: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    featured: { type: Boolean, required: true },
}, { timestamps: true });

const Product = mongoose.model.product || mongoose.model("Product", productSchema);

export default Product;