import { useState } from "react";
import { Menu, X, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenSearch?: () => void;
}

// Mobile navigation structure matching desktop
const mobileNav = [
  {
    title: "Explore",
    sections: [
      {
        title: "Quick Links",
        items: [
          { title: "All Products", href: "/products" },
          { title: "Hanzo Dev", href: "/dev" },
          { title: "AI & Models", href: "/ai" },
          { title: "Hanzo Cloud", href: "/cloud" },
        ]
      },
      {
        title: "Resources",
        items: [
          { title: "Documentation", href: "https://docs.hanzo.ai", external: true },
          { title: "Pricing", href: "/pricing" },
          { title: "Contact Sales", href: "/contact" },
          { title: "Status", href: "/status" },
        ]
      }
    ]
  },
  {
    title: "Meet Hanzo",
    sections: [
      {
        title: "Company",
        items: [
          { title: "Team", href: "/team" },
          { title: "Leadership", href: "/leadership" },
          { title: "Philosophy", href: "/philosophy" },
          { title: "Zen Models", href: "/zen" },
          { title: "Open Source", href: "/open-source" },
        ]
      },
      {
        title: "Connect",
        items: [
          { title: "Contact", href: "/contact" },
          { title: "Enterprise", href: "/enterprise" },
          { title: "Referrals", href: "/referrals" },
        ]
      },
      {
        title: "Trust",
        items: [
          { title: "Security", href: "/security" },
          { title: "Status", href: "/status" },
        ]
      }
    ]
  },
  {
    title: "Platform",
    sections: [
      {
        title: "Products",
        items: [
          { title: "Hanzo Dev", href: "/dev" },
          { title: "Hanzo Base", href: "/base" },
          { title: "AI & Models", href: "/ai" },
          { title: "Vector DB", href: "/vector" },
          { title: "Functions", href: "/functions" },
          { title: "Identity", href: "/identity" },
        ]
      },
      {
        title: "Infrastructure",
        items: [
          { title: "Hanzo Cloud", href: "/cloud" },
          { title: "Edge", href: "/edge" },
          { title: "Platform", href: "/platform" },
          { title: "Blockchain", href: "/blockchain" },
        ]
      }
    ]
  },
  {
    title: "Solutions",
    sections: [
      {
        title: "Use Cases",
        items: [
          { title: "AI Agents", href: "/solutions/capabilities" },
          { title: "Code Modernization", href: "/solutions/capabilities" },
          { title: "Customer Support", href: "/solutions/capabilities" },
        ]
      },
      {
        title: "Industries",
        items: [
          { title: "Financial Services", href: "/solutions/industries" },
          { title: "Healthcare", href: "/solutions/industries" },
          { title: "Enterprise", href: "/enterprise" },
        ]
      }
    ]
  },
  {
    title: "Pricing",
    href: "/pricing"
  },
  {
    title: "Learn",
    sections: [
      {
        title: "Documentation",
        items: [
          { title: "Docs", href: "https://docs.hanzo.ai", external: true },
          { title: "Tutorials", href: "https://docs.hanzo.ai/tutorials", external: true },
          { title: "API Reference", href: "https://docs.hanzo.ai/api", external: true },
        ]
      },
      {
        title: "Community",
        items: [
          { title: "GitHub", href: "https://github.com/hanzoai", external: true },
          { title: "Discord", href: "https://discord.gg/hanzo", external: true },
          { title: "Blog", href: "/blog" },
        ]
      }
    ]
  }
];

export const MobileMenu = ({ isOpen, onToggle, onOpenSearch }: MobileMenuProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleLinkClick = () => {
    onToggle();
  };

  return (
    <>
      <div className="hz-mobile-only hz-row hz-ai-center hz-gap-2">
        {/* Search button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSearch}
          className="hz-fg-muted hz-link"
        >
          <Search className="hz-sq-3" />
        </Button>

        {/* Menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hz-fg"
        >
          {isOpen ? <X className="hz-sq-4" /> : <Menu className="hz-sq-4" />}
        </Button>
      </div>

      {isOpen && (
        <div className="hz-mobile-only hz-fixed hz-inset hz-z-overlay">
          <div className="hz-fixed hz-inset hz-bg-surface hz-glass" onClick={onToggle} />

          <div className="hz-fixed hz-inset hz-w-full hz-bg hz-h-screen hz-scroll-y">
            {/* Search / Command palette widget at top */}
            <div className="hz-px-4 hz-pt-4 hz-pb-4">
              <button
                onClick={() => {
                  onToggle();
                  onOpenSearch?.();
                }}
                className="hz-btn hz-btn-block hz-gap-3 hz-fg-muted hz-transition"
              >
                <Search className="hz-sq-3" />
                <span className="hz-grow hz-align-left hz-t-sm">Search docs, products, pages...</span>
                <kbd className="hz-inline hz-ai-center hz-gap-1 hz-px-2 hz-py-1 hz-t-xs hz-mono hz-bg-raised hz-bordered hz-r-md hz-fg-muted">
                  <span className="hz-t-xs">⌘</span>K
                </kbd>
              </button>
            </div>

            <div className="hz-px-4 hz-py-4 hz-stack-1">
              {mobileNav.map((item) => (
                <div key={item.title} className="hz-border-b hz-pb-4 hz-mb-2">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="hz-px-3 hz-py-2 hz-t-base hz-w-medium hz-fg-soft hz-r-lg hz-transition hz-hoverable"
                      onClick={handleLinkClick}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="hz-btn hz-btn-ghost hz-btn-block hz-jc-between hz-fg-soft hz-transition"
                        onClick={() => toggleSection(item.title)}
                      >
                        {item.title}
                        <ChevronRight className={cn(
                          "hz-sq-2 hz-transition",
                          expandedSections[item.title] && ""
                        )} />
                      </button>

                      {expandedSections[item.title] && item.sections && (
                        <div className="hz-mt-2 hz-ml-2 hz-stack-4 hz-bg-surface hz-r-lg hz-p-3">
                          {item.sections.map((section) => (
                            <div key={section.title}>
                              <div className="hz-px-2 hz-py-1 hz-t-xs hz-w-medium hz-fg-muted hz-upper hz-tracking-wide">
                                {section.title}
                              </div>
                              <div className="hz-stack-1 hz-mt-1">
                                {section.items.map((subItem) => (
                                  subItem.external ? (
                                    <a
                                      key={subItem.title}
                                      href={subItem.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hz-px-2 hz-py-2 hz-t-sm hz-fg-muted hz-r-md hz-transition hz-link"
                                      onClick={handleLinkClick}
                                    >
                                      {subItem.title}
                                    </a>
                                  ) : (
                                    <Link
                                      key={subItem.title}
                                      to={subItem.href}
                                      className="hz-px-2 hz-py-2 hz-t-sm hz-fg-muted hz-r-md hz-transition hz-link"
                                      onClick={handleLinkClick}
                                    >
                                      {subItem.title}
                                    </Link>
                                  )
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom buttons */}
            <div className="hz-px-4 hz-py-4 hz-stack-3 hz-border-t">
              <Link to="/contact" onClick={handleLinkClick}>
                <Button variant="ghost" className="hz-w-full hz-fg-soft hz-jc-center hz-hoverable">
                  Contact sales
                </Button>
              </Link>
              <a
                href="https://cloud.hanzo.ai"
                className="hz-w-full hz-bg-inverse hz-fg-inverse hz-r-full hz-bh-6 hz-row hz-ai-center hz-jc-center hz-t-sm hz-w-medium hz-transition hz-hoverable"
              >
                Try Hanzo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
