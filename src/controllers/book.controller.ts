import { Request, Response } from "express";
import {
    CreateBookInput,
    UpdateBookInput,
} from "../schemas/book.schema";
import {
    createBook,
    deleteBook,
    findAllBook,
    findAndUpdateBook,
    findBook,
} from "../services/book.service";

export async function createBookHandler(
    req: Request<{}, {}, CreateBookInput["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    const book = await createBook({ ...body, author: userId });

    return res.send(book);
}

export async function updateBookHandler(
    req: Request<UpdateBookInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const bookId = req.params.bookId;
    const update = req.body;

    const book = await findBook({ bookId });

    if (!book) {
        return res.sendStatus(404);
    }

    if (String(book.author) !== userId) {
        return res.sendStatus(403);
    }

    const updatedBook = await findAndUpdateBook({ bookId }, update, {
        new: true,
    });

    return res.send(updatedBook);
}

export async function getAllBookHandler(
    req: Request<UpdateBookInput["params"]>,
    res: Response
) {
    const books = await findAllBook({});

    if (!books) {
        return res.sendStatus(404);
    }

    return res.send(books);
}

export async function getBookHandler(
    req: Request<UpdateBookInput["params"]>,
    res: Response
) {
    const bookId = req.params.bookId;
    const book = await findBook({ bookId });

    if (!book) {
        return res.sendStatus(404);
    }

    return res.send(book);
}

export async function deleteBookHandler(
    req: Request<UpdateBookInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const bookId = req.params.bookId;
    const name = res.locals.user.name;

    if (name === 'Darth Vader') {
        return res.sendStatus(403);
    }
    
    const book = await findBook({ bookId });

    if (!book) {
        return res.sendStatus(404);
    }

    if (String(book.author) !== userId) {
        return res.sendStatus(403);
    }

    await deleteBook({ bookId });

    return res.sendStatus(200);
}
