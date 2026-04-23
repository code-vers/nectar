import { Document } from "@/types/document.type";
import DocumentCard from "../../common/DocumentCard";

const DownloadLibrary = () => {
    const activitiesAndWorksheet: Document[] = [
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
            description:
                "Reusable inspection format for new resident onboarding.",
            sizeLabel: "512 KB",
            uploadedAt: new Date("2026-04-01"),
        },
        {
            id: "4",
            name: "Move-In Inspection Form",
            type: "docx",
            url: "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc",
            description:
                "Reusable inspection format for new resident onboarding.",
            sizeLabel: "512 KB",
            uploadedAt: new Date("2026-04-01"),
        },
        {
            id: "5",
            name: "Move-In Inspection Form",
            type: "docx",
            url: "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc",
            description:
                "Reusable inspection format for new resident onboarding.",
            sizeLabel: "512 KB",
            uploadedAt: new Date("2026-04-01"),
        },
        {
            id: "6",
            name: "Move-In Inspection Form",
            type: "docx",
            url: "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc",
            description:
                "Reusable inspection format for new resident onboarding.",
            sizeLabel: "512 KB",
            uploadedAt: new Date("2026-04-01"),
        },
        {
            id: "7",
            name: "Move-In Inspection Form",
            type: "docx",
            url: "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc",
            description:
                "Reusable inspection format for new resident onboarding.",
            sizeLabel: "512 KB",
            uploadedAt: new Date("2026-04-01"),
        },
        {
            id: "8",
            name: "Move-In Inspection Form",
            type: "docx",
            url: "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc",
            description:
                "Reusable inspection format for new resident onboarding.",
            sizeLabel: "512 KB",
            uploadedAt: new Date("2026-04-01"),
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between">
                <div>
                    <h1 className="section-title">Courses</h1>
                </div>
                <div className="flex gap-5">
                    <input
                        type="text"
                        placeholder="Search Documents"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activitiesAndWorksheet.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            document={doc}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DownloadLibrary;
