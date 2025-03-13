// auth.ts
import prisma from '@/db';
import {
    betterAuth
} from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
    appName: "xnauth",
    database: prismaAdapter(prisma, {
        provider: "sqlite"
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: process.env.BETTER_AUTH_URL + "/api/auth/callback/google",
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            redirectURI: process.env.BETTER_AUTH_URL + "/api/auth/callback/github",
        }
    },
    advanced: {
         cookiePrefix: "xano-app"
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    }
});