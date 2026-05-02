"use client";

import { useUserLoginMutation } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

type LoginType = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const [loginUser, { isLoading }] = useUserLoginMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 🔵 Loading
      Swal.fire({
        title: "Logging in...",
        text: "Please wait",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
        },
      });

      const res = await loginUser(formData).unwrap();

      // 🟢 Success
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Login successful",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
        },
      });

      console.log("LOGIN SUCCESS:", res);
      router.push("/dashboard");

      // 👉 Optional redirect
      // router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // ❌ Error handling
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err?.data?.message || "Invalid email or password",
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
        },
      });

      console.log("LOGIN ERROR:", err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-(--color-main-bg) p-8'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white shadow-lg rounded-2xl py-8 px-8 border border-[var(--color-card-border)]'>
        <h1 className='heading text-[var(--color-primary)]'>Welcome Back</h1>

        <p className='mb-6 text-[var(--color-text-primary)]'>
          Login to continue your journey
        </p>

        {/* Email */}
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4'
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4'
          onChange={handleChange}
          required
        />

        {/* Submit */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-[var(--color-btn-primary-bg)] text-white py-3 rounded-xl'>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className='text-center mt-6'>
          <p className='text-[var(--color-text-primary)] text-sm'>
            Don’t have an account?
          </p>

          <div
            onClick={() => (window.location.href = "/register")}
            className='mt-2 text-[var(--color-primary)] font-medium cursor-pointer hover:underline'>
            Create an account
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
