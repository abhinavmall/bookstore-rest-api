import {Express, Request, Response} from "express"
import {createUserHandler} from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import {createUserSchema} from "./schemas/user.schema";
import {createUserSessionHandler, getUserSessionsHandler} from "./controllers/session.controller";
import {createSessionSchema} from "./schemas/session.schema";
import requireUser from "./middleware/requireUser";

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
}

export default routes;
