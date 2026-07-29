
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { LucideIcon, ExternalLink, Mail, Phone, Shield, Users } from "lucide-react";
import TeamSlack from "@/components/TeamSlack";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { teamMembers, TeamMemberId } from "@/constants/team-members";
import { useTheme } from "@/contexts/ThemeContext";

interface TeamMemberPageProps {
  memberId: TeamMemberId;
}

const TeamMemberPage = ({ memberId }: TeamMemberPageProps) => {
  const member = teamMembers[memberId];
  const MainIcon = member.mainIcon;
  const { isDarkMode, getRoundingClass, getGlassClass } = useTheme();

  const handleContactSensei = () => {
    window.location.href = "https://sensei.group";
    toast({
      title: "Redirecting to Sensei Group",
      description: "Connecting you with human assistance..."
    });
  };

  const handleContactAgency = () => {
    window.location.href = "https://hanzo.agency";
    toast({
      title: "Redirecting to Hanzo Agency",
      description: "Connecting you with our creative team..."
    });
  };

  // Extract the first part of the description to use as specialty
  const specialty = member.description.split(',')[0].trim();

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hz-container"
        >
          <div className="hz-align-center hz-mb-7">
            <div className={`hz-inline hz-p-3 hz-r-lg ${member.gradient} hz-mb-4`}>
              <MainIcon className="hz-sq-5 hz-fg" />
            </div>
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5">
              {member.title}
            </h1>
            <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-t-lg">
              {member.description}
            </p>
          </div>

          <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
            {member.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`hz-p-5 hz-r-xl hz-bordered ${getGlassClass()}`}
                >
                  <FeatureIcon className={`hz-sq-5 ${feature.color} hz-mb-4`} />
                  <h3 className="hz-t-xl hz-w-semibold hz-mb-2">{feature.title}</h3>
                  <p className="hz-fg-muted">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <TeamSlack />

          {/* Expertise Section */}
          <div className="hz-mt-7 hz-mb-7">
            <h2 className="hz-t-2xl hz-w-semibold hz-mb-6 hz-align-center">How {member.name} Works With Our Expert Partners</h2>
            
            <div className="hz-grid hz-grid-2 hz-gap-6">
              {/* Hanzo Agency Card */}
              <div className="hz-card hz-transition hz-card-interactive">
                <div className="hz-p-3 hz-r-lg hz-bg-raised hz-self-start hz-mb-4">
                  <Users className="hz-sq-4 hz-fg-muted" strokeWidth={1.5} />
                </div>
                <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-3">Hanzo Agency</h3>
                <p className="hz-fg-soft hz-mb-4">
                  {member.name} collaborates with our creative agency to help brands transform their digital 
                  presence using cutting-edge AI-powered design and marketing strategies.
                </p>
                <div className="hz-row hz-wrap hz-gap-4">
                  <Button 
                    onClick={handleContactAgency}
                    className="hz-bg-raised hz-fg hz-hoverable"
                  >
                    Work with Hanzo Agency
                    <ExternalLink className="hz-sq-2 hz-ml-2" />
                  </Button>
                  <a href="/contact" className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-muted hz-transition">
                    <span>Learn more</span>
                    <Mail size={14} />
                  </a>
                </div>
              </div>
              
              {/* Sensei Group Card */}
              <div className="hz-card hz-transition hz-card-interactive">
                <div className="hz-p-3 hz-r-lg hz-bg-raised hz-self-start hz-mb-4">
                  <Shield className="hz-sq-4 hz-fg-muted" strokeWidth={1.5} />
                </div>
                <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-3">Sensei Group</h3>
                <p className="hz-fg-soft hz-mb-4">
                  When your project requires human expertise, {member.name} works alongside our collective of 
                  CXOs and industry specialists to implement enterprise-grade solutions.
                </p>
                <div className="hz-row hz-wrap hz-gap-4">
                  <Button 
                    onClick={handleContactSensei}
                    className="hz-bg-raised hz-fg hz-hoverable"
                  >
                    Contact Sensei Group
                    <ExternalLink className="hz-sq-2 hz-ml-2" />
                  </Button>
                  <a href="tel:+1234567890" className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-muted hz-transition">
                    <span>Schedule a call</span>
                    <Phone size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="hz-container-narrow hz-align-center hz-mt-7">
            <h2 className="hz-t-2xl hz-w-semibold hz-mb-5">What {member.name} Can Do For You</h2>
            <p className="hz-fg-muted hz-mb-6">
              {member.name} specializes in {specialty} to help you achieve your goals.
              For the best results, consider working with our expert human teams at Hanzo Agency or Sensei Group.
            </p>
            <div className="hz-grid hz-grid-2 hz-gap-4">
              <Button 
                onClick={handleContactAgency}
                className={` ${getRoundingClass()}`}
              >
                Creative Services
                <ExternalLink className="hz-sq-2 hz-ml-2" />
              </Button>
              <Button 
                onClick={handleContactSensei}
                className={` ${getRoundingClass()}`}
              >
                Enterprise Solutions
                <ExternalLink className="hz-sq-2 hz-ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamMemberPage;
