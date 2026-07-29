
import { Link } from "react-router-dom";
import { ProductItem } from "./types";
import { useState } from "react";

interface ProductGridProps {
  items: ProductItem[];
}

const ProductGrid = ({ items }: ProductGridProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="hz-grid hz-grid-2 hz-gap-4 hz-scroll-y hz-px-2">
      {items.map((item) => (
        <div
          key={item.name}
          className="hz-row hz-ai-start hz-inline-3"
          onMouseEnter={() => setHoveredItem(item.name)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <item.icon 
            className={`hz-sq-4 hz-mt-1 hz-transition ${
              hoveredItem === item.name ? 'hz-fg-muted' : 'hz-fg-muted hz-link'
            }`} 
          />
          <div className="hz-grow">
            <Link to={item.link} className="hz-fg-soft hz-w-medium hz-hoverable">
              {item.name}
            </Link>
            <div className="hz-t-sm hz-fg-muted">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
