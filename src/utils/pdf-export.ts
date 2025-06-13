import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface PDFExportOptions {
  title: string;
  subtitle?: string;
  dateRange?: string;
  sections: {
    title: string;
    data: any[];
    columns: {
      header: string;
      dataKey: string;
    }[];
  }[];
  filename: string;
}

export const exportToPDF = ({
  title,
  subtitle,
  dateRange,
  sections,
  filename,
}: PDFExportOptions) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // Add header with background
  doc.setFillColor(250, 246, 240); // Light Cream/Beige (--background)
  doc.rect(0, 0, pageWidth, 50, "F");

  // Add decorative line
  doc.setDrawColor(201, 181, 165); // Muted Light Brown/Tan (--primary)
  doc.setLineWidth(0.5);
  doc.line(margin, 50, pageWidth - margin, 50);

  // Add site name with custom styling
  doc.setFontSize(28);
  doc.setTextColor(111, 91, 79); // Dark Brown (--foreground)
  doc.text("Coffee Shop", pageWidth / 2, 25, { align: "center" });

  // Add subtitle
  doc.setFontSize(16);
  doc.setTextColor(76, 60, 50); // Muted Brown (--muted-foreground)
  doc.text(subtitle || title, pageWidth / 2, 35, { align: "center" });

  // Add date range if available
  if (dateRange) {
    doc.setFontSize(12);
    doc.text(`Date Range: ${dateRange}`, pageWidth / 2, 45, {
      align: "center",
    });
  }

  let currentY = 65;

  // Process each section
  sections.forEach((section, index) => {
    // Check if we need a new page
    if (currentY > pageHeight - 100) {
      doc.addPage();
      currentY = 20; // Start closer to the top on new pages
    }

    // Add section title
    doc.setFontSize(16);
    doc.setTextColor(111, 91, 79); // Dark Brown (--foreground)
    doc.text(section.title, margin, currentY);

    // Prepare table data
    const tableData = section.data.map((item) =>
      section.columns.map((col) => item[col.dataKey]?.toString() || "")
    );

    // Add table
    autoTable(doc, {
      startY: currentY + 5,
      head: [section.columns.map((col) => col.header)],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [230, 224, 219], // Light Beige/Gray border (--border)
        lineWidth: 0.1,
        textColor: [111, 91, 79], // Dark Brown (--foreground)
        cellWidth: "auto",
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [201, 181, 165], // Muted Light Brown/Tan (--primary)
        textColor: [74, 60, 50], // Darker Brown (--primary-foreground)
        fontStyle: "bold",
        halign: "center",
        cellPadding: 2,
      },
      alternateRowStyles: {
        fillColor: [250, 246, 240], // Light Cream/Beige (--background)
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
      },
      margin: { top: currentY + 5, right: margin, bottom: 40, left: margin },
      didDrawPage: function (data) {
        // Add footer on each page
        const currentPage = data.pageNumber;

        // Add decorative line
        doc.setDrawColor(201, 181, 165); // Muted Light Brown/Tan (--primary)
        doc.setLineWidth(0.5);
        doc.line(margin, pageHeight - 30, pageWidth - margin, pageHeight - 30);

        // Add footer text
        doc.setFontSize(10);
        doc.setTextColor(76, 60, 50); // Muted Brown (--muted-foreground)
        doc.text("Coffee Shop - " + title, margin, pageHeight - 20);
        doc.text(`Page ${currentPage}`, pageWidth - margin, pageHeight - 20, {
          align: "right",
        });
      },
    });

    // Update currentY for next section
    currentY = (doc as any).lastAutoTable.finalY + 20;
  });

  // Save the PDF
  doc.save(filename);
};
