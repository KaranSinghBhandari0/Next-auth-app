import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    imageUrl: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        trim: true,
    },
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
