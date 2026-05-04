"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 🔵 Loading UI
    Swal.fire({
      title: "Processing...",
      text: "Please wait",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      console.log("FORGOT PASSWORD EMAIL:", email);

      // 🟢 Success UI
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Password reset link sent (mock)",
        timer: 2000,
        showConfirmButton: false,
      });
    }, 1000);
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

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-(--color-btn-primary-bg) text-white py-3 rounded-xl'>
          Send Reset Link
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
