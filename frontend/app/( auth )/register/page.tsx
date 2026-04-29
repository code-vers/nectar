"use client";
import { RegisterTYpe, Role } from "@/types/user.type";
import React, { ChangeEvent, FormEvent, useState } from "react";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterTYpe>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formattedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      roles: formData.roles,
    };

    console.log("🟢 Registration Data:", formattedData);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[var(--color-main-bg)] p-8'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg bg-white shadow-lg rounded-2xl py-8 px-8 border border-[var(--color-card-border)]'>
        <h1 className='heading  text-[var(--color-primary)] '>Sign up</h1>
        <p className='mb-6'>
          Make changes to your account here. Click save when you are done.
        </p>

        {/* First Name */}
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4 focus:border-[var(--color-input-border-focus)] outline-none'
          onChange={handleChange}
          required
        />

        {/* Last Name */}
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4 focus:border-[var(--color-input-border-focus)] outline-none'
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4 focus:border-[var(--color-input-border-focus)] outline-none'
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4 focus:border-[var(--color-input-border-focus)] outline-none'
          onChange={handleChange}
          required
        />

        {/* Role Dropdown */}
        <select
          name='roles'
          value={formData.roles}
          onChange={handleChange}
          className='border border-[var(--color-input-border)] rounded-xl p-3 w-full mb-4 text-gray-700 focus:border-[var(--color-input-border-focus)] outline-none'
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
          className='w-full mt-2 bg-[var(--color-btn-primary-bg)] text-white py-3 rounded-xl hover:bg-[var(--color-btn-primary-hover-bg)] transition-all'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
