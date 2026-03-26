"use client";
import { Spinner } from "@/components/ui/spinner";
import { env } from "@/Config/env";
import { ILoginUser } from "@/Interfaces/auth.interface";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const LoginUserType: ILoginUser = {
    email: "",
    password: "",
  }
  const form = useForm({
    defaultValues: LoginUserType,
    onSubmit: async ({ value }) => {
        try {
          const loginData = {
            email: value.email,
            password: value.password
          }
          const loginResponse = await fetch(`${env.BACKEND_URL}/users/sign-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(loginData),
          })
          const result = await loginResponse.json();
          console.log(result.cookie)
          if(result.success){
            toast.success(result.message || "Login successfully.");
            form.reset();
            form.resetFieldMeta;
            router.push("/")
          }else{
            toast.error(result.message || "Failed to login! Please try again")
          }
        } catch (error: any) {
          if(error.message){
            toast.error(error.message)
          }else{
            toast.error("Something went wrong! Please try again.");
          }
          if(env.NODE_ENV === "development"){
            console.log(error)
          }
        }
    },

  })

  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      form.handleSubmit()
    }} className="mt-6 space-y-5 font-normal">

      {/* Email */}
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            if (!value) return "Email is required";
            if (!value.includes("@")) return "Invalid email";
          },
        }}
      >
        {(field) => (
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 pl-10 pr-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 outline-none transition"
              />
            </div>

            {field.state.meta.errors?.[0] && (
              <p className="text-red-500 text-xs mt-1">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Password */}

      <form.Field name="password"
        validators={{
          onChange: ({ value }) => {
            if (!value) return "Password required";
            if (value.length < 6) return "Min 6 characters";
            if(value.length > 8) return "Max 8 charaters";
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col relative">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-gray-600">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="••••••••"
              className="input w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-10 focus:border-orange-500 focus:bg-white focus:outline-none transition"
              required
            />
            {/* Eye Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2/3 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
            {field.state.meta.errors?.[0] && (
              <p className="text-red-500 text-xs mt-1">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Login Button */}
        <form.Subscribe 
        selector={(state)=>[state.canSubmit , state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
            >
              {
              isSubmitting ? <Spinner className="size-4"/> : "Login to Account"
              }
            </button>
          )}
        </form.Subscribe>

      {/* Google Login */}
      <button
        type="button"
        className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M0 0H512V512H0" fill="#fff"></path>
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
          </g>
        </svg>
        Login with Google
      </button>
    </form>
  );
};

export default LoginForm;