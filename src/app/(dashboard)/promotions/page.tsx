"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag, Calendar, Users, TrendingUp, PlusCircle, X } from "lucide-react";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Promotion {
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  usage: number;
}

interface NewPromotion {
  name: string;
  description: string;
  type: string;
  discount: string;
  startDate: string;
  endDate: string;
}

const activePromotions: Promotion[] = [
  {
    id: 1,
    name: "Happy Hour",
    description: "20% off all drinks from 3-5 PM",
    type: "Time-based",
    status: "Active",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    usage: 234,
  },
  {
    id: 2,
    name: "Student Discount",
    description: "15% off with valid student ID",
    type: "Customer Group",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usage: 567,
  },
  {
    id: 3,
    name: "Buy One Get One",
    description: "Buy any coffee, get one free",
    type: "Product",
    status: "Active",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    usage: 123,
  },
];

export default function PromotionsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [newPromotion, setNewPromotion] = useState<NewPromotion>({
    name: "",
    description: "",
    type: "discount",
    discount: "",
    startDate: "",
    endDate: "",
  });

  const handleCancel = () => {
    setIsDialogOpen(false);
    // Reset form
    setNewPromotion({
      name: "",
      description: "",
      type: "discount",
      discount: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleViewDetails = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight animate-slideDown">Promotions</h1>
          <p className="text-sm sm:text-base text-muted-foreground animate-fadeIn delay-100">
            Manage special offers and discounts for your customers.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsDialogOpen(true)} className="hover:scale-105 transition-transform duration-200">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Promotion
          </Button>
        </div>

        <SharedDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="Create New Promotion"
          description="Add a new promotion or special offer for your customers."
          onSubmit={() => setIsDialogOpen(false)}
          submitText="Create Promotion"
          onClose={handleCancel}
          size="lg"
          cancelText="Cancel"
          className="animate-scaleIn"
        >
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Promotion Name</Label>
              <Input
                id="name"
                value={newPromotion.name}
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newPromotion.description}
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Promotion Type</Label>
              <Select
                value={newPromotion.type}
                onValueChange={(value) =>
                  setNewPromotion({ ...newPromotion, type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Discount</SelectItem>
                  <SelectItem value="bogo">Buy One Get One</SelectItem>
                  <SelectItem value="combo">Combo Deal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newPromotion.type === "discount" && (
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Amount</Label>
                <Input
                  id="discount"
                  value={newPromotion.discount}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, discount: e.target.value })
                  }
                  placeholder="e.g., 20% or $5"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newPromotion.startDate}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, startDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newPromotion.endDate}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </SharedDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-slideUp">
        <Card className="animate-fadeIn">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePromotions.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently running promotions
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn delay-75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn delay-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Within 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 animate-slideUp">
        <Card className="col-span-1 lg:col-span-4 animate-fadeIn delay-200">
          <CardHeader>
            <CardTitle>Active Promotions</CardTitle>
            <CardDescription>
              Currently running promotions and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activePromotions.map((promo, index) => (
                <div
                  key={promo.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg animate-fadeIn"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="space-y-1 mb-4 sm:mb-0">
                    <h4 className="font-medium">{promo.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {promo.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {promo.type}
                      </span>
                      <span className="text-muted-foreground">
                        {promo.startDate} - {promo.endDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <div className="text-sm font-medium">{promo.usage} redemptions</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(promo)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 animate-fadeIn delay-250">
          <CardHeader>
            <CardTitle>Promotion History</CardTitle>
            <CardDescription>
              Performance metrics for past promotions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Performance chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <SharedDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        title={selectedPromotion?.name || "Promotion Details"}
        description="Promotion details and performance metrics"
        onSubmit={() => setIsDetailsDialogOpen(false)}
        submitText="Close"
        onClose={() => setIsDetailsDialogOpen(false)}
        size="lg"
        className="animate-scaleIn"
      >
        {selectedPromotion && (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Description</Label>
              <p className="text-sm text-muted-foreground">{selectedPromotion.description}</p>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <p className="text-sm text-muted-foreground">{selectedPromotion.type}</p>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <p className="text-sm text-muted-foreground">{selectedPromotion.status}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <p className="text-sm text-muted-foreground">{selectedPromotion.startDate}</p>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <p className="text-sm text-muted-foreground">{selectedPromotion.endDate}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Total Usage</Label>
              <p className="text-sm text-muted-foreground">{selectedPromotion.usage} redemptions</p>
            </div>
          </div>
        )}
      </SharedDialog>
    </div>
  );
} 