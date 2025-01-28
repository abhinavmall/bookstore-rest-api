import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';
import { UserDocument } from "./user.model";

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

export interface BookInput {
    title: string;
    description: string;
    author: UserDocument["_id"];
    coverImage: string;
    price: number;
}


export interface BookDocument extends BookInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const bookSchema = new mongoose.Schema(
    {
        bookId: { type: String, required: true, unique: true, default: () => `product_${nanoid()}`},
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
        description: { type: String, required: true },
        coverImage: { type: String, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const BookModel = mongoose.model<BookDocument>("Book", bookSchema);

export default BookModel;
