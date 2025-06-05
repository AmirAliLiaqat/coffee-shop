"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Star, MessageSquare, TrendingUp, Download, Filter } from "lucide-react";

export default function FeedbackPage() {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleFilterCancel = () => {
    setIsFilterOpen(false);
  };

  const handleExportCancel = () => {
    setIsExportOpen(false);
  };

  const handleReplyCancel = () => {
    setIsReplyOpen(false);
    setSelectedFeedback(null);
  };

  const recentFeedback = [
    {
      id: 1,
      customerName: "Emily Chen",
      rating: 5,
      comment: "The new seasonal latte is amazing! Great atmosphere and friendly staff.",
      date: "2024-03-15",
      sentiment: "positive",
    },
    {
      id: 2,
      customerName: "David Wilson",
      rating: 4,
      comment: "Good coffee but the wait time was a bit long during peak hours.",
      date: "2024-03-14",
      sentiment: "neutral",
    },
    {
      id: 3,
      customerName: "Lisa Thompson",
      rating: 2,
      comment: "The pastries were stale and the service was slow.",
      date: "2024-03-13",
      sentiment: "negative",
    },
  ];

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Feedback</h1>
          <p className="text-muted-foreground">
            Manage and respond to customer reviews and feedback.
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
                <DialogTitle>Filter Feedback</DialogTitle>
                <DialogDescription>
                  Filter feedback by date range and rating.
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
                <DialogTitle>Export Feedback</DialogTitle>
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

        <Card>
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

        <Card>
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

        <Card>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>
              Latest customer reviews and feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFeedback(feedback)}
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

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Feedback Trends</CardTitle>
            <CardDescription>
              Customer satisfaction over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Feedback trends chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Feedback</DialogTitle>
            <DialogDescription>
              Respond to customer feedback and address their concerns.
            </DialogDescription>
          </DialogHeader>
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
          <DialogFooter>
            <Button variant="outline" onClick={handleReplyCancel}>Cancel</Button>
            <Button onClick={() => setIsReplyOpen(false)}>Send Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 