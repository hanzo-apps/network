import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  Github,
  BookOpen,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Zap,
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
  BookOpen as Notebook,
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
  Globe,
  Bot,
  Monitor,
  Image,
  Music,
  Video
} from "lucide-react";
import type { Product, ProductCategory } from "@/data/product-taxonomy";
import { getProductsByCategory } from "@/data/product-taxonomy";
import { GridLines, BlueprintLine, ArchitecturalBox } from "@/components/ui/architectural-elements";
import { ProductMockup } from "./ProductMockup";
import { UpstreamAttribution } from "./UpstreamAttribution";
import { CodeExamplesSection } from "./CodeExamplesSection";
import { CommunitySection } from "./CommunitySection";
import { SDKSection } from "./SDKSection";
import {
  getUpstreamForProduct,
  getCodeExamplesForProduct,
  getCommunityForProduct,
  hanzoSDKs,
} from "@/data/upstream-projects";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
  BookOpen: Notebook,
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
  Globe,
  Bot,
  Monitor,
  Image,
  Music,
  Video
};

interface ProductPageTemplateProps {
  product: Product;
  children?: React.ReactNode;
}

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

const StatusBadge = ({ status }: { status: Product['status'] }) => {
  const variants = {
    ga: { label: 'GA', className: 'hz-bg-raised hz-fg-muted hz-border-strong' },
    beta: { label: 'Beta', className: 'hz-bg-raised hz-fg-muted hz-border-strong' },
    alpha: { label: 'Alpha', className: 'hz-bg-raised hz-fg-muted hz-border-strong' },
    coming: { label: 'Coming Soon', className: 'hz-bg-raised hz-fg-muted hz-border-strong' }
  };

  const variant = variants[status];

  return (
    <Badge variant="outline" className={variant.className}>
      {variant.label}
    </Badge>
  );
};

const PricingBadge = ({ pricing }: { pricing?: Product['pricing'] }) => {
  if (!pricing) return null;

  const variants = {
    free: { label: 'Free', className: 'hz-bg-raised hz-fg-muted hz-border-strong' },
    freemium: { label: 'Free Tier', className: 'hz-bg-raised hz-fg-muted hz-border-strong' },
    paid: { label: 'Paid', className: 'hz-bg-raised hz-fg-muted hz-border-strong' }
  };

  const variant = variants[pricing];

  return (
    <Badge variant="outline" className={variant.className}>
      {variant.label}
    </Badge>
  );
};

// Related Product Card
const RelatedProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const IconComponent = iconMap[product.icon] || Database;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link to={product.href}>
        <Card className="hz-bg-surface hz-transition hz-h-full hz-pointer hz-hoverable">
          <CardHeader className="hz-pb-4">
            <div className="hz-row hz-ai-start hz-jc-between">
              <div className="hz-p-2 hz-r-lg hz-bg-quiet hz-bordered hz-transition hz-hoverable">
                <IconComponent className="hz-sq-3 hz-fg" />
              </div>
              <StatusBadge status={product.status} />
            </div>
            <CardTitle className="hz-t-lg hz-mt-3 hz-transition hz-row hz-ai-center hz-gap-2 hz-hoverable">
              {product.shortName}
              <ArrowRight className="hz-sq-2 hz-invisible hz-transition hz-fg" />
            </CardTitle>
            <CardDescription className="hz-fg-muted">
              {product.tagline}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </motion.div>
  );
};

export const ProductPageTemplate: React.FC<ProductPageTemplateProps> = ({ product, children }) => {
  const IconComponent = iconMap[product.icon] || Database;

  // Get related products from same category (excluding current product)
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  // Determine which install methods are available
  const installMethods = product.install
    ? Object.keys(product.install).filter(key => product.install?.[key as keyof typeof product.install])
    : [];

  // Get upstream project info (for forked OSS products)
  const upstreamProject = getUpstreamForProduct(product.id);

  // Get code examples for this product
  const codeExamples = getCodeExamplesForProduct(product.id);

  // Get community links
  const community = getCommunityForProduct(product.id);

  // Build community links array for CommunitySection
  const communityLinks = [
    { type: 'github' as const, url: product.github },
    { type: 'docs' as const, url: product.docs || 'https://docs.hanzo.ai' },
    ...(community.discord ? [{ type: 'discord' as const, url: community.discord }] : []),
    ...(community.twitter ? [{ type: 'twitter' as const, url: community.twitter }] : []),
  ];

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      {/* Hero Section with Architectural Elements */}
      <section className="hz-rel hz-py-7 hz-px-4 hz-clip">
        {/* Background effects */}
        <div className="hz-abs hz-inset hz-bg" />
        <GridLines spacing={50} opacity={0.03} />
        <BlueprintLine orientation="horizontal" position="15%" color="rgba(200, 200, 200, 0.03)" />
        <BlueprintLine orientation="horizontal" position="85%" color="rgba(200, 200, 200, 0.03)" />
        <BlueprintLine orientation="vertical" position="15%" color="rgba(200, 200, 200, 0.03)" />
        <BlueprintLine orientation="vertical" position="85%" color="rgba(200, 200, 200, 0.03)" />

        {/* Gradient accents */}
        <div className="hz-abs hz-inset hz-no-pointer">
          <div className="hz-sq-8 hz-abs hz-bg-quiet hz-r-full hz-blur-bg"></div>
          <div className="hz-sq-8 hz-abs hz-bottom-0 hz-right-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
        </div>

        <div className="hz-container hz-rel hz-z-raised">
          <ArchitecturalBox
            className="hz-bg-none hz-p-5"
            showCorners={true}
            showGrid={false}
            cornerSize={50}
            cornerColor="rgba(255, 255, 255, 0.15)"
          >
            <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
              {/* Left: Product Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Badges */}
                <div className="hz-row hz-wrap hz-ai-center hz-gap-3 hz-mb-5">
                  <div className="hz-card hz-card-tight">
                    <IconComponent className="hz-sq-5 hz-fg" />
                  </div>
                  <StatusBadge status={product.status} />
                  {product.openSource && (
                    <Badge variant="outline" className="hz-bg-raised hz-fg-muted hz-border-strong">
                      Open Source
                    </Badge>
                  )}
                  <PricingBadge pricing={product.pricing} />
                </div>

                {/* Title */}
                <h1 className="hz-t-4xl hz-w-bold hz-mb-4 hz-chrome">
                  {product.name}
                </h1>

                {/* Tagline */}
                <p className="hz-t-xl hz-fg hz-mb-4 hz-w-medium">
                  {product.tagline}
                </p>

                {/* Description */}
                <p className="hz-t-lg hz-fg-muted hz-mb-6 hz-leading-relaxed">
                  {product.description}
                </p>

                {/* Action Buttons */}
                <div className="hz-col-row hz-gap-4">
                  {product.docs && (
                    <Button
                      size="lg"
                      className="hz-bg-inverse hz-fg-inverse hz-border-none hz-hoverable"
                      asChild
                    >
                      <a href={product.docs} target="_blank" rel="noopener noreferrer">
                        <BookOpen className="hz-sq-3 hz-mr-2" />
                        Documentation
                      </a>
                    </Button>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    className="hz-hoverable"
                    asChild
                  >
                    <a href={product.github} target="_blank" rel="noopener noreferrer">
                      <Github className="hz-sq-3 hz-mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Right: Product Mockup */}
              <div className="hz-desktop-only">
                <ProductMockup
                  category={product.category}
                  product={product}
                  className="hz-shadow-lg hz-shadow"
                />
              </div>
            </div>
          </ArchitecturalBox>
        </div>
      </section>

      {/* Mobile Mockup (shown below hero on mobile) */}
      <section className="hz-mobile-only hz-px-4 hz-pb-6">
        <div className="hz-container-narrow hz-mw-sm">
          <ProductMockup
            category={product.category}
            product={product}
            className="hz-shadow-lg hz-shadow"
          />
        </div>
      </section>

      {/* Quick Install Section */}
      {product.install && installMethods.length > 0 && (
        <section className="hz-py-7 hz-px-4 hz-border-t">
          <div className="hz-container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="hz-t-2xl hz-w-bold hz-mb-2 hz-align-center">Get Started</h2>
              <p className="hz-fg-muted hz-align-center hz-mb-6">Install {product.shortName} in seconds</p>

              <Tabs defaultValue={installMethods[0]} className="hz-w-full">
                <TabsList className={`hz-grid hz-w-full${Math.min(installMethods.length, 4)} hz-bg-surface hz-bordered hz-p-1 hz-r-lg`}>
                  {product.install.cli && (
                    <TabsTrigger value="cli" className="hz-r-lg">
                      <Terminal className="hz-sq-2 hz-mr-2" />
                      CLI
                    </TabsTrigger>
                  )}
                  {product.install.docker && (
                    <TabsTrigger value="docker" className="hz-r-lg">
                      Docker
                    </TabsTrigger>
                  )}
                  {product.install.npm && (
                    <TabsTrigger value="npm" className="hz-r-lg">
                      npm
                    </TabsTrigger>
                  )}
                  {product.install.pip && (
                    <TabsTrigger value="pip" className="hz-r-lg">
                      pip
                    </TabsTrigger>
                  )}
                </TabsList>

                {product.install.cli && (
                  <TabsContent value="cli" className="hz-mt-4">
                    <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
                      <div className="hz-row hz-ai-center hz-jc-between hz-px-4 hz-py-2 hz-border-b hz-bg-surface">
                        <span className="hz-t-xs hz-fg-muted hz-mono">terminal</span>
                        <CopyButton text={product.install.cli} />
                      </div>
                      <div className="hz-p-4 hz-mono hz-t-sm hz-scroll-x">
                        <span className="hz-fg-muted">$</span>{" "}
                        <span className="hz-fg-muted">{product.install.cli}</span>
                      </div>
                    </div>
                  </TabsContent>
                )}

                {product.install.docker && (
                  <TabsContent value="docker" className="hz-mt-4">
                    <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
                      <div className="hz-row hz-ai-center hz-jc-between hz-px-4 hz-py-2 hz-border-b hz-bg-surface">
                        <span className="hz-t-xs hz-fg-muted hz-mono">docker</span>
                        <CopyButton text={product.install.docker} />
                      </div>
                      <div className="hz-p-4 hz-mono hz-t-sm hz-scroll-x">
                        <span className="hz-fg-muted">$</span>{" "}
                        <span className="hz-fg-muted">{product.install.docker}</span>
                      </div>
                    </div>
                  </TabsContent>
                )}

                {product.install.npm && (
                  <TabsContent value="npm" className="hz-mt-4">
                    <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
                      <div className="hz-row hz-ai-center hz-jc-between hz-px-4 hz-py-2 hz-border-b hz-bg-surface">
                        <span className="hz-t-xs hz-fg-muted hz-mono">npm</span>
                        <CopyButton text={product.install.npm} />
                      </div>
                      <div className="hz-p-4 hz-mono hz-t-sm hz-scroll-x">
                        <span className="hz-fg-muted">$</span>{" "}
                        <span className="hz-fg">{product.install.npm}</span>
                      </div>
                    </div>
                  </TabsContent>
                )}

                {product.install.pip && (
                  <TabsContent value="pip" className="hz-mt-4">
                    <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
                      <div className="hz-row hz-ai-center hz-jc-between hz-px-4 hz-py-2 hz-border-b hz-bg-surface">
                        <span className="hz-t-xs hz-fg-muted hz-mono">pip</span>
                        <CopyButton text={product.install.pip} />
                      </div>
                      <div className="hz-p-4 hz-mono hz-t-sm hz-scroll-x">
                        <span className="hz-fg-muted">$</span>{" "}
                        <span className="hz-fg-muted">{product.install.pip}</span>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>

              {/* Universal CLI hint */}
              <p className="hz-align-center hz-fg-muted hz-mt-5 hz-t-sm">
                New to Hanzo? Install the CLI first:{" "}
                <code className="hz-bg-raised hz-px-2 hz-py-1 hz-r-md hz-fg hz-mono hz-t-xs">
                  curl -fsSL hanzo.sh/install.sh | sh
                </code>
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Code Examples Section */}
      {codeExamples.length > 0 && (
        <CodeExamplesSection
          title={`${product.shortName} Quick Start`}
          subtitle="Get started in minutes with your language of choice"
          examples={codeExamples}
        />
      )}

      {/* Features Section */}
      <section className="hz-py-7 hz-px-4 hz-border-t">
        <div className="hz-container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="hz-t-2xl hz-w-bold hz-mb-2 hz-align-center">Features</h2>
            <p className="hz-fg-muted hz-align-center hz-mb-6">Everything you need to get started</p>

            <div className="hz-grid hz-grid-3 hz-gap-4">
              {product.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="hz-card hz-transition hz-card-interactive">
                    <div className="hz-row hz-ai-start hz-gap-3">
                      <div className="hz-mt-1">
                        <CheckCircle className="hz-sq-3 hz-fg hz-transition hz-hoverable" />
                      </div>
                      <span className="hz-fg-soft hz-transition hz-hoverable">{feature}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom content from children */}
      {children}

      {/* SDK Section */}
      <SDKSection productName={product.shortName} sdks={hanzoSDKs} />

      {/* Community Section */}
      <CommunitySection
        productName={product.shortName}
        links={communityLinks}
      />

      {/* Resources Section */}
      <section className="hz-py-7 hz-px-4 hz-border-t">
        <div className="hz-container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="hz-t-2xl hz-w-bold hz-mb-2 hz-align-center">Resources</h2>
            <p className="hz-fg-muted hz-align-center hz-mb-6">Learn more about {product.shortName}</p>

            <div className="hz-grid hz-grid-3 hz-gap-5">
              <a
                href={product.github}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <Card className="hz-bg-surface hz-transition hz-h-full hz-hoverable">
                  <CardHeader>
                    <CardTitle className="hz-row hz-ai-center hz-gap-2 hz-t-lg">
                      <Github className="hz-sq-3" />
                      GitHub
                      <ExternalLink className="hz-sq-2 hz-ml-auto hz-invisible hz-transition hz-fg" />
                    </CardTitle>
                    <CardDescription>
                      Source code, issues, and contributions
                    </CardDescription>
                  </CardHeader>
                </Card>
              </a>

              {product.docs && (
                <a
                  href={product.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <Card className="hz-bg-surface hz-transition hz-h-full hz-hoverable">
                    <CardHeader>
                      <CardTitle className="hz-row hz-ai-center hz-gap-2 hz-t-lg">
                        <BookOpen className="hz-sq-3" />
                        Documentation
                        <ExternalLink className="hz-sq-2 hz-ml-auto hz-invisible hz-transition hz-fg" />
                      </CardTitle>
                      <CardDescription>
                        Guides, API reference, and examples
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              )}

              <Link to="/pricing" className="">
                <Card className="hz-bg-surface hz-transition hz-h-full hz-hoverable">
                  <CardHeader>
                    <CardTitle className="hz-row hz-ai-center hz-gap-2 hz-t-lg">
                      <Sparkles className="hz-sq-3" />
                      Pricing
                      <ArrowRight className="hz-sq-2 hz-ml-auto hz-invisible hz-transition hz-fg" />
                    </CardTitle>
                    <CardDescription>
                      {product.pricing === 'free' ? 'Completely free to use' : 'Free tier available, scale as you grow'}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="hz-py-7 hz-px-4 hz-border-t">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="hz-row hz-ai-center hz-jc-between hz-mb-6">
                <div>
                  <h2 className="hz-t-2xl hz-w-bold hz-mb-2">Related Products</h2>
                  <p className="hz-fg-muted">More from Hanzo {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                </div>
                <Link
                  to={`/products/${product.category}`}
                  className="hz-fg hz-t-sm hz-w-medium hz-row hz-ai-center hz-gap-1 hz-hoverable"
                >
                  View all
                  <ArrowRight className="hz-sq-2 hz-transition" />
                </Link>
              </div>

              <div className="hz-grid hz-grid-3 hz-gap-5">
                {relatedProducts.map((relatedProduct, index) => (
                  <RelatedProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Upstream Attribution Section (for forked OSS projects) */}
      {upstreamProject && (
        <UpstreamAttribution
          upstream={upstreamProject}
          productName={product.name}
        />
      )}

      {/* CTA Section */}
      <section className="hz-py-7 hz-px-4 hz-border-t hz-rel hz-clip">
        {/* Background gradient */}
        <div className="hz-abs hz-inset" />

        <div className="hz-container-narrow hz-align-center hz-rel hz-z-raised">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
              Ready to get started with{" "}
              <span className="hz-fg">{product.shortName}</span>?
            </h2>
            <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6">
              Deploy in minutes with Hanzo Cloud or self-host with our open-source release.
              {product.pricing === 'free' && " It's completely free."}
            </p>
            <div className="hz-col-row hz-gap-4 hz-jc-center">
              <Button
                size="lg"
                className="hz-bg-inverse hz-fg-inverse hz-border-none hz-t-lg hz-px-6 hz-hoverable"
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
                className="hz-t-lg hz-px-6 hz-hoverable"
                asChild
              >
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductPageTemplate;
