"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class myDB {
    constructor() {
        this.DB_NAME = 'Shop_DB'; // 
        this.URI = `mongodb://localhost:27017/${this.DB_NAME}`;
    }
    async connectToDb() {
        try {
            await mongoose_1.default.connect(this.URI);
            console.log('Connected to MongoDB (Mongoose)');
        }
        catch (err) {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        }
    }
    static getDB() {
        if (mongoose_1.default.connection.readyState === 0)
            this.DB.connectToDb();
        return this.DB;
    }
}
exports.myDB = myDB;
myDB.DB = new myDB();
