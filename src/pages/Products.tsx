import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Key,
  Search,
  HardDrive,
  FileJson,
  BarChart3,
  Boxes,
  Sparkles,
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
  UserCheck,
  KeyRound,
  Network,
  Globe,
  BarChart,
  ShoppingCart,
  MessageSquare,
  Workflow,
  LayoutDashboard,
  Cloud,
  Bot,
  Monitor,
  Image,
  Music,
  Video,
  TrendingUp,
  Headphones
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, allProducts, getProductsByCategory, ProductCategory } from "@/data/product-taxonomy";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Database,
  Cpu,
  Clock,
  Brain,
  Activity,
  Layers,
  LayoutGrid,
  Zap,
  Key,
  Search,
  HardDrive,
  FileJson,
  BarChart3,
  Boxes,
  Sparkles,
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
  UserCheck,
  KeyRound,
  Network,
  Globe,
  BarChart,
  ShoppingCart,
  MessageSquare,
  Workflow,
  LayoutDashboard,
  Cloud,
  Bot,
  Monitor,
  Image,
  Music,
  Video,
  TrendingUp,
  Headphones,
  HeadphonesIcon: Headphones
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="hz-p-2 hz-r-md hz-transition hz-hoverable"
      title="Copy to clipboard"
    >
      {copied ? <Check className="hz-sq-2 hz-fg-muted" /> : <Copy className="hz-sq-2 hz-fg-muted" />}
    </button>
  );
};

export default function Products() {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />

      {/* Hero Section */}
      <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
        <div className="hz-abs hz-inset" />
        <div className="hz-abs hz-inset" />

        <div className="hz-container-wide hz-rel hz-z-raised">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hz-align-center"
          >
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5">
              The Complete AI Infrastructure
            </h1>

            <p className="hz-t-xl hz-fg-muted hz-mb-5">
              The complete stack for AI-native applications.
            </p>

            <p className="hz-container-narrow hz-t-lg hz-fg-muted hz-mb-6">
              From databases to ML pipelines, serverless compute to observability.
              Everything you need to build, deploy, and scale AI applications.
            </p>

            {/* Quick Install */}
            <div className="hz-container-narrow hz-mw-md hz-card hz-mb-6">
              <p className="hz-t-sm hz-fg-muted hz-mb-3">Get started in seconds</p>
              <div className="hz-row hz-ai-center hz-jc-between hz-bg hz-r-lg hz-p-4 hz-mono">
                <code className="hz-fg-muted">curl -fsSL hanzo.sh/install.sh | sh</code>
                <CopyButton text="curl -fsSL hanzo.sh/install.sh | sh" />
              </div>
            </div>

            <div className="hz-col-row hz-gap-4 hz-jc-center">
              <Button
                size="lg"
                className="hz-bg-inverse hz-fg-inverse hz-hoverable"
                asChild
              >
                <Link to="/pricing">
                  Start Free
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
                  Documentation
                  <ExternalLink className="hz-sq-2 hz-ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="hz-py-7 hz-px-4 hz-border-t">
        <div className="hz-container-wide hz-align-center">
          <p className="hz-t-xs hz-upper hz-tracking-widest hz-fg-muted hz-mb-5">
            Trusted by teams at
          </p>
          <div className="hz-row hz-wrap hz-jc-center hz-ai-center hz-gap-6 hz-gap-4 hz-dim-more">
            <span className="hz-t-sm hz-w-medium hz-fg-muted">Techstars '17</span>
            <span className="hz-t-sm hz-w-medium hz-fg-muted">NVIDIA</span>
            <span className="hz-t-sm hz-w-medium hz-fg-muted">Google Cloud</span>
            <span className="hz-t-sm hz-w-medium hz-fg-muted">Nebius</span>
            <span className="hz-t-sm hz-w-medium hz-fg-muted">DigitalOcean</span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="hz-py-7 hz-px-4">
        <div className="hz-container-wide">
          <div className="hz-grid hz-grid-3 hz-gap-5">
            {categories.map((category, index) => {
              const IconComponent = iconMap[category.icon] || Database;
              const productCount = allProducts.filter(p => p.category === category.id).length;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={category.href}>
                    <Card className="hz-bg-surface hz-transition hz-h-full hz-pointer hz-hoverable">
                      <CardHeader>
                        <div className="hz-row hz-ai-start hz-jc-between">
                          <div className="hz-card hz-card-tight hz-transition hz-card-interactive">
                            <IconComponent className="hz-sq-4 hz-fg" />
                          </div>
                          <span className="hz-t-sm hz-fg-muted">
                            {productCount} products
                          </span>
                        </div>
                        <CardTitle className="hz-t-xl hz-mt-4 hz-transition hz-row hz-ai-center hz-gap-2 hz-hoverable">
                          {category.name}
                          <ArrowRight className="hz-sq-3 hz-invisible hz-transition" />
                        </CardTitle>
                        <CardDescription className="hz-fg-muted">
                          {category.tagline}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="hz-t-sm hz-fg-muted">
                          {category.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Products by Category */}
      {categories.map((category) => {
        const products = getProductsByCategory(category.id as ProductCategory);
        const CategoryIcon = iconMap[category.icon] || Database;

        return (
          <section key={category.id} className="hz-py-7 hz-px-4 hz-border-t">
            <div className="hz-container-wide">
              <div className="hz-row hz-ai-center hz-gap-3 hz-mb-6">
                <div className="hz-p-2 hz-r-lg hz-bg-quiet hz-bordered">
                  <CategoryIcon className="hz-sq-3 hz-fg" />
                </div>
                <div>
                  <h2 className="hz-t-2xl hz-w-bold">{category.name}</h2>
                  <p className="hz-t-sm hz-fg-muted">{category.tagline}</p>
                </div>
              </div>

              <div className="hz-grid hz-grid-4 hz-gap-4">
                {products.map((product, idx) => {
                  const ProductIcon = iconMap[product.icon] || Database;
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                    >
                      <Link to={product.href}>
                        <div className="hz-card hz-transition hz-h-full hz-card-interactive">
                          <div className="hz-row hz-ai-start hz-gap-3">
                            <div className="hz-p-2 hz-r-lg hz-bg-quiet hz-bordered hz-transition hz-hoverable">
                              <ProductIcon className="hz-sq-2 hz-fg-muted hz-transition hz-link" />
                            </div>
                            <div className="hz-grow">
                              <div className="hz-row hz-ai-center hz-gap-2">
                                <h3 className="hz-w-medium hz-t-sm hz-transition hz-truncate hz-hoverable">
                                  {product.shortName}
                                </h3>
                                {product.status === 'beta' && (
                                  <span className="hz-t-xs hz-px-2 hz-py-1 hz-r-md hz-bg-raised hz-fg-muted">beta</span>
                                )}
                                {product.status === 'coming' && (
                                  <span className="hz-t-xs hz-px-2 hz-py-1 hz-r-md hz-bg-raised hz-fg-muted">soon</span>
                                )}
                              </div>
                              <p className="hz-t-xs hz-fg-muted hz-mt-1 hz-clamp-2">
                                {product.tagline}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Zen Section */}
      <section className="hz-py-7 hz-px-4 hz-border-t hz-bg-surface">
        <div className="hz-container-narrow hz-align-center">
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Built on Zen
          </h2>
          <p className="hz-t-lg hz-fg-muted hz-mb-6">
            Our flagship MoDE architecture LLM powers intelligent features across all Hanzo products.
            Context-aware, efficient, and designed for developers.
          </p>
          <Button
            variant="outline"
            className="hz-hoverable"
            asChild
          >
            <Link to="/zen">
              Learn about Zen
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hz-py-7 hz-px-4 hz-border-t">
        <div className="hz-container-narrow hz-align-center">
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Ready to build?
          </h2>
          <p className="hz-t-lg hz-fg-muted hz-mb-6">
            Free tier for all products. No credit card required. Scale as you grow.
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

      <Footer />
    </div>
  );
}
