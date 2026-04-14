import { ReactNode } from "react";
import { FieldValues, Path } from "react-hook-form";
import { ZodType } from "zod";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "switch"
  | "file"
  | "date"
  | "profile-pic";

export interface FieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: FieldType;
  line?: number;
  lineColumns?: 1 | 2;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  span?: 1 | 2;
  accept?: string;
  hint?: string;
  options?: { label: string; value: string | number }[];
}

export interface UniversalFomrsProps<T extends FieldValues> {
  title: string;
  subtitle?: string;
  fields: FieldConfig<T>[];
  schema: ZodType<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => void;
  submitText?: string;
  showSubmitLog?: boolean;
  setOpen: (open: boolean) => void;
  renderAfterField?: (fieldName: Path<T>) => ReactNode;
}
