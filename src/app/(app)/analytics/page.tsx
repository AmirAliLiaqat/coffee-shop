"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3, TrendingUp, Users, Coffee, Download, Filter } from "lucide-react";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("This Month");
  const [selectedMetrics, setSelectedMetrics] = useState(["revenue", "customers", "sales"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleFilterCancel = () => {
    setIsFilterOpen(false);
  };

  const handleExportCancel = () => {
    setIsExportOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights and analytics for your coffee shop business.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Analytics</DialogTitle>
                <DialogDescription>
                  Customize the analytics view by selecting metrics and date range.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="dateRange">Date Range</Label>
                  <select
                    id="dateRange"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Metrics</Label>
                  <div className="space-y-2">
                    {["revenue", "customers", "sales", "average order"].map((metric) => (
                      <label key={metric} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedMetrics.includes(metric)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMetrics([...selectedMetrics, metric]);
                            } else {
                              setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <span className="capitalize">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleFilterCancel}>Reset</Button>
                <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Analytics</DialogTitle>
                <DialogDescription>
                  Choose the format and data range for your export.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="exportFormat">Export Format</Label>
                  <select
                    id="exportFormat"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option>CSV</option>
                    <option>Excel</option>
                    <option>PDF</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exportDateRange">Date Range</Label>
                  <select
                    id="exportDateRange"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleExportCancel}>Cancel</Button>
                <Button onClick={() => setIsExportOpen(false)}>Export Data</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
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

        <Card>
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

        <Card>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.50</div>
            <p className="text-xs text-muted-foreground">
              +4.75% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
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

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>
              Most popular menu items this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Espresso', 'Cappuccino', 'Latte', 'Cold Brew', 'Croissant'].map((item, index) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 100) + 50} sales
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 