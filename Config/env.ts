
export const env = {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string || "http://localhost:8000/api/v1",
    FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL as string,
}