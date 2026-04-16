import DocumentCard from "@/components/dashboard/common/DocumentCard";
import { documents } from "@/types/document.type";
import React from "react";

const TestDocument: React.FC = () => {
  return (
    <div className='space-y-3'>
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
};

export default TestDocument;
