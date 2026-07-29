import React from "react";
import { Link } from "react-router-dom";
import ProductsMenu from "./products-menu";
import { SolutionsMenu } from "./solutions-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { NavMenu } from "./NavMenu";

// Meet Hanzo dropdown content
const MeetHanzoContent = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="hz-grid hz-grid-4 hz-gap-6">
    {/* Featured - About Hanzo */}
    <div className="">
      <div className="hz-card hz-mb-4">
        <h3 className="hz-fg hz-w-semibold hz-mb-2">Hanzo AI</h3>
        <p className="hz-fg-muted hz-t-xs hz-mb-3 hz-leading-relaxed">
          Building frontier AI infrastructure since 2017. Techstars-backed.
        </p>
        <Link
          to="/team"
          onClick={closeMenu}
          className="hz-inline hz-ai-center hz-t-xs hz-w-medium hz-fg hz-transition hz-hoverable"
        >
          Meet the team →
        </Link>
      </div>
      <ul className="hz-stack-2">
        <li><Link to="/philosophy" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Philosophy</Link></li>
        <li><Link to="/leadership" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Leadership</Link></li>
        <li><Link to="/brand" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Brand</Link></li>
        <li><Link to="/press" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Press</Link></li>
      </ul>
    </div>

    {/* Research & Models */}
    <div>
      <h3 className="hz-fg-muted hz-t-xs hz-w-medium hz-mb-3 hz-upper hz-tracking-wide">Research</h3>
      <ul className="hz-stack-2">
        <li>
          <Link to="/zen" onClick={closeMenu} className="hz-row hz-ai-start hz-gap-2">
            <span className="hz-fg-muted hz-t-lg">🧠</span>
            <div>
              <span className="hz-t-sm hz-fg hz-w-medium hz-transition hz-hoverable">Zen LM</span>
              <p className="hz-t-xs hz-fg-muted">30+ open foundation models</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/zen/models" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">All Models</Link>
        </li>
        <li>
          <a href="https://zenlm.org/research" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Papers</a>
        </li>
        <li>
          <a href="https://huggingface.co/zenlm" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">HuggingFace</a>
        </li>
        <li>
          <Link to="/open-source" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Open Source</Link>
        </li>
      </ul>
    </div>

    {/* Products */}
    <div>
      <h3 className="hz-fg-muted hz-t-xs hz-w-medium hz-mb-3 hz-upper hz-tracking-wide">Products</h3>
      <ul className="hz-stack-2">
        <li>
          <Link to="/dev" onClick={closeMenu} className="hz-row hz-ai-start hz-gap-2">
            <span className="hz-fg hz-t-lg">⚡</span>
            <div>
              <span className="hz-t-sm hz-fg hz-w-medium hz-transition hz-hoverable">Hanzo Dev</span>
              <p className="hz-t-xs hz-fg-muted">AI coding assistant</p>
            </div>
          </Link>
        </li>
        <li><Link to="/ai" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">AI Platform</Link></li>
        <li><Link to="/cloud" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Cloud</Link></li>
        <li><Link to="/platform" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Infrastructure</Link></li>
        <li><Link to="/products" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">All Products →</Link></li>
      </ul>
    </div>

    {/* Connect & Trust */}
    <div>
      <h3 className="hz-fg-muted hz-t-xs hz-w-medium hz-mb-3 hz-upper hz-tracking-wide">Connect</h3>
      <ul className="hz-stack-2 hz-mb-5">
        <li><Link to="/contact" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Contact Us</Link></li>
        <li><Link to="/enterprise" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Enterprise</Link></li>
        <li><Link to="/referrals" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Referral Program</Link></li>
      </ul>
      <h3 className="hz-fg-muted hz-t-xs hz-w-medium hz-mb-3 hz-upper hz-tracking-wide">Trust</h3>
      <ul className="hz-stack-2">
        <li><Link to="/security" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Security</Link></li>
        <li><Link to="/status" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">System Status</Link></li>
      </ul>
    </div>
  </div>
);

// Learn dropdown content
const LearnContent = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="hz-grid hz-grid-3 hz-gap-5">
    <div>
      <h3 className="hz-fg-muted hz-t-xs hz-w-medium hz-mb-3 hz-upper hz-tracking-wide">Documentation</h3>
      <ul className="hz-stack-2">
        <li><a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Docs</a></li>
        <li><a href="https://docs.hanzo.ai/tutorials" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Tutorials</a></li>
        <li><a href="https://docs.hanzo.ai/api" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">API Reference</a></li>
      </ul>
    </div>
    <div>
      <h3 className="hz-fg-muted hz-t-xs hz-w-medium hz-mb-3 hz-upper hz-tracking-wide">Community</h3>
      <ul className="hz-stack-2">
        <li><a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">GitHub</a></li>
        <li><a href="https://discord.gg/hanzo" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Discord</a></li>
        <li><Link to="/blog" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Blog</Link></li>
      </ul>
    </div>
    <div>
      <h3 className="hz-fg-muted hz-t-xs hz-w-medium hz-mb-3 hz-upper hz-tracking-wide">Support</h3>
      <ul className="hz-stack-2">
        <li><Link to="/contact" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Support Center</Link></li>
        <li><Link to="/status" onClick={closeMenu} className="hz-t-sm hz-fg-soft hz-transition hz-hoverable">Status</Link></li>
      </ul>
    </div>
  </div>
);

const DesktopNav = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="hz-desktop-only hz-row hz-ai-center hz-inline-4">
      {/* Meet Hanzo dropdown */}
      <NavMenu label="Meet Hanzo">
        {(closeMenu) => <MeetHanzoContent closeMenu={closeMenu} />}
      </NavMenu>

      {/* Platform (Products) dropdown */}
      <ProductsMenu />

      {/* Solutions dropdown */}
      <SolutionsMenu />

      {/* Pricing direct link */}
      <Link
        to="/pricing"
        className="hz-fg-muted hz-transition hz-t-sm hz-w-medium hz-link"
      >
        Pricing
      </Link>

      {/* Learn dropdown */}
      <NavMenu label="Learn">
        {(closeMenu) => <LearnContent closeMenu={closeMenu} />}
      </NavMenu>
    </div>
  );
};

export default DesktopNav;
