import { Document } from "mongoose";

/**
 * A utility function to convert a Mongoose document to a TypeScript object.
 * @param document - A Mongoose document.
 * @returns A plain JavaScript object typed according to the expected TypeScript interface.
 */
export function transformToType<T extends Document>(document: T): T {
  return document.toObject() as T; // Convert and cast to the expected type
}
