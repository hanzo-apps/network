import { capabilitiesNav, industriesNav } from "@/constants/navigation-data";
import { Link } from "react-router-dom";
import NavMenu from "../NavMenu";
import { Users, Shield, Building2, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const ITEMS_PER_CATEGORY = 4;

export const SolutionsMenu = () => {
  const { isDarkMode } = useTheme();

  return (
    <NavMenu label="Solutions">
      {(closeMenu) => (
        <div className="hz-w-full">
          {/* Featured Row */}
          <div className={cn(
            "hz-mb-4 hz-pb-4 hz-border-b",
            isDarkMode ? "" : "hz-border-strong"
          )}>
            <div className="hz-row hz-ai-center hz-gap-2 hz-mb-2">
              <Sparkles className="hz-sq-2 hz-fg" />
              <span className={cn(
                "hz-t-xs hz-w-medium hz-upper hz-tracking-wide",
                isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
              )}>Featured Solutions</span>
            </div>
            <div className="hz-row hz-wrap hz-gap-2">
              <Link
                to="/agency"
                onClick={closeMenu}
                className={cn(
                  "hz-btn hz-btn-ghost hz-gap-2 hz-transition",
                  isDarkMode
                    ? "hz-bg-surface hz-hoverable"
                    : "hz-bg-inverse hz-border-strong hz-hoverable"
                )}
              >
                <Shield className={cn(
                  "hz-sq-2 hz-hoverable",
                  isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
                )} />
                <span className={cn(
                  "hz-t-sm hz-w-medium hz-hoverable",
                  isDarkMode ? "hz-fg-soft" : "hz-fg-faint"
                )}>Hanzo Agency</span>
              </Link>
              <Link
                to="/enterprise"
                onClick={closeMenu}
                className={cn(
                  "hz-btn hz-btn-ghost hz-gap-2 hz-transition",
                  isDarkMode
                    ? "hz-bg-surface hz-hoverable"
                    : "hz-bg-inverse hz-border-strong hz-hoverable"
                )}
              >
                <Building2 className={cn(
                  "hz-sq-2 hz-hoverable",
                  isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
                )} />
                <span className={cn(
                  "hz-t-sm hz-w-medium hz-hoverable",
                  isDarkMode ? "hz-fg-soft" : "hz-fg-faint"
                )}>Enterprise</span>
              </Link>
            </div>
          </div>

          {/* Two Column Grid - Capabilities & Industries */}
          <div className="hz-grid hz-grid-4 hz-gap-5 hz-gap-4">
            {/* Capabilities */}
            <div className="hz-stack-2">
              <h3 className={cn(
                "hz-t-xs hz-w-semibold hz-upper hz-tracking-wide hz-mb-2",
                isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
              )}>
                Capabilities
              </h3>
              <div className="hz-stack-1">
                {capabilitiesNav[0].items.slice(0, ITEMS_PER_CATEGORY).map((item) => {
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
                {capabilitiesNav[0].items.length > ITEMS_PER_CATEGORY && (
                  <Link
                    to="/solutions"
                    onClick={closeMenu}
                    className={cn(
                      "hz-row hz-ai-center hz-gap-1 hz-py-1 hz-t-xs hz-transition hz-hoverable",
                      isDarkMode ? "hz-fg-faint" : "hz-fg-muted"
                    )}
                  >
                    +{capabilitiesNav[0].items.length - ITEMS_PER_CATEGORY} more
                    <ArrowRight className="hz-sq-1" />
                  </Link>
                )}
              </div>
            </div>

            {/* Industries - split into two columns */}
            <div className="hz-stack-2">
              <h3 className={cn(
                "hz-t-xs hz-w-semibold hz-upper hz-tracking-wide hz-mb-2",
                isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
              )}>
                Industries
              </h3>
              <div className="hz-stack-1">
                {industriesNav[0].items.slice(0, ITEMS_PER_CATEGORY).map((item) => {
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
                {industriesNav[0].items.length > ITEMS_PER_CATEGORY && (
                  <Link
                    to="/industries"
                    onClick={closeMenu}
                    className={cn(
                      "hz-row hz-ai-center hz-gap-1 hz-py-1 hz-t-xs hz-transition hz-hoverable",
                      isDarkMode ? "hz-fg-faint" : "hz-fg-muted"
                    )}
                  >
                    +{industriesNav[0].items.length - ITEMS_PER_CATEGORY} more
                    <ArrowRight className="hz-sq-1" />
                  </Link>
                )}
              </div>
            </div>

            {/* More Industries */}
            <div className="hz-stack-2">
              <h3 className={cn(
                "hz-t-xs hz-w-semibold hz-upper hz-tracking-wide hz-mb-2",
                isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
              )}>
                More Industries
              </h3>
              <div className="hz-stack-1">
                {industriesNav[0].items.slice(ITEMS_PER_CATEGORY, ITEMS_PER_CATEGORY * 2).map((item) => {
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
              </div>
            </div>

            {/* Use Cases */}
            <div className="hz-stack-2">
              <h3 className={cn(
                "hz-t-xs hz-w-semibold hz-upper hz-tracking-wide hz-mb-2",
                isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
              )}>
                Use Cases
              </h3>
              <div className="hz-stack-1">
                <Link
                  to="/solutions/automation"
                  onClick={closeMenu}
                  className="hz-row hz-ai-center hz-gap-2 hz-py-1"
                >
                  <span className={cn(
                    "hz-t-xs hz-transition hz-hoverable",
                    isDarkMode ? "hz-fg-muted" : "hz-fg-faint"
                  )}>
                    Automation
                  </span>
                </Link>
                <Link
                  to="/solutions/analytics"
                  onClick={closeMenu}
                  className="hz-row hz-ai-center hz-gap-2 hz-py-1"
                >
                  <span className={cn(
                    "hz-t-xs hz-transition hz-hoverable",
                    isDarkMode ? "hz-fg-muted" : "hz-fg-faint"
                  )}>
                    Analytics
                  </span>
                </Link>
                <Link
                  to="/solutions/content"
                  onClick={closeMenu}
                  className="hz-row hz-ai-center hz-gap-2 hz-py-1"
                >
                  <span className={cn(
                    "hz-t-xs hz-transition hz-hoverable",
                    isDarkMode ? "hz-fg-muted" : "hz-fg-faint"
                  )}>
                    Content Generation
                  </span>
                </Link>
                <Link
                  to="/solutions/customer-support"
                  onClick={closeMenu}
                  className="hz-row hz-ai-center hz-gap-2 hz-py-1"
                >
                  <span className={cn(
                    "hz-t-xs hz-transition hz-hoverable",
                    isDarkMode ? "hz-fg-muted" : "hz-fg-faint"
                  )}>
                    Customer Support
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={cn(
            "hz-mt-4 hz-pt-4 hz-border-t hz-row hz-ai-center hz-jc-between",
            isDarkMode ? "" : "hz-border-strong"
          )}>
            <div className="hz-row hz-ai-center hz-gap-3">
              <span className={cn(
                "hz-t-xs",
                isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
              )}>Need custom solutions?</span>
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
                <Link to="/contact" onClick={closeMenu}>
                  Contact Sales
                </Link>
              </Button>
              <Button
                size="sm"
                className="hz-bg-inverse hz-fg-inverse hz-bh-5 hz-t-xs hz-px-3 hz-hoverable"
                asChild
              >
                <Link to="/solutions" onClick={closeMenu}>
                  All Solutions
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

export default SolutionsMenu;