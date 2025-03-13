import { authClient } from "@/lib/auth-client"; // path to your auth file
import {auth} from "@/lib/auth";
import { getSessionCookie } from "better-auth";
import prisma from "@/db/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  const userId = session?.session.userId;
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const todos = await prisma.todos.findMany({
      where: { userId: userId },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}