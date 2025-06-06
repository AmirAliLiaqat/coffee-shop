"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, BarChart2, PieChart, Users, Package, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DateRangePicker } from "@/components/reports/DateRangePicker";
import type { DateRange } from "react-day-picker";
import { ExampleChart } from "@/components/dashboard/ExampleChart";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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


  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    // Here you would typically refetch data based on the new dateRange
    console.log("Selected date range:", newDateRange);
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

  const exportToPDF = () => {
    if (!salesPerItemData || !revenueBreakdownData || !staffPerformanceData || !inventoryUsageData) return;

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Coffee Shop Reports", 14, 15);

    // Add date range if available
    if (dateRange?.from) {
      doc.setFontSize(12);
      const dateText = `Date Range: ${dateRange.from.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString() || 'Present'}`;
      doc.text(dateText, 14, 25);
    }

    // Add Sales per Item table
    doc.setFontSize(16);
    doc.text("Sales per Item", 14, 40);
    const salesData = salesPerItemData.map(item => [item.item || '', item.revenue?.toString() || '']);
    autoTable(doc, {
      startY: 45,
      head: [['Item', 'Revenue']],
      body: salesData,
    });

    // Add Revenue Breakdown table
    doc.setFontSize(16);
    doc.text("Revenue Breakdown", 14, (doc as any).lastAutoTable.finalY + 20);
    const revenueData = revenueBreakdownData.map(item => [item.source || '', item.amount?.toString() || '']);
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 25,
      head: [['Source', 'Amount']],
      body: revenueData,
    });

    // Add Staff Performance table
    doc.setFontSize(16);
    doc.text("Staff Performance", 14, (doc as any).lastAutoTable.finalY + 20);
    const staffData = staffPerformanceData.map(item => [item.item || '', item.revenue?.toString() || '']);
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 25,
      head: [['Staff Member', 'Sales/Orders']],
      body: staffData,
    });

    // Add Inventory Usage table
    doc.setFontSize(16);
    doc.text("Inventory Usage Reports", 14, (doc as any).lastAutoTable.finalY + 20);
    const inventoryData = inventoryUsageData.map(item => [item.item || '', item.revenue?.toString() || '']);
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 25,
      head: [['Item', 'Usage']],
      body: inventoryData,
    });

    // Save the PDF
    doc.save("coffee_shop_reports.pdf");
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
          <DateRangePicker onDateChange={handleDateChange} />
          <Button variant="outline" onClick={exportToPDF} className="hover:scale-105 transition-transform duration-200">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button variant="outline" onClick={exportToExcel} className="hover:scale-105 transition-transform duration-200">
            <Download className="mr-2 h-4 w-4" /> Export Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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

      <div className="grid gap-6 md:grid-cols-2">
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
