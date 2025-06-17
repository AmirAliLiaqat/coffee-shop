"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Download, TrendingUp, DollarSign, Users, Coffee } from "lucide-react";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("This Month");
  const [selectedMetrics, setSelectedMetrics] = useState(["revenue", "customers", "sales"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleFilterCancel = () => {
    setIsFilterOpen(false);
    setDateRange("This Month");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slideDown">Analytics</h1>
          <p className="text-muted-foreground animate-fadeIn delay-100">
            Detailed insights and analytics for your coffee shop business.
          </p>
        </div>
        <div className="flex gap-2 animate-fadeIn delay-100">
          <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="animate-fadeIn delay-150">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" onClick={() => setIsExportOpen(true)} className="animate-fadeIn delay-200">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <SharedDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        title="Filter Analytics"
        description="Customize the analytics view by selecting metrics and date range."
        onSubmit={() => setIsFilterOpen(false)}
        submitText="Apply Filters"
        showCloseButton={true}
        onClose={handleFilterCancel}
        className="animate-scaleIn"
      >
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="dateRange">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="lastWeek">Last Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {dateRange === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
          )}
        </div>
      </SharedDialog>

      <SharedDialog
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        title="Export Analytics"
        description="Choose the format and data range for your export."
        onSubmit={() => setIsExportOpen(false)}
        submitText="Export"
        showCloseButton={true}
        onClose={() => setIsExportOpen(false)}
        className="animate-scaleIn"
      >
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="exportFormat">Export Format</Label>
            <Select>
              <SelectTrigger id="exportFormat">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="exportDateRange">Date Range</Label>
            <Select>
              <SelectTrigger id="exportDateRange">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="last90">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SharedDialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-slideUp">
        <Card className="animate-fadeIn">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn delay-75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coffee Sales</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn delay-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.50</div>
            <p className="text-xs text-muted-foreground">
              +4.75% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 animate-slideUp">
        <Card className="col-span-4 lg:col-span-3 animate-fadeIn delay-250">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>
              Most popular menu items this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Espresso', 'Cappuccino', 'Latte', 'Cold Brew', 'Croissant'].map((item, index) => (
                <div
                  key={item}
                  className="flex sm:items-center justify-between gap-1 sm:gap-2 animate-fadeIn p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 100) + 50} sales
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4 animate-fadeIn delay-200">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue trends and analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Revenue chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 