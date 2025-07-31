import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        })
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;