import * as mongoose from 'mongoose';

export class MongoConfig {
    public mongoconfig():void {
        var mongodb = 'mongodb://localhost:27017/Kishan';
        mongoose.connect(mongodb);
    }
}