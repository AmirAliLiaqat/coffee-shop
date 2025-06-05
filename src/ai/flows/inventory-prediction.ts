'use server';

/**
 * @fileOverview An AI agent that predicts optimal inventory levels based on historical sales data.
 *
 * - predictInventoryLevels - A function that handles the inventory prediction process.
 * - PredictInventoryLevelsInput - The input type for the predictInventoryLevels function.
 * - PredictInventoryLevelsOutput - The return type for the predictInventoryLevels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictInventoryLevelsInputSchema = z.object({
  historicalSalesData: z
    .string()
    .describe(
      'Historical sales data in CSV format with columns: date, item_name, quantity_sold.'
    ),
  leadTimeDays: z
    .number()
    .describe(
      'The number of days it takes for a new inventory order to arrive.'
    ),
  desiredServiceLevel: z
    .number()
    .describe(
      'The desired service level (probability of not stocking out) as a decimal between 0 and 1.  For example, 0.95 means a 95% service level.'
    ),
});
export type PredictInventoryLevelsInput = z.infer<
  typeof PredictInventoryLevelsInputSchema
>;

const PredictInventoryLevelsOutputSchema = z.object({
  predictedInventoryLevels: z.string().describe(
    'A JSON array of predicted inventory levels for each item, including the reorder point and order quantity.  The keys of the JSON objects are item_name, reorder_point, and order_quantity.'
  ),
  explanation: z
    .string()
    .describe(
      'A detailed explanation of how the inventory levels were calculated, including the model and assumptions used.'
    ),
});
export type PredictInventoryLevelsOutput = z.infer<
  typeof PredictInventoryLevelsOutputSchema
>;

export async function predictInventoryLevels(
  input: PredictInventoryLevelsInput
): Promise<PredictInventoryLevelsOutput> {
  return predictInventoryLevelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictInventoryLevelsPrompt',
  input: {schema: PredictInventoryLevelsInputSchema},
  output: {schema: PredictInventoryLevelsOutputSchema},
  prompt: `You are an expert inventory management consultant.

  You will use historical sales data to predict optimal inventory levels for a coffee shop, taking into account the lead time and desired service level.
  You will output a JSON array of predicted inventory levels for each item, including the reorder point and order quantity.
  You will also provide a detailed explanation of how the inventory levels were calculated, including the model and assumptions used.

  Historical Sales Data (CSV):
  {{historicalSalesData}}

  Lead Time (Days):
  {{leadTimeDays}}

  Desired Service Level:
  {{desiredServiceLevel}}
  `,
});

const predictInventoryLevelsFlow = ai.defineFlow(
  {
    name: 'predictInventoryLevelsFlow',
    inputSchema: PredictInventoryLevelsInputSchema,
    outputSchema: PredictInventoryLevelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
