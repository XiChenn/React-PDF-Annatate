"use client";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.js";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PDFViewer() {
  const [file, setFile] = useState<string>("/sample.pdf");
  const [numPages, setNumPages] = useState<number | null>(null);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  return (
    <div>
      <div>
        <label htmlFor="file">Load from file:</label>{" "}
        <input onChange={onFileChange} type="file" />
      </div>
      <div>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages &&
            Array.from({ length: numPages }, (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            ))}
        </Document>
      </div>
    </div>
  );
}
