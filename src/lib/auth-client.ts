// src/lib/auth-client.ts
import {
    createAuthClient
} from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
    advanced: {
        cookiePrefix: "xano-app",
    },
    fetchOptions: {
        credentials: "include", // 🔥 Garante que os cookies são enviados
    },
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;