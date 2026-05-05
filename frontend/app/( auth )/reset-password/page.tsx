"use client";

import {
  useOtpVerifyMutation,
  usePasswordResetMutation,
} from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
  return (
    <div>
      <Suspense fallback={<>...</>}>
        <ResetPage />
      </Suspense>
    </div>
  );
};

export default page;

const ResetPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const otp = searchParams.get("otp");

  const [resetToken, setResetToken] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [otpVerify] = useOtpVerifyMutation();
  const [resetPassword, { isLoading }] = usePasswordResetMutation();

  //  OTP Verify
  useEffect(() => {
    const verifyOtp = async () => {
      if (!token || !otp) return;

      try {
        Swal.fire({
          title: "Verifying OTP...",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => Swal.showLoading(),
        });

        const res = await otpVerify({ token, otp }).unwrap();

        const receivedToken = res?.data?.resetToken;

        setResetToken(receivedToken);

        Swal.fire({
          icon: "success",
          title: "OTP Verified",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Invalid or Expired Link",
          text: err?.data?.message || "Please try again",
        });

        router.push("/forget-password");
      }
    };

    verifyOtp();
  }, [token, otp, otpVerify, router]);

  // input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!resetToken) return;

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
    }

    if (formData.password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters",
      });
    }

    try {
      Swal.fire({
        title: "Resetting Password...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
      });

      // ✅ FIXED PAYLOAD
      const payload = {
        resetToken,
        newPassword: formData.password,
      };

      const res = await resetPassword(payload).unwrap();

      console.log("RESET SUCCESS:", res);

      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "You can now login with your new password",
        confirmButtonColor: "#22c55e",
      }).then(() => {
        router.push("/login");
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text: err?.data?.message || "Something went wrong",
      });

      console.log("RESET ERROR:", err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-(--color-main-bg) p-8'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white shadow-lg rounded-2xl py-8 px-8 border border-(--color-card-border)'>
        <h1 className='heading text-(--color-primary)'>Reset Password</h1>

        <p className='mb-6 text-(--color-text-primary)'>
          {resetToken ? "Enter your new password" : "Verifying your request..."}
        </p>

        {/* ✅ Show only when verified */}
        {resetToken && (
          <>
            <input
              type='password'
              name='password'
              placeholder='New Password'
              className='border border-(--color-input-border) rounded-xl p-3 w-full mb-4'
              onChange={handleChange}
              required
            />

            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              className='border border-(--color-input-border) rounded-xl p-3 w-full mb-4'
              onChange={handleChange}
              required
            />

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-(--color-btn-primary-bg) text-white py-3 rounded-xl'>
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* Back */}
        <div className='text-center mt-6'>
          <span
            onClick={() => router.push("/login")}
            className='text-sm text-(--color-primary) cursor-pointer hover:underline'>
            Back to Login
          </span>
        </div>
      </form>
    </div>
  );
};
