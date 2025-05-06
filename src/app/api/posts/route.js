import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Post from "@/models/Post";
import { uploadMiddleware, runMulter } from "@/lib/middleware/multer";

export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "nodejs", 
};

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find();
    return new Response(JSON.stringify(posts));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const res = new Response();
    await runMulter(req, res, uploadMiddleware);

    const { title, description } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    await connectToDatabase();
    const post = await Post.create({ title, description, image });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Upload error:", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
