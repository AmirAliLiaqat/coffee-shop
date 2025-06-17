import * as XLSX from "xlsx";
import { ChartData } from "@/types/dashboard/chart";

export const exportReportToExcel = (
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

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert sales per item data to worksheet
  const salesWS = XLSX.utils.json_to_sheet(salesPerItemData);
  XLSX.utils.book_append_sheet(wb, salesWS, "Sales per Item");

  // Convert revenue breakdown data to worksheet
  const revenueWS = XLSX.utils.json_to_sheet(revenueBreakdownData);
  XLSX.utils.book_append_sheet(wb, revenueWS, "Revenue Breakdown");

  // Convert staff performance data to worksheet
  const staffWS = XLSX.utils.json_to_sheet(staffPerformanceData);
  XLSX.utils.book_append_sheet(wb, staffWS, "Staff Performance");

  // Convert inventory usage data to worksheet
  const inventoryWS = XLSX.utils.json_to_sheet(inventoryUsageData);
  XLSX.utils.book_append_sheet(wb, inventoryWS, "Inventory Usage");

  // Generate Excel file
  XLSX.writeFile(wb, "coffee_shop_reports.xlsx");
};

export const exportReportToCSV = (
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

  // Create CSV content with headers and spacing between sections
  let csvContent = "";

  // Sales per Item section
  csvContent += "Sales per Item\n";
  const salesHeaders = Object.keys(salesPerItemData[0]).join(",");
  csvContent += salesHeaders + "\n";
  salesPerItemData.forEach((item) => {
    csvContent += Object.values(item).join(",") + "\n";
  });
  csvContent += "\n\n";

  // Revenue Breakdown section
  csvContent += "Revenue Breakdown\n";
  const revenueHeaders = Object.keys(revenueBreakdownData[0]).join(",");
  csvContent += revenueHeaders + "\n";
  revenueBreakdownData.forEach((item) => {
    csvContent += Object.values(item).join(",") + "\n";
  });
  csvContent += "\n\n";

  // Staff Performance section
  csvContent += "Staff Performance\n";
  const staffHeaders = Object.keys(staffPerformanceData[0]).join(",");
  csvContent += staffHeaders + "\n";
  staffPerformanceData.forEach((item) => {
    csvContent += Object.values(item).join(",") + "\n";
  });
  csvContent += "\n\n";

  // Inventory Usage section
  csvContent += "Inventory Usage\n";
  const inventoryHeaders = Object.keys(inventoryUsageData[0]).join(",");
  csvContent += inventoryHeaders + "\n";
  inventoryUsageData.forEach((item) => {
    csvContent += Object.values(item).join(",") + "\n";
  });

  // Create and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "coffee_shop_reports.csv";
  link.click();
};

export const exportFeedbackToExcel = (feedbackData: any[]) => {
  if (!feedbackData) return;

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert feedback data to worksheet
  const ws = XLSX.utils.json_to_sheet(feedbackData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Customer Feedback");

  // Generate Excel file
  XLSX.writeFile(wb, "customer_feedback.xlsx");
};

export const exportFeedbackToCSV = (feedbackData: any[]) => {
  if (!feedbackData) return;

  // Convert data to CSV
  const csv = XLSX.utils.json_to_sheet(feedbackData);
  const csvContent = XLSX.utils.sheet_to_csv(csv);

  // Create and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "customer_feedback.csv";
  link.click();
};
