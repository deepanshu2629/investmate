import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
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
    const options = {
      maxPoolSize: 5,                    // Keep pool small for free tier
      serverSelectionTimeoutMS: 5000,   // Timeout after 5s if can't connect
      socketTimeoutMS: 45000,           // Close sockets after 45s of inactivity
    };
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
