import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick?: () => void;
}

const TeamMemberCard = ({ name, role, description, icon: Icon, gradient, onClick }: TeamMemberCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="hz-rel hz-h-full hz-bordered hz-clip hz-r-xl hz-bg-surface hz-glass hz-pointer"
      onClick={onClick}
    >
      <div className={`hz-abs hz-inset hz-invisible hz-transition hz-z-behind ${gradient}`} />
      <div className="hz-col hz-h-full">
        <div className="hz-p-6 hz-rel hz-z-raised hz-grow">
          <div className={`hz-inline hz-p-3 hz-r-lg ${gradient} hz-mb-4`}>
            <Icon className="hz-sq-4 hz-fg" />
          </div>
          <h3 className="hz-t-xl hz-w-semibold hz-mb-2 hz-fg hz-transition hz-hoverable">{name}</h3>
          <p className="hz-fg-muted hz-w-medium hz-mb-3">{role}</p>
          <p className="hz-fg-muted hz-mb-4">{description}</p>
        </div>

        <div className="hz-px-6 hz-pb-6 hz-rel hz-z-raised">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hz-btn hz-btn-primary hz-transition"
          >
            <Info className="hz-sq-3 hz-fg-muted hz-mr-2" />
            <span className="hz-fg">View Details</span>
          </motion.div>
        </div>
      </div>

      {/* Hover effect */}
      <motion.div 
        className="hz-abs hz-inset hz-invisible hz-transition hz-r-xl"
        initial={false}
        whileHover={{ opacity: 0.3 }}
      />
    </motion.div>
  );
};

export default TeamMemberCard;