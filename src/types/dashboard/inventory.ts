export interface InventoryItem {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  supplier?: string;
  lowStockThreshold?: number;
}
