import Product from "../models/product.model.js";
import { uploadImage } from "../lib/localStorage.js";

export const productList = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const showAll = req.query.showAll ?? false;
        const skip = (page - 1) * limit;
        if (showAll) {
            const products = await Product.find({ inStock: true });
            return res.status(200).json({
                succes: true,
                data: { products }
            })
        }
        const [products, total] = await Promise.all([
            Product
                .find({})
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Product.countDocuments({ inStock: true })
        ])
        res.status(200).json({
            succes: true,
            data: {
                products,
                page,
                total
            },
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;
        let imageUrl = images.map(item => uploadImage(item));

        await Product.create({ ...productData, rating: Math.floor(Math.random() * 5) + 1, reviewCount: Math.floor(Math.random() * 1000) + 1, image: imageUrl });

        res.status(200).json({
            success: true,
            message: "Thêm sản phẩm thành công!"
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let productData = JSON.parse(req.body.productData);
        const images = req.files;
        let imageUrl = images.map(item => uploadImage(item));

        await Product.findByIdAndUpdate({ _id: id }, { ...productData, image: imageUrl });

        res.status(200).json({
            success: true,
            message: "Cập nhật sản phẩm thành công!"
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndDelete({ _id: id });

        res.status(200).json({
            success: true,
            message: "Xóa sản phẩm thành công!"
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const productById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json({
            succes: true,
            data: product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;

        await Product.findByIdAndUpdate({ _id: id }, { inStock });
        res.status(200).json({
            succes: true,
            message: "Stock updated successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}