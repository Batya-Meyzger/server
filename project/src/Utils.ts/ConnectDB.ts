import mongoose from 'mongoose';
import { logger } from '../Utils.ts/Logger.ts';

export class myDB{
    static DB: myDB = new myDB();
    DB_NAME = 'Submissions_Table';    
    URI = `mongodb://localhost:27017/${this.DB_NAME}`;

    async connectToDb(): Promise<void> {
        try {
            await mongoose.connect(this.URI);
            logger.info('Connected to MongoDB (Mongoose)');
        } catch (err) {
            logger.error('MongoDB connection error:', err);
        process.exit(1);
        }
    }

    static getDB(): myDB
    {
        if( mongoose.connection.readyState === 0)
            this.DB.connectToDb();
        return this.DB;
    }
}
