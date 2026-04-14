"use client";

import { useState } from "react";
import { z } from "zod";
import UniversalForm from "../universal-form/UniversalForm";
import { FieldConfig } from "../universal-form/form.types";

const testFormZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.coerce.number().min(1, "Age must be at least 1"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  gender: z.string().min(1, "Please select a gender"),
  isActive: z.boolean(),
  notifications: z.boolean(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date"),
  attachments: z.any().optional(),
  profilePic: z.any().optional(),
});

type TestFormValues = z.infer<typeof testFormZodSchema>;

const testFormFields: FieldConfig<TestFormValues>[] = [
  {
    name: "profilePic",
    label: "S",
    type: "profile-pic",
    span: 2,
    hint: "PNG, JPG",
    accept: "image/png,image/jpeg,image/jpg,image/webp",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter full name",
    required: true,
    span: 2,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    required: true,
    span: 1,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
    span: 1,
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter age",
    required: true,
    span: 1,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select category",
    required: true,
    span: 1,
    options: [
      { label: "Student", value: "student" },
      { label: "Teacher", value: "teacher" },
      { label: "Parent", value: "parent" },
    ],
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    required: true,
    span: 1,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "birthDate",
    label: "Birth Date",
    type: "date",
    required: true,
    span: 1,
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Write your short bio",
    required: true,
    span: 2,
  },
  {
    name: "attachments",
    label: "Attachments",
    type: "file",
    multiple: true,
    span: 2,
    hint: "Max file size: 25 MB",
    accept: ".pdf,.doc,.docx,image/*",
  },
  {
    name: "isActive",
    label: "Active Account",
    type: "switch",
    span: 1,
  },
  {
    name: "notifications",
    label: "Receive Notifications",
    type: "checkbox",
    span: 1,
  },
];

const TeastForm = () => {
  const [isOpen, setIsOpen] = useState(true);

  const defaultValues: Partial<TestFormValues> = {
    profilePic: "https://i.pravatar.cc/150?img=47",
    name: "Sarah Islam",
    email: "sarah@gmail.com",
    password: "123456",
    age: 27,
    bio: "I am testing all UniversalForm field types with reusable configs.",
    category: "student",
    gender: "female",
    isActive: true,
    notifications: true,
    birthDate: "1998-05-12",
    attachments: null,
  };

  return (
    <div className='mx-auto max-w-5xl p-4'>
      <UniversalForm<TestFormValues>
        title='Universal Form Test'
        subtitle='All field types are included here for reusable testing.'
        fields={testFormFields}
        schema={testFormZodSchema}
        defaultValues={defaultValues}
        submitText='Save Changes'
        showSubmitLog={true}
        setOpen={setIsOpen}
        onSubmit={(data) => {
          console.log("TeastForm onSubmit:", data);
        }}
      />
    </div>
  );
};

export default TeastForm;
