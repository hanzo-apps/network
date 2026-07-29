import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroButtonsProps {
  titleAnimationComplete: boolean;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ titleAnimationComplete }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: titleAnimationComplete ? 1 : 0, y: titleAnimationComplete ? 0 : 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="hz-col-row hz-jc-center hz-mt-5"
    >
      <Button 
        size="sm" 
        className="hz-fg hz-r-full hz-px-4 hz-py-2 hz-bh-6"
        onClick={() => navigate('/signup')}
      >
        Get Started
        <ArrowRight className="hz-sq-2 hz-ml-2" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="hz-fg hz-r-full hz-px-4 hz-py-2 hz-bh-6 hz-hoverable"
        onClick={() => navigate('/philosophy')}
      >
        Zen of Hanzo
        <ArrowRight className="hz-sq-2 hz-ml-2" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="hz-fg hz-r-full hz-px-4 hz-py-2 hz-bh-6 hz-hoverable"
        onClick={() => window.open('https://github.com/hanzoai', '_blank')}
      >
        Star on GitHub
        <Github className="hz-sq-2 hz-ml-2" />
      </Button>
    </motion.div>
  );
};

export default HeroButtons;