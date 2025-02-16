// app/api/s3-delete/route.ts
import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { connectToDatabase } from "@/app/data/DB";
import Dish from "@/app/data/models/DishModel";
import { extractS3KeyFromUrl } from "@/app/Utils/Utils";

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * DELETE /api/s3-delete
 * Expects JSON body: { key: string }
 *    where `key` is the path/filename of the file in S3
 */
export async function DELETE(request: Request) {
  try {
    // 1) Parse JSON body
    const body = await request.json();
    const { key, dbItemId } = body as { key?: string; dbItemId: string };

    if (!key) {
      return NextResponse.json(
        { error: "Missing 'key' in request body." },
        { status: 400 }
      );
    }

    const s3Key = extractS3KeyFromUrl(key);
    console.log(s3Key);
    // 2) Create the DeleteObjectCommand
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: s3Key,
    });

    console.log(command);
    // 3) Send the command to S3
    const s3Response = await s3Client.send(command);
    console.log(s3Response);

    await connectToDatabase();
    console.log("dbItemId: " + dbItemId);
    const deletedDish = await Dish.findByIdAndDelete(dbItemId);

    if (!deletedDish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    // 4) Return success
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting file from S3:", error);
    return NextResponse.json(
      { error: "Failed to delete file from S3." },
      { status: 500 }
    );
  }
}
