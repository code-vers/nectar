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
  subtitle,
  fields,
  schema,
  defaultValues,
  onSubmit,
  submitText,
  showSubmitLog = true,
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
  const [profilePreviewByField, setProfilePreviewByField] = useState<
    Record<string, string>
  >({});
  const [isDragging, setIsDragging] = useState<Record<string, boolean>>({});

  const inputBaseClass =
    "w-full rounded-md border border-[var(--color-input-border)] bg-[var(--color-default-input-fill)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-placeholder-text)] focus:border-[var(--color-input-border-focus)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-input-border-focus)_25%,white)]";
  const inputErrorClass =
    "border-[var(--color-error)] focus:border-[var(--color-error)]";

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

  const handleProfilePicChange = (
    fieldName: string,
    files: FileList | null,
    onChange: (value: string | FileList | null | File) => void,
  ) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    onChange(file);
    setProfilePreviewByField((prev) => ({
      ...prev,
      [fieldName]: URL.createObjectURL(file),
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

  const handleFormSubmit = (data: T) => {
    if (showSubmitLog) {
      console.log("UniversalForm submit payload:", data);
    }
    onSubmit(data);
  };

  type FormField = (typeof fields)[number];
  type FormRow = {
    key: string;
    columns: 1 | 2;
    fields: FormField[];
  };

  const hasLineLayout = fields.some((field) => field.line !== undefined);

  const lineRows: FormRow[] = hasLineLayout
    ? Array.from(
        fields
          .reduce((map, field, index) => {
            const rowKey =
              field.line !== undefined ? `line-${field.line}` : `auto-${index}`;
            const existing = map.get(rowKey);

            if (existing) {
              existing.fields.push(field);
            } else {
              map.set(rowKey, {
                key: rowKey,
                columns: field.lineColumns ?? 2,
                fields: [field],
              });
            }

            return map;
          }, new Map<string, FormRow>())
          .values(),
      )
    : [];

  const renderField = (field: FormField, rowColumns: 1 | 2) => (
    <div
      key={String(field.name)}
      id={String(field.name)}
      className={`flex flex-col ${rowColumns === 2 && field.span === 1 ? "md:col-span-1" : "md:col-span-2"}`}>
      {/* Label */}
      {field.type !== "checkbox" &&
        field.type !== "switch" &&
        field.type !== "profile-pic" && (
          <label className='mb-2 text-[16px]  leading-none font-medium text-(--color-text-primary)]'>
            {field.label}
            {/* {field.required ? (
                      <span className='text-red-500'> *</span>
                    ) : (
                      ""
                    )} */}
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
          className={`${inputBaseClass} ${formState.errors[field.name] ? inputErrorClass : ""}`}
        />
      )}

      {/* Textarea */}
      {field.type === "textarea" && (
        <textarea
          placeholder={field.placeholder}
          {...methods.register(field.name)}
          className={`${inputBaseClass} min-h-32 resize-y ${formState.errors[field.name] ? inputErrorClass : ""}`}
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
              className={`${inputBaseClass} ${formState.errors[field.name] ? inputErrorClass : ""}`}>
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
                    className='h-4 w-4 accent-(--color-btn-secondary-bg)'
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
                onChange={(e) => controllerField.onChange(e.target.checked)}
                className='size-4 accent-(--color-btn-secondary-bg)'
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
                onClick={() => controllerField.onChange(!controllerField.value)}
                className={`flex h-5 w-10 items-center rounded-full p-1 transition-colors ${
                  controllerField.value
                    ? "justify-end bg-(--color-btn-secondary-bg)"
                    : "justify-start bg-gray-300"
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
                className={`${inputBaseClass} pr-11 ${formState.errors[field.name] ? inputErrorClass : ""}`}
                aria-label={field.placeholder || "Select date"}
              />
              <FiCalendar className='pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg text-(--color-primary)' />
            </div>
          )}
        />
      )}

      {field.type === "profile-pic" && (
        <Controller
          control={control}
          name={field.name}
          render={({ field: controllerField }) => {
            const profileValue = controllerField.value;
            const previewUrl =
              profilePreviewByField[field.name] ||
              (typeof profileValue === "string" ? profileValue : "");
            const fallbackLetter = field.label?.trim()?.charAt(0) || "U";

            return (
              <div className='my-2 flex items-center gap-4 p-4'>
                <div className='h-14 w-14 overflow-hidden rounded-full bg-(--color-sidebar-active) ring-2 ring-(--color-stroke)'>
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt='Profile preview'
                      width={200}
                      height={200}
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center text-lg font-semibold text-(--color-primary)'>
                      {fallbackLetter.toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <label className='inline-flex cursor-pointer items-center rounded-md border border-(--color-input-border) bg-white px-4 py-2 text-sm font-medium text-(--color-primary) transition hover:bg-(--color-hover-surface)'>
                    Change Photo
                    <input
                      type='file'
                      hidden
                      accept={
                        field.accept ||
                        "image/png,image/jpeg,image/jpg,image/webp"
                      }
                      onChange={(e) =>
                        handleProfilePicChange(
                          String(field.name),
                          e.target.files,
                          controllerField.onChange,
                        )
                      }
                    />
                  </label>
                  <p className='mt-1 text-xs text-(--color-placeholder-text)'>
                    {field.hint || "PNG, JPG"}
                  </p>
                </div>
              </div>
            );
          }}
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
                    accept={field.accept}
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
                    className={`flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed text-center transition ${dragging ? "border-(--color-input-border)] bg-(--color-sidebar-active)" : "border-(--color-input-border)"}`}
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
                    <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-sidebar-active)'>
                      <FiUploadCloud className='h-6 w-6 text-(--color-btn-secondary-bg)' />
                    </div>

                    <p className='text-sm'>
                      <span className='font-medium text-(--color-primary)'>
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
                            src={file.previewUrl}
                            alt={`preview-${idx}`}
                            width={200}
                            height={200}
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <div className='flex h-full w-full flex-col items-center justify-center bg-(--color-section-bg) p-2 text-center'>
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
                          className='absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--color-error) text-xs text-white'>
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

      {field.hint && field.type !== "profile-pic" && (
        <p className='mt-1 text-xs text-(--color-placeholder-text)'>
          {field.hint}
        </p>
      )}

      {renderAfterField ? renderAfterField(field.name) : null}
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit, handleError)}
        className='space-y-6 rounded-2xl border border-(--color-card-border) bg-(--color-card-bg) p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)] md:p-8'>
        <div className='flex justify-between'>
          <div>
            <h2 className='pb-1 text-[30px] font-semibold text-(--color-text-primary)'>
              {title}
            </h2>
            {subtitle && (
              <p className='text-sm text-(--color-placeholder-text)'>
                {subtitle}
              </p>
            )}
          </div>
          {/* <AlertDialogCancel className="border-none p-0 shadow-none hover:bg-transparent hover:text-black dark:hover:text-white">
            <X />
          </AlertDialogCancel> */}
        </div>

        {hasLineLayout ? (
          <fieldset className='space-y-5'>
            {lineRows.map((row) => (
              <div
                key={row.key}
                className={`grid grid-cols-1 gap-5 ${row.columns === 2 ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                {row.fields.map((field) => renderField(field, row.columns))}
              </div>
            ))}
          </fieldset>
        ) : (
          <fieldset className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            {fields.map((field) => renderField(field, 2))}
          </fieldset>
        )}

        {/* Submit Button */}

        <div className='flex gap-4'>
          <button
            onClick={() => setOpen(false)}
            type='button'
            className='cursor-pointer rounded-md border border-(--color-primary) px-7 py-3 font-semibold text-(--color-primary) transition hover:bg-(--color-hover-surface)'>
            Cancel
          </button>
          <button
            type='submit'
            disabled={formState.isSubmitting}
            className='cursor-pointer rounded-md border border-(--color-btn-secondary-bg) bg-(--color-btn-secondary-bg) px-7 py-3 font-semibold text-(--color-primary-btn-text) transition hover:bg-(--color-btn-primary-hover-bg) disabled:cursor-not-allowed disabled:opacity-70'>
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
