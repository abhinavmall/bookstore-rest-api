import mongoose from 'mongoose'
import config from 'config'
import log from "./logger";

async function connectToDb() {
    const mongoDbUri = config.get<string>('mongoDbUri')
    try {
        await mongoose.connect(mongoDbUri);
        log.info("Connected to mongo")
    } catch (e) {
        log.error("Could not connect to mongo")
        process.exit(1);
    }
}

export default connectToDb;
