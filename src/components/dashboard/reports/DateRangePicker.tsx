
"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (dateRange: DateRange | undefined) => void;
}

export function DateRangePicker({ className, onDateChange }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  React.useEffect(() => {
    // Initialize date on the client-side to avoid hydration mismatch
    setDate({
      from: new Date(new Date().setDate(new Date().getDate() - 7)), // Default to last 7 days
      to: new Date(),
    });
  }, []);

  React.useEffect(() => {
    // Only call onDateChange if date is actually set
    if (date) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal sm:w-[300px]",
              !date && "text-muted-foreground"
            )}
            disabled={!date} // Disable button until date is initialized
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={!date} // Disable calendar interaction until date is initialized
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
