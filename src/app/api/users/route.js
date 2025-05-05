import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find();
        return new Response(JSON.stringify(users));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, email } = await request.json();
        await connectToDatabase();
        const user = await User.create({ name, email });
        return new NextResponse(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
