"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { predictInventoryLevels, type PredictInventoryLevelsInput, type PredictInventoryLevelsOutput } from "@/ai/flows/inventory-prediction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const predictionSchema = z.object({
  historicalSalesData: z.string().min(10, "Historical sales data is required. Please provide CSV data."),
  leadTimeDays: z.coerce.number().min(0, "Lead time must be a non-negative number."),
  desiredServiceLevel: z.coerce.number().min(0.01).max(0.99, "Service level must be between 0.01 and 0.99."),
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

interface InventoryPredictionFormProps {
  className?: string;
}

export function InventoryPredictionForm({ className }: InventoryPredictionFormProps) {
  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      historicalSalesData: "date,item_name,quantity_sold\n2023-01-01,Coffee Beans,5\n2023-01-01,Milk,10\n2023-01-02,Coffee Beans,7\n2023-01-02,Milk,12",
      leadTimeDays: 7,
      desiredServiceLevel: 0.95,
    },
  });

  const [predictionResult, setPredictionResult] = useState<PredictInventoryLevelsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: PredictionFormValues) {
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);
    try {
      const result = await predictInventoryLevels(values as PredictInventoryLevelsInput);
      setPredictionResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
      console.error("Prediction error:", e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="font-headline">AI Inventory Prediction</CardTitle>
        <CardDescription>
          Predict optimal inventory levels based on historical sales data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="historicalSalesData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Sales Data (CSV)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="date,item_name,quantity_sold&#10;2023-01-01,Coffee Beans,5..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide data with columns: date, item_name, quantity_sold.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="leadTimeDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Time (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 7" {...field} />
                    </FormControl>
                    <FormDescription>Days for new inventory to arrive.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredServiceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Service Level (0.01-0.99)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="e.g., 0.95" {...field} />
                    </FormControl>
                    <FormDescription>Probability of not stocking out.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Predict Inventory
            </Button>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {predictionResult && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold font-headline">Prediction Results</h3>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-headline">Predicted Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(JSON.parse(predictionResult.predictedInventoryLevels), null, 2)}
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-headline">Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{predictionResult.explanation}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
