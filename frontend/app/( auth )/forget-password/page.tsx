"use client";

import { useForgetPasswordMutation } from "@/services/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      //  Loading
      Swal.fire({
        title: "Sending Reset Link...",
        text: "Please wait",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await forgetPassword(email).unwrap();

      console.log("FORGOT PASSWORD RESPONSE:", res);

      //  Success
      Swal.fire({
        icon: "success",
        title: "Check Your Email 📩",
        html: `
          <p style="margin-top:10px;">
            We’ve sent a password reset link to <b>${email}</b>.
          </p>
          <p style="font-size:13px; margin-top:8px;">
            Please check your inbox and follow the instructions.
          </p>
        `,
        confirmButtonColor: "#1b2a4a",
      });
    } catch (err: any) {
      //  Error
      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: err?.data?.message || "Something went wrong",
        confirmButtonColor: "#ef4444",
      });

      console.log("FORGOT PASSWORD ERROR:", err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-(--color-main-bg) p-8'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white shadow-lg rounded-2xl py-8 px-8 border border-(--color-card-border)'>
        <h1 className='heading text-(--color-primary)'>Forgot Password</h1>

        <p className='mb-6 text-(--color-text-primary)'>
          Enter your email to reset your password
        </p>

        {/* Email Input */}
        <input
          type='email'
          placeholder='Enter your email'
          className='border border-(--color-input-border) rounded-xl p-3 w-full mb-4'
          value={email}
          onChange={handleChange}
          required
        />

        {/* Submit */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-(--color-btn-primary-bg) text-white py-3 rounded-xl'>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Back to Login */}
        <div className='text-center mt-6'>
          <span
            onClick={() => (window.location.href = "/login")}
            className='text-sm text-(--color-primary) cursor-pointer hover:underline'>
            Back to Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Page;
