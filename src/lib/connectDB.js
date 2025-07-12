import mongoose from "mongoose";

export async function connectDB() {
    try {
        if (mongoose.connection.readyState === 1) { 
            return;
        }

        await mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("✅ MongoDB connected successfully");
        });

        connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err);
            process.exit(1);
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB");
        console.error(error);
    }
}