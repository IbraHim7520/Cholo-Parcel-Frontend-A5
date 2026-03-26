import { env } from "@/Config/env"
import {createAuthClient} from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: env.BASE_URL || "http://localhost:8000",
    fetchOptions:{
        credentials: "include"
    } 
})