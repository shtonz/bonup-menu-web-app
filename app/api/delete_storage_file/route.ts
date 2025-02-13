import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(req: NextRequest) {
  try {
    const { fileKey } = await req.json(); // File key (path in S3)

    if (!fileKey) {
      return NextResponse.json(
        { message: "File key is required" },
        { status: 400 }
      );
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
    };

    await s3.send(new DeleteObjectCommand(params));

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { message: "Error deleting file" },
      { status: 500 }
    );
  }
}
