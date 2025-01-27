import express from 'express'
import config from 'config'
import log from "./utils/logger";
import connectToDb from "./utils/connectToDb";

const port = config.get<number>('port')

const app = express()

app.listen(port, () => {
    connectToDb();
    log.info(`Bookstore api started at http://localhost:${port}`);
})
