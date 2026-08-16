import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not set in environment");
}

/**
 * Global cache to prevent multiple connections in dev (Next.js hot reload)
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  // Reuse existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // Create connection promise if it doesn't exist
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      writeConcern: {
        w: "majority",
      },
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
