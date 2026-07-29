import { BRAND } from '@/lib/brand';
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, User, Tag, ArrowRight, Rss, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";


// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Introducing Hanzo AI v3: The next generation of AI development",
    excerpt: "Today we're excited to announce the release of Hanzo AI v3, our most powerful and flexible AI development platform yet.",
    date: "May 15, 2024",
    author: "Zach Kelling",
    category: "Product",
    tags: ["AI", "Release", "Development"],
    imageUrl: "/img/28d53ec4-328f-4812-862b-b9a760bbabae.png"
  },
  {
    id: 2,
    title: "How to build an AI-powered chatbot with Hanzo Bot in 10 minutes",
    excerpt: "In this tutorial, we'll show you how to create a custom AI chatbot using Hanzo Bot that can integrate with your existing systems.",
    date: "June 3, 2024",
    author: "David Tai",
    category: "Tutorial",
    tags: ["Bot", "Tutorial", "Integration"],
    imageUrl: "/img/96a9379c-acc3-4170-a96f-964fb8773dd3.png"
  },
  {
    id: 3,
    title: "The future of e-commerce with Hanzo Commerce",
    excerpt: "Explore how AI is transforming the e-commerce landscape and how Hanzo Commerce is leading the revolution.",
    date: "July 12, 2024",
    author: "Marketing Team",
    category: "Industry",
    tags: ["Commerce", "AI", "Future"],
    imageUrl: "/img/fd154f76-a7a9-4b99-ac2b-e1eb589ec4da.png"
  },
  {
    id: 4,
    title: "Scaling your application with Hanzo Vector",
    excerpt: "Learn how to scale your AI applications efficiently using Hanzo Vector's advanced embedding and semantic search capabilities.",
    date: "August 24, 2024",
    author: "Engineering Team",
    category: "Technical",
    tags: ["Vector", "Scaling", "Performance"],
    imageUrl: "/img/a31568fe-aa1f-4933-add1-b981564f25b9.png"
  }
];

const Blog = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Blog - Hanzo AI</title>
        <meta
          name="description"
          content="Latest news, tutorials, and insights from the Hanzo AI team."
        />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
          <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
            <div
              className="hz-center-xy hz-abs hz-r-full hz-dim-more"
              style={{
                background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="hz-container-wide hz-rel hz-z-raised">
            <div className="hz-align-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-quiet hz-fg"
                >
                <BookOpen className="hz-sq-2" />
                Engineering Blog
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
              >
                <span className="hz-fg">Insights from</span>
                <br />
                <span className="hz-fg-muted">the team.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="hz-container-narrow hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6"
              >
                Tutorials, product updates, and deep dives into AI development
                from the Hanzo engineering team.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4"
              >
                <a
                  href="#posts"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  Latest Posts
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </a>
                <button className="hz-btn hz-btn-ghost hz-transition hz-fg">
                  <Rss className="hz-sq-2 hz-mr-2" />
                  Subscribe to RSS
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section id="posts" className="hz-py-7 hz-px-4">
          <div className="hz-container">
            {/* Featured Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-mb-7"
            >
              <div className="hz-grid hz-grid-2 hz-gap-6 hz-r-lg hz-clip hz-bordered">
                <div className="hz-p-6 hz-col hz-jc-center">
                  <div className="hz-row hz-ai-center hz-inline-4 hz-mb-4">
                    <span
                      className="hz-px-3 hz-py-1 hz-r-full hz-t-sm hz-bg-quiet hz-fg"
                      >
                      Featured
                    </span>
                    <span className="hz-fg-muted hz-t-sm hz-row hz-ai-center">
                      <CalendarIcon className="hz-sq-2 hz-mr-1" />
                      {blogPosts[0].date}
                    </span>
                  </div>

                  <h2 className="hz-t-2xl hz-w-bold hz-mb-4 hz-fg">{blogPosts[0].title}</h2>
                  <p className="hz-fg-soft hz-mb-5">{blogPosts[0].excerpt}</p>

                  <div className="hz-row hz-ai-center hz-inline-4 hz-mb-5">
                    <div className="hz-row hz-ai-center">
                      <User className="hz-sq-2 hz-fg-muted hz-mr-2" />
                      <span className="hz-fg-muted hz-t-sm">{blogPosts[0].author}</span>
                    </div>
                    <div className="hz-row hz-ai-center">
                      <Tag className="hz-sq-2 hz-fg-muted hz-mr-2" />
                      <span className="hz-fg-muted hz-t-sm">{blogPosts[0].category}</span>
                    </div>
                  </div>

                  <button
                    className="hz-btn hz-btn-ghost hz-w-fit hz-transition hz-bg-inverse"
                    >
                    Read Article
                    <ArrowRight className="hz-sq-2 hz-ml-2" />
                  </button>
                </div>

                <div className="hz-rel hz-bh-8">
                  <img
                    src={blogPosts[0].imageUrl}
                    alt={blogPosts[0].title}
                    className="hz-abs hz-inset hz-w-full hz-h-full hz-object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Blog Post Grid */}
            <div className="hz-grid hz-grid-3 hz-gap-6">
              {blogPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hz-bg-surface hz-r-lg hz-clip hz-bordered hz-transition hz-hoverable"
                >
                  <div className="hz-rel hz-bh-8">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="hz-abs hz-inset hz-w-full hz-h-full hz-object-cover"
                    />
                  </div>

                  <div className="hz-p-5">
                    <div className="hz-row hz-ai-center hz-inline-4 hz-mb-3">
                      <span className="hz-fg-muted hz-t-sm hz-row hz-ai-center">
                        <CalendarIcon className="hz-sq-2 hz-mr-1" />
                        {post.date}
                      </span>
                      <span className="hz-fg-muted hz-t-sm hz-row hz-ai-center">
                        <Tag className="hz-sq-2 hz-mr-1" />
                        {post.category}
                      </span>
                    </div>

                    <h3 className="hz-t-xl hz-w-bold hz-mb-3 hz-fg">{post.title}</h3>
                    <p className="hz-fg-muted hz-mb-4 hz-clamp-3">{post.excerpt}</p>

                    <div className="hz-row hz-ai-center hz-jc-between">
                      <div className="hz-row hz-ai-center">
                        <User className="hz-sq-2 hz-fg-muted hz-mr-2" />
                        <span className="hz-fg-muted hz-t-sm">{post.author}</span>
                      </div>
                      <button
                        className="hz-t-sm hz-w-medium hz-transition hz-fg"
                        >
                        Read More →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
          <div className="hz-sq-8 hz-abs hz-bg-quiet hz-r-full hz-blur-bg hz-no-pointer" />
          <div className="hz-sq-8 hz-abs hz-bg-quiet hz-r-full hz-blur-bg hz-no-pointer" />

          <div className="hz-container-narrow hz-align-center hz-rel hz-z-raised">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-t-3xl hz-w-bold hz-fg hz-mb-4"
            >
              Stay up to date
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6"
            >
              Get the latest Hanzo news, product updates, and tutorials delivered directly to your inbox.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hz-col-row hz-container-narrow hz-mw-sm hz-gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="hz-grow hz-px-4 hz-py-3 hz-bg-surface hz-bordered hz-r-full hz-fg"
              />
              <button
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-bg-inverse"
                >
                Subscribe
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
