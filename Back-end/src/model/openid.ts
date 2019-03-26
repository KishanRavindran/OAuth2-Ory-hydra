import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const Openidschema = new Schema ({

    _id: {
        type: String,
        default:uuid.v1
    },
    email: String,
    password: String,
    role: String,
    Idtoken: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
})