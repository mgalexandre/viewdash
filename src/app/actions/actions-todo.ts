"use server"

import { auth } from "@/lib/auth"; // Import the server-side auth
import prisma from "@/db/index";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"; // Importar headers

export async function adicionarTodoAction(title: string) {
    if (!title)
        throw new Error("Title is required");

    const requestHeaders = new Headers(await headers());
    const session = await auth.api.getSession({
        headers: requestHeaders
    });
   
    if (!session?.session.userId)
        throw new Error("User ID is required");
    const userId = session.session.userId;

    await prisma.todos.create({
        data: {
            title,
            userId,
        },
    });

    revalidatePath("/naosei", "page");
    revalidatePath('/naosei/page', 'page');
}