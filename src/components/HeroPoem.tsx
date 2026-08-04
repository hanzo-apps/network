
import { motion } from "framer-motion";

const HeroPoem = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="hz-container-narrow hz-align-center hz-mb-7 hz-stack-5"
    >
      <h1 className="hz-t-4xl hz-display hz-tracking-tight hz-fg hz-leading-tight hz-rel hz-z-overlay hz-align-center">
        In the age of endless dreams,
        <span className="hz-chrome hz-py-1 hz-leading-relaxed">
          Ideas take flight on digital wings
        </span>
      </h1>
      <p className="hz-t-xl hz-fg-muted hz-w-normal hz-leading-relaxed hz-align-center">
        Through circuits of light and streams of code,<br />
        Hanzo weaves your visions into reality untold.<br />
        With algorithms crafted and AI refined,<br />
        We transform the dreams of your design.
      </p>
    </motion.div>
  );
};

export default HeroPoem;
