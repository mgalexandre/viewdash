"use server";

import { auth } from "@/lib/auth";
import prisma from "@/db/index";
import { headers } from "next/headers";

export async function getTodos() {

  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  });

  if (!session?.session?.userId) {
    return [];
  }

  return await prisma.todos.findMany({
    where: { userId: session.session.userId },
    select: { id: true, title: true },
  });
}
