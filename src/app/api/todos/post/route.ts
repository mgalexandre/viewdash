"use server";

import { auth } from "@/lib/auth"; // Import the server-side auth
import prisma from "@/db/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    
    try {
      // Get the session using the auth handler
      const session = await auth.api.getSession({
        headers: request.headers
      });
      const userId = session?.session.userId;
      if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }


      let title;
      try {
        const body = await request.json();
        title = body.title;
      } catch (parseError) {
        console.error("Error parsing request body:", parseError);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
      }

      if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }

      // Create todo with explicit error handling
      const todo = await prisma.todos.create({
        data: {
          title,
          userId,
        },
      });

      return NextResponse.json(todo, { status: 201 });
    } catch (sessionError) {
      return NextResponse.json({ error: "Session error" }, { status: 401 });
    }
}
