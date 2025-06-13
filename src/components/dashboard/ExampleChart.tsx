"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ExampleChartProps {
  data: any[];
  title: string;
  description?: string;
  dataKeyX: string;
  dataKeyY: string;
  fillColor?: string; // CSS variable like "var(--chart-1)"
}

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


export function ExampleChart({ data, title, description, dataKeyX, dataKeyY, fillColor = "hsl(var(--chart-1))" }: ExampleChartProps) {

  const dynamicChartConfig = {
    [dataKeyY]: {
      label: dataKeyY.charAt(0).toUpperCase() + dataKeyY.slice(1), // Capitalize first letter
      color: fillColor,
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="font-headline text-lg sm:text-xl">{title}</CardTitle>
        {description && <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={dynamicChartConfig} className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={dataKeyX}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                fontSize={12}
                tick={{ fontSize: '0.75rem' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tick={{ fontSize: '0.75rem' }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Legend
                wrapperStyle={{
                  fontSize: '0.75rem',
                  paddingTop: '0.5rem'
                }}
              />
              <Bar dataKey={dataKeyY} fill={fillColor} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
