"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth.schema";
import { useLogin } from "@/lib/hooks/auth/useLoginQueries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url(/images/login-page-image.jpg)" }}
    >
      {/* Overlay Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your Email"
              disabled={isSubmitting}
              {...register("email")}
               className="h-10 px-4 bg-white border-gray-300 text-gray-900 placeholder:text-[#000000] placeholder:text-sm focus:border-[#6D00FF] focus:ring-[#6D00FF] rounded-lg"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your Password"
              disabled={isSubmitting}
              {...register("password")}
               className="h-10 px-4 bg-white border-gray-300 text-gray-900 placeholder:text-[#000000] placeholder:text-sm focus:border-[#6D00FF] focus:ring-[#6D00FF] rounded-lg"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button
            className={`w-full h-10 mt-5 text-base font-semibold bg-[#4700A7] text-white rounded-lg  transition-all duration-200`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          {loginMutation.isError && (
            <p className="text-sm text-red-600 text-center">
              {(loginMutation.isError as any)?.response?.data?.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
