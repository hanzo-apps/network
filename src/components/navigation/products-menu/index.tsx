import { productsNav, featuredProducts } from "@/constants/navigation-data";
import { Link } from "react-router-dom";
import NavMenu from "../NavMenu";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const ITEMS_PER_CATEGORY = 3;

export const ProductsMenu = () => {
  const { isDarkMode } = useTheme();

  return (
    <NavMenu label="Products">
      {(closeMenu) => (
        <div className="hz-w-full">
          {/* Featured Products Row */}
          <div className={cn(
            "hz-mb-4 hz-pb-4 hz-border-b",
            isDarkMode ? "" : "hz-border-strong"
          )}>
            <div className="hz-row hz-ai-center hz-gap-2 hz-mb-2">
              <Sparkles className="hz-sq-2 hz-fg" />
              <span className={cn(
                "hz-t-xs hz-w-medium hz-upper hz-tracking-wide",
                isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
              )}>Featured</span>
            </div>
            <div className="hz-row hz-wrap hz-gap-2">
              {featuredProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <Link
                    key={product.title}
                    to={product.href}
                    onClick={closeMenu}
                    className={cn(
                      "hz-btn hz-btn-ghost hz-gap-2 hz-transition",
                      isDarkMode
                        ? "hz-bg-surface hz-hoverable"
                        : "hz-bg-inverse hz-border-strong hz-hoverable"
                    )}
                  >
                    {Icon && <Icon className={cn(
                      "hz-sq-2 hz-hoverable",
                      isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
                    )} />}
                    <span className={cn(
                      "hz-t-sm hz-w-medium hz-hoverable",
                      isDarkMode ? "hz-fg-soft" : "hz-fg-faint"
                    )}>{product.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 9-Category Grid - Condensed to 3 items per category */}
          <div className="hz-grid hz-grid-6 hz-gap-5 hz-gap-4">
            {productsNav.map((section) => (
              <div key={section.title} className="hz-stack-2">
                <h3 className={cn(
                  "hz-t-xs hz-w-semibold hz-upper hz-tracking-wide hz-mb-2",
                  isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
                )}>
                  {section.title}
                </h3>
                <div className="hz-stack-1">
                  {section.items.slice(0, ITEMS_PER_CATEGORY).map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={closeMenu}
                        className="hz-row hz-ai-center hz-gap-2 hz-py-1"
                      >
                        {Icon && <Icon className={cn(
                          "hz-sq-1 hz-hoverable",
                          isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
                        )} />}
                        <span className={cn(
                          "hz-t-xs hz-transition hz-hoverable",
                          isDarkMode ? "hz-fg-muted" : "hz-fg-faint"
                        )}>
                          {item.title}
                        </span>
                      </Link>
                    );
                  })}
                  {section.items.length > ITEMS_PER_CATEGORY && (
                    <Link
                      to="/products"
                      onClick={closeMenu}
                      className={cn(
                        "hz-row hz-ai-center hz-gap-1 hz-py-1 hz-t-xs hz-transition hz-hoverable",
                        isDarkMode ? "hz-fg-faint" : "hz-fg-muted"
                      )}
                    >
                      +{section.items.length - ITEMS_PER_CATEGORY} more
                      <ArrowRight className="hz-sq-1" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer - More compact */}
          <div className={cn(
            "hz-mt-4 hz-pt-4 hz-border-t hz-row hz-ai-center hz-jc-between",
            isDarkMode ? "" : "hz-border-strong"
          )}>
            <div className="hz-row hz-ai-center hz-gap-3">
              <div className={cn(
                "hz-r-md hz-px-2 hz-py-1 hz-mono hz-t-xs",
                isDarkMode ? "hz-bg-surface hz-fg-muted" : "hz-bg-inverse hz-fg-muted"
              )}>
                curl -fsSL hanzo.sh | sh
              </div>
              <span className={cn(
                "hz-t-xs",
                isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
              )}>Install Hanzo CLI</span>
            </div>
            <div className="hz-row hz-gap-2">
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "hz-bh-5 hz-t-xs hz-px-3",
                  isDarkMode
                    ? "hz-bg-none hz-fg-soft hz-hoverable"
                    : "hz-bg-none hz-border-strong hz-fg-faint hz-link"
                )}
                asChild
              >
                <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                  GitHub
                </a>
              </Button>
              <Button
                size="sm"
                className="hz-bg-inverse hz-fg-inverse hz-bh-5 hz-t-xs hz-px-3 hz-hoverable"
                asChild
              >
                <Link to="/products" onClick={closeMenu}>
                  All Products
                  <ArrowRight className="hz-sq-1 hz-ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </NavMenu>
  );
};

export default ProductsMenu;
