import { env } from "@/Config/env";

const sendImageToServer = async(formdData:FormData)=>{
     const response = await fetch(`${env.BACKEND_URL}/users/upload-image`, {
                method: "POST",
                body: formdData
              })
    const data = await response.json();
    return data.data.secure_url;
}

export default sendImageToServer