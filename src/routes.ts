import {Express, Request, Response} from "express"
import {createUserHandler} from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import {createUserSchema} from "./schemas/user.schema";
import {createUserSessionHandler, getUserSessionsHandler} from "./controllers/session.controller";
import {createSessionSchema} from "./schemas/session.schema";
import requireUser from "./middleware/requireUser";
import {
    createBookSchema,
    deleteBookSchema,
    getAllBookSchema,
    getBookSchema,
    updateBookSchema
} from "./schemas/book.schema";
import {
    createBookHandler,
    deleteBookHandler, getAllBookHandler,
    getBookHandler,
    updateBookHandler
} from "./controllers/book.controller";

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post(
        '/api/users',
        validateResource(createUserSchema),
        createUserHandler);

    app.post(
        '/api/sessions',
        validateResource(createSessionSchema),
        createUserSessionHandler);

    app.get(
        '/api/sessions',
        requireUser,
        getUserSessionsHandler);

    app.post(
        '/api/books',
        [requireUser, validateResource(createBookSchema)],
        createBookHandler)

    app.put(
        '/api/books/:bookId',
        [requireUser, validateResource(updateBookSchema)],
        updateBookHandler)

    app.get(
        '/api/books/:bookId',
        validateResource(getBookSchema),
        getBookHandler)

    app.get(
        '/api/books',
        validateResource(getAllBookSchema),
        getAllBookHandler)

    app.delete(
        '/api/books/:bookId',
        [requireUser, validateResource(deleteBookSchema)],
        deleteBookHandler)
}

export default routes;
