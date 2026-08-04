import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductPageTemplate } from "@/components/products/ProductPageTemplate";
import { getProduct } from "@/data/product-taxonomy";

export default function ProductPage() {
  const { categoryId, productId } = useParams<{ categoryId: string; productId: string }>();

  const product = getProduct(productId || '');

  if (!product || product.category !== categoryId) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <div className="hz-pt-6">
        <ProductPageTemplate product={product} />
      </div>
      <Footer />
    </div>
  );
}
