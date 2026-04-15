export interface Document {
  id: string;
  name: string;
  type?: string;
  url: string;
  description?: string;
  sizeLabel?: string;
  uploadedAt?: Date;
}

export const documents: Document[] = [
  {
    id: "1",
    name: "Property Manager's Handbook",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description:
      "Standard residential lease contract template for property owners.",
    sizeLabel: "934 KB",
    uploadedAt: new Date("2026-03-20"),
  },
  {
    id: "2",
    name: "Tenant Communication Checklist",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description:
      "A practical checklist for handling tenant updates and notices.",
    sizeLabel: "1.2 MB",
    uploadedAt: new Date("2026-03-24"),
  },
  {
    id: "3",
    name: "Move-In Inspection Form",
    type: "docx",
    url: "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc",
    description: "Reusable inspection format for new resident onboarding.",
    sizeLabel: "512 KB",
    uploadedAt: new Date("2026-04-01"),
  },
  {
    id: "4",
    name: "Emergency Contact Template",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    sizeLabel: "289 KB",
    uploadedAt: new Date("2026-04-06"),
  },
];
