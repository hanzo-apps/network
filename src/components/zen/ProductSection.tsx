
import React from "react";
import { motion } from "framer-motion";

interface Product {
  name: string;
  description: string;
}

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  bgClass?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  bgClass = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`hz-r-lg ${bgClass} hz-p-6 hz-glass hz-bordered`}
    >
      <h3 className="hz-t-2xl hz-w-bold hz-mb-2">{title}</h3>
      {subtitle && <p className="hz-fg-soft hz-mb-5">{subtitle}</p>}
      
      <div className="hz-grid hz-grid-3 hz-gap-4">
        {products.map((product, index) => {
          // Handle products in format "Name – Description"
          let name, description;
          if (product.description.includes(" – ")) {
            [name, description] = product.description.split(" – ");
          } else {
            name = product.name;
            description = product.description;
          }
          
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <h4 className="hz-t-lg hz-w-semibold hz-fg-muted hz-mb-1">{name}</h4>
              <p className="hz-fg-soft hz-t-sm">{description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProductSection;
