import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, DollarSign, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
const Commerce = () => {
  return <section className="hz-py-7 hz-bg">
      <div className="hz-container">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="hz-align-center hz-mb-7">
          <div className="hz-inline hz-ai-center hz-inline-2 hz-bg-surface hz-px-4 hz-py-1 hz-r-full hz-mb-5">
            <ShoppingCart className="hz-sq-2 hz-fg" />
            <span className="hz-t-sm hz-fg">E-commerce Platform</span>
          </div>
          <h2 className="hz-t-4xl hz-display hz-fg hz-mb-4">Complete Commerce Stack</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Everything you need to build and scale your e-commerce business.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="hz-p-6 hz-r-lg hz-ring">
            <h3 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-5">One-Line Integration</h3>
            <div className="hz-bg-overlay hz-p-5 hz-r-lg hz-mb-5">
              <pre className="hz-t-sm hz-fg-soft">
                <code>{`import { createStore } from '@hanzo/commerce';

// Complete store in one line
const store = createStore();`}</code>
              </pre>
            </div>
            <p className="hz-fg-soft">Launch your store with just one line of code. Includes products, cart, checkout, and more.</p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="hz-grid hz-grid-2 hz-gap-4">
            <div className="hz-p-5 hz-r-lg hz-ring">
              <CreditCard className="hz-sq-5 hz-fg hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Payments</h4>
              <p className="hz-fg-soft">Global payment processing with 100+ methods</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <ShoppingCart className="hz-sq-5 hz-fg hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Store</h4>
              <p className="hz-fg-soft">Product management and inventory tracking</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <DollarSign className="hz-sq-5 hz-fg hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Pricing</h4>
              <p className="hz-fg-soft">Flexible pricing and subscription management</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <BarChart className="hz-sq-5 hz-fg hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Analytics</h4>
              <p className="hz-fg-soft">Real-time sales and customer insights</p>
            </div>
          </motion.div>
        </div>

        <div className="hz-align-center">
          <Button className="hz-bg-surface hz-fg hz-px-6 hz-py-5 hz-t-lg hz-r-lg hz-bordered hz-hoverable">
            Start Building with Commerce
          </Button>
        </div>
      </div>
    </section>;
};
export default Commerce;