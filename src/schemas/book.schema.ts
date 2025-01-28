import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "Title is required",
        }),
        description: string({
            required_error: "Description is required",
        }).min(50, "Description should be at least 50 characters long"),
        price: number({
            required_error: "Price is required",
        }),
        coverImage: string({
            required_error: "Image is required",
        }),
    }),
};

const params = {
    params: object({
        bookId: string({
            required_error: "bookId is required",
        }),
    }),
};

export const createBookSchema = object({
    ...payload,
});

export const updateBookSchema = object({
    ...payload,
    ...params,
});

export const deleteBookSchema = object({
    ...params,
});

export const getBookSchema = object({
    ...params,
});

export const getAllBookSchema = object({
});

export type CreateBookInput = TypeOf<typeof createBookSchema>;
export type UpdateBookInput = TypeOf<typeof updateBookSchema>;
export type ReadBookInput = TypeOf<typeof getBookSchema>;
export type ReadAllBookInput = TypeOf<typeof getAllBookSchema>;
export type DeleteBookInput = TypeOf<typeof deleteBookSchema>;
