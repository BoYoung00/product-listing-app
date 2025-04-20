export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: number;
}

export type ViewType = "grid" | "list";
