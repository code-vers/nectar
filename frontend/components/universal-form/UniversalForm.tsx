import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import {
  Controller,
  DefaultValues,
  FieldErrors,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { FiCalendar, FiLoader, FiUploadCloud, FiX } from "react-icons/fi";
import { ZodType } from "zod";
import { UniversalFomrsProps } from "./form.types";

export default function UniversalForm<T extends FieldValues>({
  title,
  fields,
  schema,
  defaultValues,
  onSubmit,
  submitText,
  setOpen,
  renderAfterField,
}: UniversalFomrsProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema as ZodType<T, any, any>),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const { handleSubmit, control, formState } = methods;

  // State for selected files and drag state
  const [selectedFilesByField, setSelectedFilesByField] = useState<
    Record<string, { name: string; isImage: boolean; previewUrl?: string }[]>
  >({});
  const [isDragging, setIsDragging] = useState<Record<string, boolean>>({});

  const handleFileChange = (
    fieldName: string,
    files: FileList | null,
    multiple: boolean | undefined,
    currentValue: string | FileList | null | File,
    onChange: (value: string | FileList | null | File) => void,
  ) => {
    if (!files) return;

    let nextFiles: FileList | null = files;

    if (multiple) {
      const dt = new DataTransfer();
      const existingFiles =
        currentValue instanceof FileList ? currentValue : null;

      if (existingFiles) {
        for (let i = 0; i < existingFiles.length; i++) {
          dt.items.add(existingFiles[i]);
        }
      }

      for (let i = 0; i < files.length; i++) {
        dt.items.add(files[i]);
      }

      nextFiles = dt.files.length > 0 ? dt.files : null;
      onChange(nextFiles);
    } else {
      onChange(files[0]);
    }

    // Track every selected file so all file types are visible in UI.
    const nextSelectedFiles: {
      name: string;
      isImage: boolean;
      previewUrl?: string;
    }[] = [];

    const previewSource = multiple && nextFiles ? nextFiles : files;
    for (let i = 0; i < previewSource.length; i++) {
      const file = previewSource[i];
      const isImage = file.type.startsWith("image/");
      nextSelectedFiles.push({
        name: file.name,
        isImage,
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
      });
    }

    setSelectedFilesByField((prev) => ({
      ...prev,
      [fieldName]: nextSelectedFiles,
    }));
  };

  const handleFileDrop = (
    e: React.DragEvent<HTMLDivElement>,
    fieldName: string,
    multiple: boolean | undefined,
    currentValue: string | FileList | null | File,
    onChange: (value: string | FileList | null | File) => void,
  ) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [fieldName]: false }));
    handleFileChange(
      fieldName,
      e.dataTransfer.files,
      multiple,
      currentValue,
      onChange,
    );
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    fieldName: string,
  ) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleDragLeave = (fieldName: string) => {
    setIsDragging((prev) => ({ ...prev, [fieldName]: false }));
  };

  const removeSelectedFile = (
    fieldName: string,
    index: number,
    currentValue: string | FileList | null | File,
    multiple: boolean | undefined,
    onChange: (value: string | FileList | null | File) => void,
  ) => {
    setSelectedFilesByField((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName]?.filter((_, i) => i !== index) || [],
    }));

    if (multiple) {
      const dt = new DataTransfer();
      const files = currentValue as FileList;
      for (let i = 0; i < files.length; i++) {
        if (i !== index) dt.items.add(files[i]);
      }
      onChange(dt.files.length > 0 ? dt.files : null);
    } else {
      onChange(null);
    }
  };

  // Scroll to and focus the first errored field (in form order)
  const handleError = (errors: FieldErrors<T>) => {
    const firstErrorField = fields.find((f) => errors[f.name]);
    if (firstErrorField) {
      const el = document.getElementById(String(firstErrorField.name));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const focusable = el.querySelector<HTMLElement>(
          "input:not([type='hidden']), textarea, select, button",
        );
        focusable?.focus();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, handleError)}
        className='space-y-6 bg-white px-6 pb-4 dark:bg-gray-800'>
        <div className='flex justify-between'>
          <h2 className='text-primary pb-2 text-2xl font-semibold'>{title}</h2>
          {/* <AlertDialogCancel className="border-none p-0 shadow-none hover:bg-transparent hover:text-black dark:hover:text-white">
            <X />
          </AlertDialogCancel> */}
        </div>

        <fieldset className='space-y-6'>
          {fields.map((field) => (
            <div
              key={field.name}
              id={String(field.name)}
              className='flex flex-col'>
              {/* Label */}
              {field.type !== "checkbox" &&
                field.type !== "switch" &&
                field.type !== "radio" && (
                  <label className='text-foreground mb-4 text-xl font-medium'>
                    {field.label}
                    {field.required ? (
                      <span className='text-red-500'> *</span>
                    ) : (
                      ""
                    )}
                  </label>
                )}

              {/* Text, Email, Password, Number, Date */}
              {(field.type === "text" ||
                field.type === "email" ||
                field.type === "password" ||
                field.type === "number") && (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...methods.register(field.name)}
                  className={`border-input-border rounded-none border px-3 py-6 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white ${formState.errors[field.name] ? "border-2 border-red-500" : ""}`}
                />
              )}

              {/* Textarea */}
              {field.type === "textarea" && (
                <textarea
                  placeholder={field.placeholder}
                  {...methods.register(field.name)}
                  className={`border-input-border h-25 rounded border px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white ${formState.errors[field.name] ? "border-2 border-red-500" : ""}`}
                />
              )}

              {/* Select */}
              {field.type === "select" && (
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: controllerField }) => (
                    <select
                      {...controllerField}
                      className={`border-input-border rounded border px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white ${formState.errors[field.name] ? "border-2 border-red-500" : ""}`}>
                      <option value='' disabled>
                        {field.placeholder || "Select an option"}
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              )}

              {/* Radio */}
              {field.type === "radio" && (
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: controllerField }) => (
                    <div className='flex gap-4'>
                      {field.options?.map((opt) => (
                        <label
                          key={opt.value}
                          className='flex cursor-pointer items-center gap-2'>
                          <input
                            type='radio'
                            value={opt.value}
                            checked={controllerField.value === opt.value}
                            onChange={() => controllerField.onChange(opt.value)}
                            className='accent-primary h-4 w-4'
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  )}
                />
              )}

              {/* Checkbox */}
              {field.type === "checkbox" && (
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: controllerField }) => (
                    <label className='flex cursor-pointer items-center gap-2'>
                      <input
                        type='checkbox'
                        checked={controllerField.value || false}
                        onChange={(e) =>
                          controllerField.onChange(e.target.checked)
                        }
                        className='accent-primary size-4'
                      />
                      {field.label}
                    </label>
                  )}
                />
              )}

              {/* Switch */}
              {field.type === "switch" && (
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: controllerField }) => (
                    <label className='flex cursor-pointer items-center gap-2'>
                      <div
                        onClick={() =>
                          controllerField.onChange(!controllerField.value)
                        }
                        className={`flex h-5 w-10 items-center rounded-full p-1 transition-colors ${
                          controllerField.value
                            ? "bg-primary justify-end"
                            : "justify-start bg-gray-300 dark:bg-gray-600"
                        }`}>
                        <div className='h-4 w-4 rounded-full bg-white shadow' />
                      </div>
                      {field.label}
                    </label>
                  )}
                />
              )}

              {field.type === "date" && (
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: controllerField }) => (
                    <div className='relative'>
                      <input
                        type='date'
                        value={controllerField.value || ""}
                        onChange={controllerField.onChange}
                        className={`border-input-border w-full rounded-none border px-3 py-6 pr-11 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white ${formState.errors[field.name] ? "border-2 border-red-500" : ""}`}
                        aria-label={field.placeholder || "Select date"}
                      />
                      <FiCalendar className='text-primary pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg' />
                    </div>
                  )}
                />
              )}

              {field.type === "file" && (
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: controllerField }) => {
                    const fieldName = field.name;
                    const selectedFiles = selectedFilesByField[fieldName] || [];
                    const dragging = isDragging[fieldName] || false;

                    return (
                      <>
                        <label>
                          <input
                            type='file'
                            hidden
                            multiple={field.multiple}
                            onChange={(e) =>
                              handleFileChange(
                                fieldName,
                                e.target.files,
                                field.multiple,
                                controllerField.value,
                                controllerField.onChange,
                              )
                            }
                          />

                          <div
                            className={`flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed text-center transition ${dragging ? "border-primary bg-primary/10" : "border-input-border dark:border-gray-600"}`}
                            onDrop={(e) =>
                              handleFileDrop(
                                e,
                                fieldName,
                                field.multiple,
                                controllerField.value,
                                controllerField.onChange,
                              )
                            }
                            onDragOver={(e) => handleDragOver(e, fieldName)}
                            onDragLeave={() => handleDragLeave(fieldName)}>
                            {/* Icon */}
                            <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50'>
                              <FiUploadCloud className='text-primary h-6 w-6' />
                            </div>

                            <p className='text-sm'>
                              <span className='text-primary font-medium'>
                                Click or Drag & Drop
                              </span>{" "}
                              files
                            </p>
                            <p className='mt-1 text-xs text-gray-500'>
                              (Max. File size: 25 MB)
                            </p>
                          </div>
                        </label>

                        {/* Selected files */}
                        {selectedFiles.length > 0 && (
                          <div className='mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5'>
                            {selectedFiles.map((file, idx) => (
                              <div
                                key={`${file.name}-${idx}`}
                                className='relative aspect-square w-full overflow-hidden rounded border'>
                                {file.isImage && file.previewUrl ? (
                                  <Image
                                    width={200}
                                    height={200}
                                    src={file.previewUrl}
                                    alt={`preview-${idx}`}
                                    className='h-full w-full object-cover'
                                  />
                                ) : (
                                  <div className='bg-muted/40 flex h-full w-full flex-col items-center justify-center p-2 text-center'>
                                    <p className='max-w-full truncate text-xs font-medium'>
                                      {file.name}
                                    </p>
                                  </div>
                                )}
                                <button
                                  type='button'
                                  onClick={() =>
                                    removeSelectedFile(
                                      fieldName,
                                      idx,
                                      controllerField.value,
                                      field.multiple,
                                      controllerField.onChange,
                                    )
                                  }
                                  className='absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                                  <FiX />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  }}
                />
              )}

              {/* Error Message */}
              {formState.errors[field.name] && (
                <p className='mt-1 text-sm text-red-500'>
                  {formState.errors[field.name]?.message as string}
                </p>
              )}

              {renderAfterField ? renderAfterField(field.name) : null}
            </div>
          ))}
        </fieldset>

        {/* Submit Button */}

        <div className='flex gap-4'>
          <button
            onClick={() => setOpen(false)}
            type='button'
            className='border-destructive cursor-pointer rounded-none border bg-[#FFDDDD] py-4.75 text-[#DC3545] hover:bg-[#FFDDDD] hover:text-[#DC3545]'>
            Cancel
          </button>
          <button
            type='submit'
            disabled={formState.isSubmitting}
            className='bg-primary border-primary cursor-pointer rounded-none border py-4.75 text-white'>
            {formState.isSubmitting ? (
              <>
                <FiLoader className='mr-2 h-4 w-4 animate-spin' />
                {submitText ? `${submitText}...` : "Submitting..."}
              </>
            ) : (
              submitText || "Submit"
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
