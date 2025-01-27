import express from 'express'
import config from 'config'
import log from "./utils/logger";
import connectToDb from "./utils/connectToDb";
import routes from './routes'


const port = config.get<number>('port')

const app = express()

app.listen(port, () => {
    connectToDb();

    routes(app);

    log.info(`Bookstore api started at http://localhost:${port}`);
})
