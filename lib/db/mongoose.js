import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb'; // Changed to import

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            },
            bufferCommands: false, // Disable mongoose buffering
        };

        try {
            console.log('Attempting MongoDB connection...');
            cached.promise = mongoose.connect(MONGODB_URI, opts)
                .then(mongoose => {
                    console.log('Successfully connected to MongoDB');
                    return mongoose;
                });
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.error('Error resolving connection:', error);
        throw error;
    }
}

export default dbConnect;