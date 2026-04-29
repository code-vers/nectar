import DocumentCard from "@/components/dashboard/common/DocumentCard";
import { Document } from "@/types/document.type";
import React from "react";

const templateDocuments: Document[] = [
  {
    id: "template-1",
    name: "Move-In Inspection Form",
    description: "Resident move-in checklist and inspection report.",
    type: "pdf",
    sizeLabel: "528 KB",
    url: "/docs/move-in-inspection.pdf",
  },
  {
    id: "template-2",
    name: "Welcome Letter Template",
    description: "Personalized letter for new residents and community policies.",
    type: "docx",
    sizeLabel: "210 KB",
    url: "/docs/welcome-letter.docx",
  },
  {
    id: "template-3",
    name: "Emergency Contact Guide",
    description: "Quick reference for emergency procedures and support contacts.",
    type: "pdf",
    sizeLabel: "312 KB",
    url: "/docs/emergency-contact-guide.pdf",
  },
];

const TemplateSection = () => {
  return (
    <section className="rounded-4">
      <div className="mb-6 max-w-2xl">
        <h2 className="mt-3 text-2xl font-semibold text-(--color-text-primary)">
          Template
        </h2>
        <p className="mt-2 text-sm leading-6 text-(--color-placeholder-text)">
          Explore our most popular courses across all learning categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templateDocuments.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </section>
  );
};

export default TemplateSection;