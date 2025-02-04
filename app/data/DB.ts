import mongoose, { Connection, Model } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB and return the database connection.
 */
export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_CONNECTION_STRING as string, {
        dbName: "Bonup",
      })
      .then((mongooseInstance) => {
        return mongooseInstance.connection;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/**
 * Dynamically retrieve a model for a specific collection.
 */
export function getCollectionModel<T>(
  dbName: string,
  collectionName: string,
  schema: mongoose.Schema<T>
): Model<T> {
  const connection = mongoose.connection.useDb(dbName, { useCache: true });
  return connection.model(collectionName, schema, collectionName) as Model<T>;
}
