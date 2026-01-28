import React from "react";
import { ProductsGrid } from "@/components/products/productsCard";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  tag?: string;
}
const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99,
    description: "Noise-cancelling, crystal-clear sound with 30h battery life.",
    tag: "Popular",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149,
    description: "Fitness tracking, heart rate monitoring, and notifications.",
    tag: "New",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 129,
    description: "RGB backlit keyboard with premium tactile switches.",
    tag: "Best Seller",
  },
];

export default function ProductsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Explore Products</h1>
        <p className="text-muted-foreground mt-2">
          Discover premium gadgets curated just for you
        </p>
      </div>
      <ProductsGrid products={products} />
    </div>
  );
}