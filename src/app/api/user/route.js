import { NextResponse } from "next/server"

export function GET(request)
{
    const users = [
        {
            name: "Rokib",
            age: 30,
        },
        {
            name: "saikot",
            age: 20
        }
    ]

    return NextResponse.json(users);
}