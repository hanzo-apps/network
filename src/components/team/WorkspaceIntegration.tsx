
import React from "react";
import WorkspaceHeader from "./workspace/WorkspaceHeader";
import ProjectManagementCard from "./workspace/ProjectManagementCard";
import TeamChatCard from "./workspace/TeamChatCard";
import VideoMeetingsCard from "./workspace/VideoMeetingsCard";
import KnowledgeBaseCard from "./workspace/KnowledgeBaseCard";
import WorkspaceFooter from "./workspace/WorkspaceFooter";

const WorkspaceIntegration = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <WorkspaceHeader />

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
          <ProjectManagementCard />
          <TeamChatCard />
          <VideoMeetingsCard />
          <KnowledgeBaseCard />
        </div>

        <WorkspaceFooter />
      </div>
    </section>
  );
};

export default WorkspaceIntegration;
