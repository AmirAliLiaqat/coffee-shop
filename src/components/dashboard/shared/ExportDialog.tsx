"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/dashboard/reports/DateRangePicker";
import type { DateRange } from "react-day-picker";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (type: 'pdf' | 'excel' | 'csv') => void;
  onDateChange: (dateRange: DateRange | undefined) => void;
  title?: string;
  description?: string;
}

export function ExportDialog({
  open,
  onOpenChange,
  onExport,
  onDateChange,
  title = "Export Data",
  description = "Choose the format and date range for your export."
}: ExportDialogProps) {
  const [exportType, setExportType] = useState<'pdf' | 'excel' | 'csv'>('pdf');

  const handleExport = () => {
    onExport(exportType);
    onOpenChange(false);
  };

  return (
    <SharedDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      onSubmit={handleExport}
      submitText="Export"
      showCloseButton={true}
    >
      <div className="grid gap-4 py-4">
        <div className="space-y-4">
          <Label>Export Format</Label>
          <RadioGroup
            value={exportType}
            onValueChange={(value) => setExportType(value as 'pdf' | 'excel' | 'csv')}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem
                value="pdf"
                id="pdf"
                className="peer sr-only"
              />
              <Label
                htmlFor="pdf"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-3 h-6 w-6"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                PDF
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="excel"
                id="excel"
                className="peer sr-only"
              />
              <Label
                htmlFor="excel"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-3 h-6 w-6"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Excel
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="csv"
                id="csv"
                className="peer sr-only"
              />
              <Label
                htmlFor="csv"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-3 h-6 w-6"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                CSV
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-4">
          <Label>Date Range</Label>
          <DateRangePicker onDateChange={onDateChange} />
        </div>
      </div>
    </SharedDialog>
  );
} 