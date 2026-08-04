
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  icon: LucideIcon;
  gradient: string;
}

const LastSupper = ({ members }: { members: TeamMember[] }) => {
  return (
    <div className="hz-py-7">
      <div className="hz-container">
        <div className="hz-rel hz-col hz-ai-center">
          {/* Fireworks GIF animation positioned directly over members */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="hz-rel hz-z-base" // Changed z-index to 0 to be behind text
          >
            <motion.img 
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnBuZzFlZWxzNnN3dzVzZzBqbTB2eHMxd2IzMjIwMG03eWN3MWZreiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/odsNxyQQDb29O/giphy.gif" 
              alt="Fireworks animation"
              className="hz-sq-8 hz-object-cover"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
          
          {/* Team members row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="hz-row hz-ai-center hz-jc-center hz-gap-4 hz-scroll-x hz-z-raised" // Added z-index to ensure it's above the GIF
          >
            {members.map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hz-none hz-align-center hz-rel hz-z-raised" // Added relative and z-index to ensure text is on top
                >
                  <div className={`hz-sq-8 hz-r-full ${member.gradient} hz-p-4 hz-mx-auto hz-mb-2`}>
                    <Icon className="hz-w-full hz-h-full hz-fg" />
                  </div>
                  <p className="hz-fg hz-w-medium">{member.name}</p>
                  <p className="hz-fg-muted hz-t-sm">{member.role}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LastSupper;
