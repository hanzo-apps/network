
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamChatHero from "./TeamChatHero";
import ChatInterface from "./ChatInterface";
import ChatFeatures from "./ChatFeatures";

const TeamChatLayout: React.FC = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg hz-col">
      <Navbar />
      
      <main className="hz-grow hz-col hz-pt-6">
        <TeamChatHero />
        <ChatInterface />
        <ChatFeatures />
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamChatLayout;
