import { auth } from '@/lib/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/auth/$')({
    server: {
        handlers: {
            GET: async ({ request }:{ request: Request }) => {
                return await auth.handler(request)
            },
            POST: async ({ request }:{ request: Request }) => {
                 console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);   
                return await auth.handler(request)
            },
        },
    },
})