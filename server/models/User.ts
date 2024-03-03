// models/User.ts
import mongoose, {model} from 'mongoose';

export interface IUser extends mongoose.Document {
    email: string;
    username: string;
    password: string;

}

const UserSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true, trim:true, lowerCase:true },
    username: { type: String, required: true, unique: true, trim:true, lowerCase:true },
    password: { type: String, required: true, length: [8, "Password should be at least 8 characters long"] },
},{ timestamps: true });

export const User = model<IUser>('User', UserSchema);