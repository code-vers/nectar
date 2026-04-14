import { Document } from "@/types/document.type";
import React from "react";
import { FiDownload, FiFileText } from "react-icons/fi";

interface DocumentCardProps {
  // Accept partial documents — vendor dashboard may pass only some fields
  document: Partial<Document>;
}

const formatDate = (d?: string | Date) => {
  if (!d) return null;
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toLocaleDateString();
};

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const fileTypeLabel = (document.type || "FILE").toString().toUpperCase();

  return (
    <article className='w-full rounded-[10px] border border-(--color-card-border) bg-(--color-card-bg) px-5 py-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex min-w-0 items-start gap-3'>
          <div className='mt-0.5 rounded-md border border-(--color-input-border) p-2 text-(--color-primary)'>
            <FiFileText className='text-[20px]' />
          </div>

          <div className='min-w-0'>
            <h4 className='truncate text-[18px] font-semibold leading-tight text-(--color-text-primary)'>
              {document.name ?? "Untitled Document"}
            </h4>

            {document.description && (
              <p className='mt-1 line-clamp-1 text-sm text-(--color-placeholder-text)'>
                {document.description}
              </p>
            )}

            <div className='pt-6 flex items-center gap-3 text-xs'>
              <span className='rounded-full bg-[rgba(239,68,68,0.12)] px-2.5 py-0.5 font-semibold text-[rgba(239,68,68,0.9)]'>
                {fileTypeLabel}
              </span>

              {document.sizeLabel && (
                <span className='text-(--color-placeholder-text)'>
                  • {document.sizeLabel}
                </span>
              )}

              {document.uploadedAt && (
                <span className='text-(--color-placeholder-text)'>
                  • {formatDate(document.uploadedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {document.url ? (
          <a
            href={document.url}
            download
            target='_blank'
            rel='noreferrer'
            className='mt-0.5 rounded-md p-1.5 text-(--color-success) transition hover:bg-(--color-hover-surface)'
            aria-label={`Download ${document.name ?? "document"}`}>
            <FiDownload className='text-[20px]' />
          </a>
        ) : (
          <button
            type='button'
            disabled
            className='mt-0.5 rounded-md p-1.5 text-(--color-placeholder-text) opacity-60'
            aria-label={`No file available`}>
            <FiDownload className='text-[20px]' />
          </button>
        )}
      </div>
    </article>
  );
};

export default DocumentCard;
