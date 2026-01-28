'use client'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  tag?: string;
}




function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="rounded-2xl shadow-sm hover:shadow-xl transition-all">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            {product.tag && <Badge variant="secondary">{product.tag}</Badge>}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {product.description}
          </p>
          <p className="text-xl font-bold">${product.price}</p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button className="flex-1 gap-2">
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
          <Button size="icon" variant="outline">
            <Heart size={16} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}


