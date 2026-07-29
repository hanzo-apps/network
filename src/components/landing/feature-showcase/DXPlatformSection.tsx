
import React from "react";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";
import ViewAllButton from "./ViewAllButton";
import { ProductItem } from "@/components/navigation/products-menu/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DXPlatformSectionProps {
  products: ProductItem[];
}

const DXPlatformSection: React.FC<DXPlatformSectionProps> = ({ products }) => {
  return (
    <div className="hz-mb-7">
      <SectionHeader
        badge="DX Platform"
        badgeColor="bg-neutral-800/30 border border-neutral-500/30 text-neutral-300"
        title="Developer Experience Tools for AI Engineering"
        description="Supercharge your AI development workflow with purpose-built tools for engineers."
      />

      {/* Desktop layout - Carousel for larger screens */}
      <div className="hz-desktop-only hz-rel hz-mb-6">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="hz-w-full"
        >
          <CarouselContent className="hz-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={index} className="hz-px-4">
                <div className="hz-h-full">
                  <ProductCard
                    icon={<product.icon className="hz-fg-muted" />}
                    title={product.name}
                    description={product.description}
                    color="bg-neutral-800/30"
                    hoverColor="bg-neutral-600/40"
                    link={product.link || "#"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hz-desktop-only hz-row hz-ai-center hz-jc-end hz-gap-2 hz-mt-5">
            <CarouselPrevious className="hz-rel hz-bg-raised hz-hoverable" />
            <CarouselNext className="hz-rel hz-bg-raised hz-hoverable" />
          </div>
        </Carousel>
      </div>

      {/* Mobile layout - Scrollable horizontal list for smaller screens */}
      <div className="hz-mobile-only hz-mb-6">
        <ScrollArea className="hz-w-full hz-whitespace-nowrap">
          <div className="hz-row hz-inline-4 hz-pb-4 hz-px-1">
            {products.map((product, index) => (
              <div key={index} className="hz-none">
                <ProductCard
                  icon={<product.icon className="hz-fg-muted" />}
                  title={product.name}
                  description={product.description}
                  color="bg-neutral-800/30"
                  hoverColor="bg-neutral-600/40"
                  link={product.link || "#"}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <ViewAllButton 
        href="/platform"
        text="View all DX Platform tools"
        hoverColor="purple"
      />
    </div>
  );
};

export default DXPlatformSection;
