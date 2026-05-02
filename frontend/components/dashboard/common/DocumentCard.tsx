import { Document } from "@/types/document.type";
import React from "react";
import { FiDownload, FiFileText, FiLock } from "react-icons/fi";

interface DocumentCardProps {
  document: Document;
  variant?: "default" | "resource-row";
  disabled?: boolean;
}
 
const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  variant = "default",
  disabled = false,
}) => {
  // keep behavior same as original UI but guard against missing `type`
  const fileTypeLabel = document.type ? document.type.toUpperCase() : undefined;

  if (variant === "resource-row") {
    return (
      <article
        className={`w-full rounded-lg border px-4 py-3 ${
          disabled
            ? "border-[#E5E7EB] bg-[#F7F8FA]"
            : "border-[#DCE2EC] bg-[#F9FAFC]"
        }`}>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex min-w-0 items-start gap-3'>
            <div
              className={`mt-0.5 rounded-md border p-1.5 ${
                disabled
                  ? "border-[#D9DEE8] text-[#B5BECC]"
                  : "border-[#C8D2E0] text-[#2F3B52]"
              }`}>
              {disabled ? (
                <FiLock className='text-[15px]' />
              ) : (
                <FiFileText className='text-[15px]' />
              )}
            </div>

            <div className='min-w-0'>
              <h4
                className={`truncate text-[14px] font-semibold leading-tight ${
                  disabled ? "text-[#9FA8B7]" : "text-[#1F2937]"
                }`}>
                {document.name}
              </h4>
              <p
                className={`mt-0.5 text-[10px] leading-[1.3] ${
                  disabled ? "text-[#C0C6D2]" : "text-[#8B93A1]"
                }`}>
                {document.type
                  ? `${document.type.toUpperCase()} Document`
                  : "PDF Document"}
              </p>
            </div>
          </div>

          <a
            href={disabled ? undefined : document.url}
            download
            target='_blank'
            rel='noreferrer'
            aria-label={`Download ${document.name}`}
            className={`rounded p-1 transition-colors ${
              disabled
                ? "pointer-events-none text-[#C0C6D2]"
                : "text-[#2CB45A] hover:bg-[#EDF7F0]"
            }`}>
            <FiDownload className='text-[16px]' />
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className='w-full rounded-[10px] border border-(--color-card-border) bg-(--color-card-bg) px-5 py-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex min-w-0 items-start gap-3'>
          <div className='mt-0.5 rounded-md border border-(--color-input-border) p-2 text-(--color-primary)'>
            <FiFileText className='text-[20px]' />
          </div>

          <div className='min-w-0'>
            <h4 className='truncate text-[18px] font-semibold leading-tight text-(--color-text-primary)'>
              {document.name}
            </h4>
            {document.description && (
              <p className='mt-1 line-clamp-1 text-sm text-(--color-placeholder-text)'>
                {document.description}
              </p>
            )}

            <div className='pt-6 flex items-center gap-3 text-xs'>
              {fileTypeLabel && (
                <span className='rounded-full bg-[rgba(239,68,68,0.12)] px-2.5 py-0.5 font-semibold text-[rgba(239,68,68,0.9)]'>
                  {fileTypeLabel}
                </span>
              )}
              {document.sizeLabel && (
                <span className='text-(--color-placeholder-text)'>
                  • {document.sizeLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        <a
          href={document.url}
          download
          target='_blank'
          rel='noreferrer'
          className='mt-0.5 rounded-md p-1.5 text-(--color-success) transition hover:bg-(--color-hover-surface)'
          aria-label={`Download ${document.name}`}>
          <FiDownload className='text-[20px]' />
        </a>
      </div>
    </article>
  );
};

export default DocumentCard;
