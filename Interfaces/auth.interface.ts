export interface ISignupUser {
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    image?:string
}


export interface ILoginUser {
    email:string,
    password:string
}


