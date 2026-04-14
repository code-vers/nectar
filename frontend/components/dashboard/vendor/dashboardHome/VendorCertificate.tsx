import DocumentCard from "@/components/dashboard/common/DocumentCard";
import { Document } from "@/types/document.type";
import React from "react";

type VendorCertificateProps = {
  documents?: Document[];
};

const defaultDocs: Document[] = [
  {
    id: "1",
    name: "Tenant Move -In Checklist",
    description: "PDF",
    sizeLabel: "234 KB",
    type: "workbook",
    url: "/docs/tenant-move-in.pdf",
    uploadedAt: new Date("2026-03-15"),
  },
  {
    id: "2",
    name: "Tenant Move -In Checklist",
    description: "PDF",
    sizeLabel: "234 KB",
    type: "workbook",
    url: "/docs/tenant-move-in.pdf",
    uploadedAt: new Date("2026-03-16"),
  },
  {
    id: "3",
    name: "Tenant Move -In Checklist",
    description: "PDF",
    sizeLabel: "234 KB",
    type: "workbook",
    url: "/docs/tenant-move-in.pdf",
    uploadedAt: new Date("2026-03-17"),
  },
  {
    id: "4",
    name: "Emergency Contact Procedures",
    description: "Operations",
    sizeLabel: "—",
    type: "certificate",
    url: "/docs/emergency-contact.pdf",
    uploadedAt: new Date("2026-03-20"),
  },
  {
    id: "5",
    name: "Rent Collection Best Practices",
    description: "Finance",
    sizeLabel: "—",
    type: "certificate",
    url: "/docs/rent-collection.pdf",
    uploadedAt: new Date("2026-03-22"),
  },
  {
    id: "6",
    name: "Property Marketing Strategies",
    description: "Marketing",
    sizeLabel: "—",
    type: "certificate",
    url: "/docs/marketing-strategies.pdf",
    uploadedAt: new Date("2026-03-25"),
  },
];

const typeLabels: Record<string, string> = {
  workbook: "Workbooks & Downloads",
  certificate: "Certificates",
};

const VendorCertificate: React.FC<VendorCertificateProps> = ({ documents }) => {
  const docs = documents ?? defaultDocs;

  // group by type
  const groups: Record<string, Document[]> = docs.reduce(
    (acc, d) => {
      const k = d.type || "other";
      if (!acc[k]) acc[k] = [];
      acc[k].push(d);
      return acc;
    },
    {} as Record<string, Document[]>,
  );

  const orderedTypes = ["workbook", "certificate"];

  return (
    <section className='grid mt-16 grid-cols-1 md:grid-cols-2 gap-6'>
      {orderedTypes.map((t) => (
        <div
          key={t}
          className='bg-(--color-card-bg) border border-(--color-card-border) rounded-xl p-5 shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>{typeLabels[t] ?? t}</h3>

          <div className='flex flex-col gap-3'>
            {(groups[t] ?? []).map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default VendorCertificate;
