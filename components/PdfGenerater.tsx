import React, { FormEvent, useState } from "react";
import { jsPDF } from "jspdf";

function PdfGenerater() {
    const [pdfJS, setPdfJS] = useState<jsPDF>(new jsPDF());
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const generatePdfPreview = (text: string) => {
        const pdf = new jsPDF("p", "pt", "letter");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 50;
        const maxLineWidth = pageWidth - margin * 2;
        const lineHeight = 14;
        const lines = pdf.splitTextToSize(text, maxLineWidth);

        let cursorY = margin;

        lines.forEach((line) => {
            if (cursorY + lineHeight > pageHeight - margin) {
                pdf.addPage();
                cursorY = margin;
            }
            pdf.text(line, margin, cursorY);
            cursorY += lineHeight;
        });

        const pdfBlob = pdf.output("blob");
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
        setPdfJS(pdf);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        generatePdfPreview(text);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        pdfJS.save("dummy.pdf");
    };

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <textarea
                    className="txt"
                    name="txt"
                    onChange={handleInputChange}
                    style={{ width: "40vw", height: "80vh" }}
                />
                <br />
                <button type="submit">Download PDF</button>
            </form>

            <iframe
                src={pdfUrl ?? ''}
                // src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
                // src={`https://view.officeapps.live.com/op/embed.aspx?src=${pdfUrl}`}
                // src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${pdfUrl}`}
                title="PDF Preview"
                style={{ width: "40vw", height: "80vh", border: "1px solid #ccc" }}
            />

            <a href="https://its-reyad.netlify.app/">about me</a>
        </div>
    )
}
export default PdfGenerater;