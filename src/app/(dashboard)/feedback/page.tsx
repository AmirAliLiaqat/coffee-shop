"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, TrendingUp, Download, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SharedDialog } from "@/components/ui/shared-dialog"
import { ExportDialog } from "@/components/dashboard/shared/ExportDialog";
import { exportFeedbackToPDF } from "@/utils/pdf-export";
import { exportFeedbackToExcel, exportFeedbackToCSV } from "@/utils/excel-export";
import { Feedback } from "@/types/dashboard/feedback";
import { recentFeedback } from "@/mock/dashboard/feedback";

export default function FeedbackPage() {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleFilterCancel = () => {
    setIsFilterOpen(false);
  };

  const handleReplyCancel = () => {
    setIsReplyOpen(false);
    setSelectedFeedback(null);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${index < rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
              }`}
          />
        ))}
      </div>
    );
  };

  const handleDateChange = (newDateRange: DateRange | undefined) => {
    console.log('Date range changed:', newDateRange);
  };

  const handleExport = (type: 'pdf' | 'excel' | 'csv') => {
    const feedbackData = recentFeedback.map(feedback => ({
      ...feedback,
      rating: feedback.rating.toString(),
    }));

    switch (type) {
      case 'pdf':
        exportFeedbackToPDF(feedbackData);
        break;
      case 'excel':
        exportFeedbackToExcel(feedbackData);
        break;
      case 'csv':
        exportFeedbackToCSV(feedbackData);
        break;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slideDown">Customer Feedback</h1>
          <p className="text-muted-foreground animate-fadeIn delay-100">
            Manage and respond to customer reviews and feedback.
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

      <ExportDialog
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        onExport={handleExport}
        onDateChange={handleDateChange}
        title="Export Feedback"
        description="Choose the format and date range for your feedback export."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-slideUp">
        <Card className="animate-fadeIn">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              +0.2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn delay-75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn delay-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Positive feedback
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 animate-slideUp">
        <Card className="col-span-7 md:col-span-4 animate-fadeIn delay-200">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>
              Latest customer reviews and feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((feedback, index) => (
                <div
                  key={feedback.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-4 border rounded-lg animate-fadeIn gap-4"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className="font-medium">{feedback.customerName}</h4>
                      <span className="text-sm text-muted-foreground">
                        {feedback.date}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {renderStars(feedback.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feedback.comment}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-start">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedFeedback(feedback);
                        setIsReplyOpen(true);
                      }}
                    >
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      Flag
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-7 md:col-span-2 lg:col-span-3 animate-fadeIn delay-250">
          <CardHeader>
            <CardTitle>Feedback Trends</CardTitle>
            <CardDescription>
              Customer satisfaction over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px] flex items-center justify-center border rounded-lg">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center px-2 sm:px-4">
                Feedback trends chart will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <SharedDialog
        open={isReplyOpen}
        onOpenChange={setIsReplyOpen}
        title="Reply to Feedback"
        description="Respond to customer feedback and address their concerns."
        onSubmit={() => setIsReplyOpen(false)}
        submitText="Send Response"
        showCloseButton={true}
        onClose={handleReplyCancel}
        className="animate-scaleIn"
      >
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Original Feedback</h4>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-medium">{selectedFeedback?.customerName}</span>
                <span className="text-sm text-muted-foreground">
                  {selectedFeedback?.date}
                </span>
              </div>
              <div className="flex items-center my-2">
                {selectedFeedback && renderStars(selectedFeedback.rating)}
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedFeedback?.comment}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply">Your Response</Label>
            <textarea
              id="reply"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type your response here..."
              rows={4}
            />
          </div>
        </div>
      </SharedDialog>

      <SharedDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        title="Filter Feedback"
        description="Filter feedback by date range and rating."
        onSubmit={() => setIsFilterOpen(false)}
        submitText="Apply Filters"
        showCloseButton={true}
        onClose={handleFilterCancel}
        className="animate-scaleIn"
      >
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <select
              id="dateRange"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </SharedDialog>
    </div>
  );
} 