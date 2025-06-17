import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ChartData } from "@/types/dashboard/chart";
import { mockOrders } from "@/mock/frontend/orders";

export const exportReportToPDF = (
  salesPerItemData: ChartData[],
  revenueBreakdownData: ChartData[],
  staffPerformanceData: ChartData[],
  inventoryUsageData: ChartData[]
) => {
  if (
    !salesPerItemData ||
    !revenueBreakdownData ||
    !staffPerformanceData ||
    !inventoryUsageData
  )
    return;

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
  doc.text("Sales & Reports", pageWidth / 2, 35, { align: "center" });

  let currentY = 65;

  // Process each section
  const sections = [
    {
      title: "Sales per Item",
      data: salesPerItemData,
      columns: [
        { header: "Item", dataKey: "item" },
        { header: "Revenue", dataKey: "revenue" },
      ],
    },
    {
      title: "Revenue Breakdown",
      data: revenueBreakdownData,
      columns: [
        { header: "Source", dataKey: "source" },
        { header: "Amount", dataKey: "amount" },
      ],
    },
    {
      title: "Staff Performance",
      data: staffPerformanceData,
      columns: [
        { header: "Staff Member", dataKey: "item" },
        { header: "Sales/Orders", dataKey: "revenue" },
      ],
    },
    {
      title: "Inventory Usage Reports",
      data: inventoryUsageData,
      columns: [
        { header: "Item", dataKey: "item" },
        { header: "Usage", dataKey: "revenue" },
      ],
    },
  ];

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
        doc.text("Coffee Shop - Sales & Reports", margin, pageHeight - 20);
        doc.text(`Page ${currentPage}`, pageWidth - margin, pageHeight - 20, {
          align: "right",
        });
      },
    });

    // Update currentY for next section
    currentY = (doc as any).lastAutoTable.finalY + 20;
  });

  // Save the PDF
  doc.save("coffee_shop_reports.pdf");
};

export const exportFeedbackToPDF = (feedbackData: any[]) => {
  if (!feedbackData) return;

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
  doc.text("Customer Feedback Report", pageWidth / 2, 35, { align: "center" });

  let currentY = 65;

  // Add feedback table
  autoTable(doc, {
    startY: currentY,
    head: [["Customer", "Rating", "Comment", "Date", "Sentiment"]],
    body: feedbackData.map((feedback) => [
      feedback.customerName,
      feedback.rating,
      feedback.comment,
      feedback.date,
      feedback.sentiment,
    ]),
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
      1: { cellWidth: 20 },
      2: { cellWidth: "auto" },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
    },
    margin: { top: currentY, right: margin, bottom: 40, left: margin },
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
      doc.text("Coffee Shop - Customer Feedback", margin, pageHeight - 20);
      doc.text(`Page ${currentPage}`, pageWidth - margin, pageHeight - 20, {
        align: "right",
      });
    },
  });

  // Save the PDF
  doc.save("customer_feedback.pdf");
};

export const generateOrderToPDF = (order: (typeof mockOrders)[0]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Add header with background
  doc.setFillColor(250, 246, 240);
  doc.rect(0, 0, pageWidth, 50, "F");

  // Add decorative line
  doc.setDrawColor(201, 181, 165);
  doc.setLineWidth(0.5);
  doc.line(margin, 50, pageWidth - margin, 50);

  // Add site name
  doc.setFontSize(28);
  doc.setTextColor(111, 91, 79);
  doc.text("Coffee Shop", pageWidth / 2, 25, { align: "center" });

  // Add order details
  doc.setFontSize(16);
  doc.text(`Order #${order.id}`, margin, 70);
  doc.setFontSize(12);
  doc.text(`Date: ${order.date}`, margin, 80);
  doc.text(`Status: ${order.status}`, margin, 90);

  // Add items table
  autoTable(doc, {
    startY: 100,
    head: [["Item", "Quantity", "Price", "Total"]],
    body: order.items.map((item) => [
      item.name,
      item.quantity.toString(),
      `$${item.price.toFixed(2)}`,
      `$${(item.quantity * item.price).toFixed(2)}`,
    ]),
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 5,
      lineColor: [230, 224, 219],
      lineWidth: 0.1,
      textColor: [111, 91, 79],
    },
    headStyles: {
      fillColor: [201, 181, 165],
      textColor: [74, 60, 50],
      fontStyle: "bold",
    },
    foot: [["", "", "Total:", `$${order.total.toFixed(2)}`]],
    footStyles: {
      fillColor: [250, 246, 240],
      textColor: [111, 91, 79],
      fontStyle: "bold",
    },
    margin: { top: 100, right: margin, bottom: 40, left: margin },
  });

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(76, 60, 50);
  doc.text(
    "Thank you for your order!",
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 20,
    { align: "center" }
  );

  return doc;
};

export const generateAllOrdersToPDF = (orders: typeof mockOrders) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const pageHeight = doc.internal.pageSize.getHeight();

  // Add header with background
  doc.setFillColor(250, 246, 240);
  doc.rect(0, 0, pageWidth, 40, "F");

  // Add decorative line
  doc.setDrawColor(201, 181, 165);
  doc.setLineWidth(0.5);
  doc.line(margin, 40, pageWidth - margin, 40);

  // Add site name
  doc.setFontSize(24);
  doc.setTextColor(111, 91, 79);
  doc.text("Coffee Shop", pageWidth / 2, 20, { align: "center" });

  // Add title
  doc.setFontSize(14);
  doc.text("Order History", pageWidth / 2, 30, { align: "center" });

  let currentY = 50;

  // Process each order
  orders.forEach((order, index) => {
    // Check if we need a new page
    if (currentY > pageHeight - 60) {
      doc.addPage();
      currentY = 20;
    }

    // Add order details
    doc.setFontSize(12);
    doc.text(`Order #${order.id}`, margin, currentY);
    doc.setFontSize(10);
    doc.text(`Date: ${order.date}`, margin, currentY + 8);
    doc.text(`Status: ${order.status}`, margin, currentY + 16);

    // Add items table
    autoTable(doc, {
      startY: currentY + 24,
      head: [["Item", "Quantity", "Price", "Total"]],
      body: order.items.map((item) => [
        item.name,
        item.quantity.toString(),
        `$${item.price.toFixed(2)}`,
        `$${(item.quantity * item.price).toFixed(2)}`,
      ]),
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 3,
        lineColor: [230, 224, 219],
        lineWidth: 0.1,
        textColor: [111, 91, 79],
      },
      headStyles: {
        fillColor: [201, 181, 165],
        textColor: [74, 60, 50],
        fontStyle: "bold",
        fontSize: 8,
      },
      foot: [["", "", "Total:", `$${order.total.toFixed(2)}`]],
      footStyles: {
        fillColor: [250, 246, 240],
        textColor: [111, 91, 79],
        fontStyle: "bold",
        fontSize: 8,
      },
      margin: { top: currentY + 24, right: margin, bottom: 20, left: margin },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: 20 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
      },
      didDrawPage: function (data) {
        // Add page number
        doc.setFontSize(8);
        doc.setTextColor(76, 60, 50);
        doc.text(
          `Page ${data.pageNumber} of ${(
            doc as any
          ).internal.getNumberOfPages()}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      },
    });

    // Update currentY for next order
    currentY = (doc as any).lastAutoTable.finalY + 15;
  });

  return doc;
};
