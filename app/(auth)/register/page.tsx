"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormValues,
} from "@/lib/validations/auth.schema";
import { useRegister } from "@/lib/hooks/auth/register.hook";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url(/images/login-page-image.jpg)" }}
    >
      {/* Overlay Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create your ShopNest account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="Enter your full name"
              disabled={isSubmitting}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Create a password"
              disabled={isSubmitting}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            className="w-full h-10 mt-5 text-base font-semibold bg-[#4700A7] text-white rounded-lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>

          {/* Login Navigation */}
          <div className="text-center text-sm mt-3">
            <span className="text-gray-600">
              Already have an account?
            </span>{" "}
            <Link
              href="/login"
              className="font-medium text-[#4700A7] hover:underline"
            >
              Sign in
            </Link>
          </div>

          {/* Error */}
          {registerMutation.isError && (
            <p className="text-sm text-red-600 text-center mt-2">
              {(registerMutation.error.message)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
