import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BookModel, {
    BookDocument,
    BookInput,
} from "../models/book.model";

export async function createBook(input: BookInput) {
    try {
        const result = await BookModel.create(input);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function findBook(
    query: FilterQuery<BookDocument>,
    options: QueryOptions = { lean: true }
) {
    try {
        const result = await BookModel.findOne(query, {}, options);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function findAllBook(
    query: FilterQuery<BookDocument>,
    options: QueryOptions = { lean: true }
) {
    try {
        const result = await BookModel.find({}, {}, options);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function findAndUpdateBook(
    query: FilterQuery<BookDocument>,
    update: UpdateQuery<BookDocument>,
    options: QueryOptions
) {
    return BookModel.findOneAndUpdate(query, update, options);
}

export async function deleteBook(query: FilterQuery<BookDocument>) {
    return BookModel.deleteOne(query);
}
