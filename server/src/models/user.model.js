import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, default: 'USER' },
    googleId: { type: String, required: false },
    facebookId: { type: String, required: false },
    tokenSecretVersion: { type: String, default: uuidv4() },
    lastLogin: { type: Date, default: Date.now() },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationExpires: Date
}, { minimize: false, timestamps: true });

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
userSchema.methods.updateTokenSecretVersion = function () {
    this.tokenSecretVersion = uuidv4();
}

const User = mongoose.model.user || mongoose.model("User", userSchema);

export default User;