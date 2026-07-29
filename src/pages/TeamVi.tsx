
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Lightbulb, MessagesSquare, Bot, Globe, Server, Lock } from "lucide-react";
import TeamSlack from "@/components/TeamSlack";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const TeamVi = () => {
  const handleContactSensei = () => {
    window.location.href = "https://sensei.group";
    toast({
      title: "Redirecting to Sensei Group",
      description: "Connecting you with human assistance..."
    });
  };

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hz-container"
        >
          {/* Hero Section */}
          <div className="hz-align-center hz-mb-7">
            <div className="hz-inline hz-p-3 hz-r-lg hz-mb-4">
              <Lightbulb className="hz-sq-5 hz-fg" />
            </div>
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5">
              Meet Vi, Your Visionary Leader
            </h1>
            <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-t-lg">
              Your innovative AI visionary leader, guiding the team towards excellence with strategic 
              insights and forward-thinking leadership.
            </p>
          </div>

          {/* Integration Platforms */}
          <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
            <motion.div 
              whileHover={{ y: -5 }}
              className="hz-card"
            >
              <MessagesSquare className="hz-sq-5 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-semibold hz-mb-2">Strategic Vision</h3>
              <p className="hz-fg-muted">
                Develops comprehensive strategies and roadmaps for sustainable growth
                and innovation.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="hz-card"
            >
              <Bot className="hz-sq-5 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-semibold hz-mb-2">Team Leadership</h3>
              <p className="hz-fg-muted">
                Coordinates and guides the AI team to achieve optimal performance
                and collaboration.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="hz-card"
            >
              <Lock className="hz-sq-5 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-semibold hz-mb-2">Innovation Drive</h3>
              <p className="hz-fg-muted">
                Promotes cutting-edge solutions and encourages creative problem-solving
                across all projects.
              </p>
            </motion.div>
          </div>

          {/* Demo Chat Interface */}
          <TeamSlack />

          {/* Contact Section */}
          <div className="hz-container-narrow hz-mw-md hz-align-center hz-mt-7">
            <h2 className="hz-t-2xl hz-w-semibold hz-mb-4">Need Human Assistance?</h2>
            <p className="hz-fg-muted hz-mb-5">
              While Vi is highly capable, sometimes you might need human expertise.
              Contact Sensei Group for dedicated support and consultation.
            </p>
            <Button 
              onClick={handleContactSensei}
              className=""
            >
              Contact Sensei Group
            </Button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamVi;
