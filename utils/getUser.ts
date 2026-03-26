"use client"
import { env } from "@/Config/env"
import { IUser } from "@/Interfaces/interfaces";
import { useEffect, useState } from "react"


export const useUser = () => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setPending(true);
                const res = await fetch(`${env.BACKEND_URL}/users/me`, {
                    credentials: "include"
                });
                const data = await res.json();
                console.log(data)
                setUserData(data);
            } catch (error) {
                setUserData(null);
            } finally {
                setPending(false);
            }
        };

        fetchUser();
    }, []);

    return {
        user: userData,
        isPending: pending
    };
};