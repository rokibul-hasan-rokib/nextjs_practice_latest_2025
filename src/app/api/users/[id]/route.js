import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(request, { params }) {
    try {
        await connectToDatabase();
        const user = await User.findById(params.id);
        if(!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        return new Response(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { name, email } = await request.json();
        await connectToDatabase();
        const user = await User.findByIdAndUpdate(params.id, { name, email });
        if(!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        return new Response(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const user = await User.findByIdAndDelete(params.id);
        if(!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        return new Response(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}