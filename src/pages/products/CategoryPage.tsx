import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CategoryPageTemplate } from "@/components/products/CategoryPageTemplate";
import {
  categories,
  getProductsByCategory,
  getMLSubcategories,
  type ProductCategory
} from "@/data/product-taxonomy";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  const products = getProductsByCategory(categoryId as ProductCategory);
  const subcategories = categoryId === 'ml' ? getMLSubcategories() : undefined;

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <div className="hz-pt-6">
        <CategoryPageTemplate
          category={category}
          products={products}
          subcategories={subcategories}
        />
      </div>
      <Footer />
    </div>
  );
}
