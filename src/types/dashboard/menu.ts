export interface MenuItem {
  id: string;
  imageUrl?: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  description?: string;
  dataAiHint?: string;
}
