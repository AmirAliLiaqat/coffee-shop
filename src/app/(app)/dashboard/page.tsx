
"use client";

import { useState, useEffect } from 'react';
import { StatCard } from "@/components/dashboard/StatCard";
import { ExampleChart } from "@/components/dashboard/ExampleChart";
import { DollarSign, TrendingUp, Users, AlertTriangle, ShoppingCart, Activity, Loader2 } from "lucide-react";

interface ChartData {
  month?: string;
  sales?: number;
  day?: string;
  volume?: number;
  time?: string;
  orders?: number;
}

export default function DashboardPage() {
  const [salesData, setSalesData] = useState<ChartData[] | null>(null);
  const [orderVolumeData, setOrderVolumeData] = useState<ChartData[] | null>(null);
  const [peakTimesData, setPeakTimesData] = useState<ChartData[] | null>(null);

  useEffect(() => {
    setSalesData([
      { month: "January", sales: Math.floor(Math.random() * 5000) + 1000 },
      { month: "February", sales: Math.floor(Math.random() * 5000) + 1000 },
      { month: "March", sales: Math.floor(Math.random() * 5000) + 1000 },
      { month: "April", sales: Math.floor(Math.random() * 5000) + 1000 },
      { month: "May", sales: Math.floor(Math.random() * 5000) + 1000 },
      { month: "June", sales: Math.floor(Math.random() * 5000) + 1000 },
    ]);

    setOrderVolumeData([
      { day: "Mon", volume: Math.floor(Math.random() * 100) + 20 },
      { day: "Tue", volume: Math.floor(Math.random() * 100) + 20 },
      { day: "Wed", volume: Math.floor(Math.random() * 100) + 20 },
      { day: "Thu", volume: Math.floor(Math.random() * 100) + 20 },
      { day: "Fri", volume: Math.floor(Math.random() * 100) + 20 },
      { day: "Sat", volume: Math.floor(Math.random() * 100) + 20 },
      { day: "Sun", volume: Math.floor(Math.random() * 100) + 20 },
    ]);

    setPeakTimesData([
      { time: "Morning", orders: Math.floor(Math.random() * 50) + 10 },
      { time: "Afternoon", orders: Math.floor(Math.random() * 50) + 10 },
      { time: "Evening", orders: Math.floor(Math.random() * 50) + 10 },
    ]);
  }, []);

  const renderChart = (data: ChartData[] | null, title: string, description: string, dataKeyX: string, dataKeyY: string, fillColor: string) => {
    if (!data) {
      return (
        <div className="flex items-center justify-center h-[300px] bg-card rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    return (
      <ExampleChart
        data={data}
        title={title}
        description={description}
        dataKeyX={dataKeyX}
        dataKeyY={dataKeyY}
        fillColor={fillColor}
      />
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Orders" value="120" icon={ShoppingCart} description="Total orders today" colorClass="text-blue-500" />
        <StatCard title="Today's Revenue" value="$1,250" icon={DollarSign} description="+5% from yesterday" colorClass="text-green-500" />
        <StatCard title="Top-Selling Item" value="Latte" icon={TrendingUp} description="Most popular item" />
        <StatCard title="Active Staff" value="5" icon={Users} description="Staff currently on duty" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StatCard title="Low Stock Alerts" value="3 Items" icon={AlertTriangle} description="Needs restocking soon" colorClass="text-red-500" />
        <StatCard title="Pending Orders" value="8" icon={Activity} description="Awaiting preparation" colorClass="text-yellow-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {renderChart(
          salesData,
          "Sales Over Time",
          "Monthly sales figures for the last 6 months.",
          "month",
          "sales",
          "hsl(var(--chart-1))"
        )}
        {renderChart(
          orderVolumeData,
          "Order Volume (Weekly)",
          "Daily order volume for the current week.",
          "day",
          "volume",
          "hsl(var(--chart-2))"
        )}
      </div>
      <div>
        {renderChart(
          peakTimesData,
          "Best Times of Day for Sales",
          "Order distribution throughout the day.",
          "time",
          "orders",
          "hsl(var(--chart-3))"
        )}
      </div>
    </div>
  );
}
