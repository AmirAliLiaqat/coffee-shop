"use client";

import * as XLSX from 'xlsx';
import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, PieChart, Users, Package, Loader2, Download } from "lucide-react";
import { ExampleChart } from "@/components/dashboard/ExampleChart";
import { ExportDialog } from "@/components/dashboard/shared/ExportDialog";
import { exportToPDF } from "@/utils/pdf-export";

interface ChartData {
  item?: string;
  revenue?: number;
  source?: string;
  amount?: number;
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [salesPerItemData, setSalesPerItemData] = useState<ChartData[] | null>(null);
  const [revenueBreakdownData, setRevenueBreakdownData] = useState<ChartData[] | null>(null);
  const [staffPerformanceData, setStaffPerformanceData] = useState<ChartData[] | null>(null);
  const [inventoryUsageData, setInventoryUsageData] = useState<ChartData[] | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    setSalesPerItemData([
      { item: "Latte", revenue: Math.floor(Math.random() * 1000) + 200 },
      { item: "Espresso", revenue: Math.floor(Math.random() * 800) + 150 },
      { item: "Croissant", revenue: Math.floor(Math.random() * 600) + 100 },
      { item: "Muffin", revenue: Math.floor(Math.random() * 500) + 80 },
      { item: "Iced Coffee", revenue: Math.floor(Math.random() * 900) + 180 },
    ]);

    setRevenueBreakdownData([
      { source: "Hot Drinks", amount: Math.floor(Math.random() * 2000) + 500 },
      { source: "Cold Drinks", amount: Math.floor(Math.random() * 1500) + 400 },
      { source: "Food", amount: Math.floor(Math.random() * 1000) + 300 },
      { source: "Merchandise", amount: Math.floor(Math.random() * 300) + 50 },
    ]);

    setStaffPerformanceData([
      { item: "John", revenue: Math.floor(Math.random() * 1500) + 300 },
      { item: "Sarah", revenue: Math.floor(Math.random() * 1500) + 300 },
      { item: "Mike", revenue: Math.floor(Math.random() * 1500) + 300 },
      { item: "Emma", revenue: Math.floor(Math.random() * 1500) + 300 },
    ]);

    setInventoryUsageData([
      { item: "Coffee Beans", revenue: Math.floor(Math.random() * 1000) + 200 },
      { item: "Milk", revenue: Math.floor(Math.random() * 800) + 150 },
      { item: "Sugar", revenue: Math.floor(Math.random() * 500) + 100 },
      { item: "Cups", revenue: Math.floor(Math.random() * 600) + 120 },
      { item: "Syrups", revenue: Math.floor(Math.random() * 400) + 80 },
    ]);
  }, []);

  const handlePDFExport = () => {
    if (!salesPerItemData || !revenueBreakdownData || !staffPerformanceData || !inventoryUsageData) return;

    exportToPDF({
      title: "Coffee Shop Reports",
      subtitle: "Sales & Reports",
      dateRange: dateRange?.from ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString() || 'Present'}` : undefined,
      sections: [
        {
          title: "Sales per Item",
          data: salesPerItemData,
          columns: [
            { header: 'Item', dataKey: 'item' },
            { header: 'Revenue', dataKey: 'revenue' }
          ]
        },
        {
          title: "Revenue Breakdown",
          data: revenueBreakdownData,
          columns: [
            { header: 'Source', dataKey: 'source' },
            { header: 'Amount', dataKey: 'amount' }
          ]
        },
        {
          title: "Staff Performance",
          data: staffPerformanceData,
          columns: [
            { header: 'Staff Member', dataKey: 'item' },
            { header: 'Sales/Orders', dataKey: 'revenue' }
          ]
        },
        {
          title: "Inventory Usage Reports",
          data: inventoryUsageData,
          columns: [
            { header: 'Item', dataKey: 'item' },
            { header: 'Usage', dataKey: 'revenue' }
          ]
        }
      ],
      filename: "coffee_shop_reports.pdf"
    });
  };

  const exportToExcel = () => {
    if (!salesPerItemData || !revenueBreakdownData || !staffPerformanceData || !inventoryUsageData) return;

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

  const exportToCSV = () => {
    if (!salesPerItemData || !revenueBreakdownData || !staffPerformanceData || !inventoryUsageData) return;

    const csvData = [
      ...salesPerItemData.map(item => ({ type: 'Sales per Item', ...item })),
      ...revenueBreakdownData.map(item => ({ type: 'Revenue Breakdown', ...item })),
      ...staffPerformanceData.map(item => ({ type: 'Staff Performance', ...item })),
      ...inventoryUsageData.map(item => ({ type: 'Inventory Usage', ...item }))
    ];
    const csv = XLSX.utils.json_to_sheet(csvData);
    const csvContent = XLSX.utils.sheet_to_csv(csv);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'coffee_shop_reports.csv';
    link.click();
  };

  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    console.log("Selected date range:", newDateRange);
  };

  const handleExport = (type: 'pdf' | 'excel' | 'csv') => {
    switch (type) {
      case 'pdf':
        handlePDFExport();
        break;
      case 'excel':
        exportToExcel();
        break;
      case 'csv':
        exportToCSV();
        break;
    }
  };

  const renderChart = (data: ChartData[] | null, title: string, description: string, dataKeyX: string, dataKeyY: string, fillColor: string, icon: LucideIcon, delay: number) => {
    const IconComponent = icon;
    if (!data) {
      return (
        <Card className="animate-fadeIn" style={{ animationDelay: `${delay}ms` }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline">{title}</CardTitle>
              <IconComponent className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      );
    }
    return (
      <Card className="animate-fadeIn" style={{ animationDelay: `${delay}ms` }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline">{title}</CardTitle>
            <IconComponent className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ExampleChart
            data={data}
            title=""
            dataKeyX={dataKeyX}
            dataKeyY={dataKeyY}
            fillColor={fillColor}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline animate-slideDown">Sales &amp; Reports</h1>
        <div className="flex gap-2 animate-fadeIn delay-100">
          <Button variant="outline" onClick={() => setIsExportOpen(true)} className="hover:scale-105 transition-transform duration-200">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <ExportDialog
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        onExport={handleExport}
        onDateChange={handleDateChange}
        title="Export Reports"
        description="Choose the format and date range for your export."
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {renderChart(
          salesPerItemData,
          "Sales per Item",
          "Revenue generated by each menu item.",
          "item",
          "revenue",
          "hsl(var(--chart-4))",
          BarChart2,
          150
        )}
        {renderChart(
          revenueBreakdownData,
          "Revenue Breakdown",
          "Breakdown of revenue by category or source.",
          "source",
          "amount",
          "hsl(var(--chart-5))",
          PieChart,
          300
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {renderChart(
          staffPerformanceData,
          "Staff Performance",
          "Sales or orders processed by each staff member.",
          "item",
          "revenue",
          "hsl(var(--chart-6))",
          Users,
          450
        )}
        {renderChart(
          inventoryUsageData,
          "Inventory Usage Reports",
          "Track consumption of inventory items.",
          "item",
          "revenue",
          "hsl(var(--chart-7))",
          Package,
          600
        )}
      </div>
    </div>
  );
}
