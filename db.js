import mongoose from "mongoose"

const connectDB = async () => {
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected to successfully")
    }
    catch (err) {
        console.error("Failed to connect", err)
    }
}

export { connectDB }