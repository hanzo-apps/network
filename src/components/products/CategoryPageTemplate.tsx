import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  Cpu,
  Clock,
  Brain,
  Activity,
  Layers,
  LayoutGrid,
  Key,
  Search,
  HardDrive,
  FileJson,
  BarChart3,
  Boxes,
  Shield,
  ListTodo,
  ListOrdered,
  Radio,
  BookOpen,
  GitBranch,
  Dumbbell,
  SlidersHorizontal,
  Rocket,
  Archive,
  CheckCircle,
  LineChart,
  ScrollText,
  Route,
  PieChart,
  Network,
  UserCheck,
  KeyRound,
  ShoppingCart,
  MessageSquare,
  Workflow,
  LayoutDashboard,
  Cloud,
  Zap,
  Sparkles,
  ExternalLink,
  Globe,
  Bot,
  Monitor,
  Image,
  Music,
  Video
} from "lucide-react";
import type { Product, CategoryInfo } from "@/data/product-taxonomy";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Database, Cpu, Clock, Brain, Activity, Layers, LayoutGrid, Key, Search,
  HardDrive, FileJson, BarChart3, Boxes, Shield, ListTodo, ListOrdered,
  Radio, BookOpen, GitBranch, Dumbbell, SlidersHorizontal, Rocket, Archive,
  CheckCircle, LineChart, ScrollText, Route, PieChart, Network, UserCheck,
  KeyRound, ShoppingCart, MessageSquare, Workflow, LayoutDashboard, Cloud,
  Zap, Sparkles, Globe, Bot, Monitor, Image, Music, Video
};

interface CategoryPageTemplateProps {
  category: CategoryInfo;
  products: Product[];
  subcategories?: string[];
}

const StatusBadge = ({ status }: { status: Product['status'] }) => {
  const variants = {
    ga: { label: 'GA', className: 'hz-bg-raised hz-fg-muted hz-border-strong' },
    beta: { label: 'Beta', className: 'hz-bg-raised hz-fg-muted hz-border-strong' },
    alpha: { label: 'Alpha', className: 'hz-bg-raised hz-fg-muted hz-border-strong' },
    coming: { label: 'Coming Soon', className: 'hz-bg-raised hz-fg-muted hz-border-strong' }
  };
  return (
    <Badge variant="outline" className={`${variants[status].className} hz-t-xs`}>
      {variants[status].label}
    </Badge>
  );
};

export const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({
  category,
  products,
  subcategories
}) => {
  const CategoryIcon = iconMap[category.icon] || Database;

  // Group products by subcategory if applicable
  const groupedProducts = subcategories
    ? subcategories.reduce((acc, sub) => {
        acc[sub] = products.filter(p => p.subcategory === sub);
        return acc;
      }, {} as Record<string, Product[]>)
    : { all: products };

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      {/* Hero Section */}
      <section className="hz-rel hz-py-7 hz-px-4 hz-clip">
        <div className="hz-abs hz-inset" />
        <div className="hz-abs hz-inset" />

        <div className="hz-container-wide hz-rel hz-z-raised">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hz-align-center"
          >
            <div className="hz-row hz-ai-center hz-jc-center hz-gap-3 hz-mb-5">
              <div className="hz-card">
                <CategoryIcon className="hz-sq-6 hz-fg" />
              </div>
            </div>

            <h1 className="hz-t-4xl hz-w-bold hz-mb-4">
              Hanzo {category.name}
            </h1>

            <p className="hz-t-xl hz-fg-muted hz-mb-5">
              {category.tagline}
            </p>

            <p className="hz-container-narrow hz-t-lg hz-fg-muted hz-mb-6">
              {category.description}
            </p>

            <div className="hz-col-row hz-gap-4 hz-jc-center">
              <Button
                size="lg"
                className="hz-bg-inverse hz-fg-inverse hz-hoverable"
                asChild
              >
                <Link to="/pricing">
                  Get Started Free
                  <ArrowRight className="hz-sq-3 hz-ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hz-hoverable"
                asChild
              >
                <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer">
                  View Documentation
                  <ExternalLink className="hz-sq-2 hz-ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="hz-py-7 hz-px-4 hz-border-t">
        <div className="hz-container-wide">
          {subcategories ? (
            // Render grouped by subcategory (for ML products)
            subcategories.map((subcategory, subIndex) => {
              const subProducts = groupedProducts[subcategory] || [];
              if (subProducts.length === 0) return null;

              return (
                <div key={subcategory} className="hz-mb-7">
                  <h2 className="hz-t-2xl hz-w-bold hz-mb-2">{subcategory}</h2>
                  <p className="hz-fg-muted hz-mb-6">
                    {getSubcategoryDescription(subcategory)}
                  </p>

                  <div className="hz-grid hz-grid-3 hz-gap-5">
                    {subProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={subIndex * 10 + index}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Render flat grid
            <div className="hz-grid hz-grid-3 hz-gap-5">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="hz-py-7 hz-px-4 hz-border-t hz-bg-surface">
        <div className="hz-container-narrow hz-align-center">
          <h2 className="hz-t-2xl hz-w-bold hz-mb-5">Quick Start</h2>
          <p className="hz-fg-muted hz-mb-6">
            Install the Hanzo CLI to get started with any {category.name} product
          </p>

          <div className="hz-container-narrow hz-mw-md hz-bg hz-r-lg hz-p-5">
            <div className="hz-row hz-ai-center hz-jc-between hz-mono hz-t-sm">
              <code className="hz-fg-muted">curl -fsSL hanzo.sh/install.sh | sh</code>
              <Button variant="ghost" size="sm" className="hz-fg-muted hz-link">
                Copy
              </Button>
            </div>
          </div>

          <p className="hz-fg-muted hz-mt-5 hz-t-sm">
            Then run <code className="hz-bg-raised hz-px-2 hz-py-1 hz-r-md">hanzo --help</code> to see available commands
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hz-py-7 hz-px-4 hz-border-t">
        <div className="hz-container-narrow hz-align-center">
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Build with Hanzo {category.name}
          </h2>
          <p className="hz-t-lg hz-fg-muted hz-mb-6">
            Open source, self-hostable, and available on Hanzo Cloud.
          </p>
          <div className="hz-col-row hz-gap-4 hz-jc-center">
            <Button
              size="lg"
              className="hz-bg-inverse hz-fg-inverse hz-hoverable"
              asChild
            >
              <Link to="/pricing">
                Start Building
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hz-hoverable"
              asChild
            >
              <Link to="/contact">
                Talk to Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const IconComponent = iconMap[product.icon] || Database;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={product.href}>
        <Card className="hz-bg-surface hz-transition hz-h-full hz-pointer hz-hoverable">
          <CardHeader>
            <div className="hz-row hz-ai-start hz-jc-between">
              <div className="hz-p-2 hz-r-lg hz-bg-quiet hz-bordered hz-transition hz-hoverable">
                <IconComponent className="hz-sq-3 hz-fg" />
              </div>
              <StatusBadge status={product.status} />
            </div>
            <CardTitle className="hz-t-lg hz-mt-4 hz-transition hz-row hz-ai-center hz-gap-2 hz-hoverable">
              {product.shortName}
              <ArrowRight className="hz-sq-2 hz-invisible hz-transition" />
            </CardTitle>
            <CardDescription className="hz-fg-muted">
              {product.tagline}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="hz-t-sm hz-fg-muted hz-clamp-2">
              {product.description}
            </p>

            <div className="hz-row hz-wrap hz-gap-2 hz-mt-4">
              {product.features.slice(0, 3).map((feature) => (
                <Badge
                  key={feature}
                  variant="outline"
                  className="hz-bg-raised hz-fg-muted hz-t-xs"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

// Helper function for ML subcategory descriptions
function getSubcategoryDescription(subcategory: string): string {
  const descriptions: Record<string, string> = {
    'Models': 'Foundation models for language, vision, audio, video, and 3D generation',
    'Develop': 'Interactive environments for experimentation and iteration',
    'Orchestrate': 'Reproducible pipelines and artifact management',
    'Train': 'Distributed training and job management',
    'Tune': 'Hyperparameter search and AutoML',
    'Serve': 'Production inference and rollout',
    'Manage': 'Model governance and lifecycle metadata',
    'Features': 'Online and offline feature serving',
    'Evaluate': 'Quality assessment and drift detection'
  };
  return descriptions[subcategory] || '';
}

export default CategoryPageTemplate;
