import { env } from "@/Config/env"

export const handleUserLogout = async():Promise<any> =>{
    const logoutRes = await fetch(`${env.BACKEND_URL}/users/sign-out`, {
        method: "POST",
        credentials: "include"
    })
    const data:any = await logoutRes.json()
    return data
}


export const handleChangePassword =async(oldPass:string, newPass:string)=>{
    const data= {
        oldPassword: oldPass,
        newPassword: newPass
    }
    const res = await fetch(`${env.BACKEND_URL}/users/change-password`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result:any = await res.json()
    return result
}