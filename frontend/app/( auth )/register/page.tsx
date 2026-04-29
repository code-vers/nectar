"use client";

import { useUserRegisterMutation } from "@/services/auth";
import { RegisterTYpe, Role } from "@/types/user.type";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterTYpe>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "",
  });

  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      roles: formData.roles,
    };

    try {
      // 🔵 Loading Alert
      Swal.fire({
        title: "Processing...",
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

      const res = await userRegister(payload).unwrap();

      // 🟢 Close loading then success
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User registered successfully",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
        },
      });

      console.log("SUCCESS:", res);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: err?.data?.message || "Something went wrong during registration",
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
        },
      });

      console.log("ERROR:", err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[var(--color-main-bg)] p-8'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg bg-white shadow-lg rounded-2xl py-8 px-8 border border-[var(--color-card-border)]'>
        <h1 className='heading text-[var(--color-primary)]'>Sign up</h1>
        <p className='mb-6'>
          Make changes to your account here. Click save when you are done.
        </p>

        {/* First Name */}
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4'
          onChange={handleChange}
          required
        />

        {/* Last Name */}
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4'
          onChange={handleChange}
          required
        />

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

        {/* Role */}
        <select
          name='roles'
          value={formData.roles}
          onChange={handleChange}
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4'
          required>
          <option value=''>Select Role</option>
          <option value={Role.PROPERTY_MANAGER}>Property Manager</option>
          <option value={Role.MAINTENANCE_TECH}>Maintenance Technician</option>
          <option value={Role.VENDOR}>Vendor</option>
          <option value={Role.OWNER}>Owner</option>
          <option value={Role.USER}>User</option>
        </select>

        {/* Submit */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-[var(--color-btn-primary-bg)] text-white py-3 rounded-xl'>
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <div className='text-center mt-6'>
          <p className='text-[var(--color-text-primary)] text-sm'>
            Already have an account?
          </p>

          <div
            onClick={() => (window.location.href = "/login")}
            className='mt-2 text-[var(--color-primary)] font-medium cursor-pointer hover:underline'>
            Login to your account
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
