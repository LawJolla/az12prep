"use client";

import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  price_min: number;
  price_max: number;
  price_varies: boolean;
  available: boolean;
  featured_image: string;
  thumbnail_image: string;
  url: string;
  options: {
    name: string;
    position: number;
    values: string[];
  }[];
}

interface ApiResponse {
  intent: string;
  products: Product[];
}

// Function to format price from cents to dollars
const formatPrice = (priceInCents: number) => {
  return `$${(priceInCents / 100).toFixed(2)}`;
};

// Function to get unique products (avoiding duplicates with different variants)
const getUniqueProducts = (products: Product[]) => {
  const uniqueProducts = new Map();
  
  products.forEach(product => {
    if (!uniqueProducts.has(product.title)) {
      uniqueProducts.set(product.title, product);
    }
  });
  
  return Array.from(uniqueProducts.values());
};

export function MerchandiseSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://az12-podcast-shop.fourthwall.com/api/recommendations?intent=complementary&currency=USD');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ApiResponse = await response.json();
        setProducts(getUniqueProducts(data.products));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative">
        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
            Official Merchandise
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium">
            Loading our latest collection...
          </p>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto px-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-stone-700 aspect-square rounded-lg mb-4"></div>
              <div className="bg-gray-200 dark:bg-stone-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 dark:bg-stone-700 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative">
        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
            Official Merchandise
          </h2>
          <p className="text-red-500 text-center text-balance font-medium">
            Unable to load merchandise. Please try again later.
          </p>
        </SectionHeader>
      </section>
    );
  }

  return (
    <section
      id="merch"
      className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          Official Merchandise
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          Show your support with our exclusive AZ12 collection
        </p>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto px-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="h-full flex min-h-0 flex-col bg-white dark:bg-stone-900 rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              {/* Product Image */}
              <div className="flex-none relative aspect-square overflow-hidden bg-gray-50 dark:bg-stone-800">
                <Image
                  src={product.featured_image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {!product.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 p-4 flex flex-col justify-between">
              
                <div className="flex-none">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-3">
                    {product.price_varies ? (
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price_min)} - {formatPrice(product.price_max)}
                      </span>
                    ) : (
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  {/* Options */}
                  {product.options.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {product.options.slice(0, 2).map((option) => (
                        <div key={option.name} className="text-sm">
                          <span className="font-medium text-muted-foreground">
                            {option.name}:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {option.values.slice(0, 4).map((value) => (
                              <span
                                key={value}
                                className="px-2 py-1 bg-gray-100 dark:bg-stone-800 text-xs rounded-md"
                              >
                                {value}
                              </span>
                            ))}
                            {option.values.length > 4 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-stone-800 text-xs rounded-md">
                                +{option.values.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buy Button */}
                <Button
                  className="w-full"
                  disabled={!product.available}
                  onClick={() => window.open(`https://az12-podcast-shop.fourthwall.com${product.url}`, '_blank')}
                >
                  {product.available ? 'Shop Now' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center mt-8"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.open('https://az12-podcast-shop.fourthwall.com', '_blank')}
          className="px-8"
        >
          View Full Collection
        </Button>
      </motion.div>
    </section>
  );
} 