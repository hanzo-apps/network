import { LucideIcon } from "lucide-react";
import TeamMemberCard from "./TeamMemberCard";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

interface TeamGroupProps {
  title: string;
  members: TeamMember[];
  onMemberClick?: (member: TeamMember) => void;
}

const TeamGroup = ({ title, members, onMemberClick }: TeamGroupProps) => {
  return (
    <div className="hz-mb-7">
      <h3 className="hz-t-2xl hz-w-bold hz-mb-5 hz-align-center hz-fg-muted">{title}</h3>
      <div className="hz-grid hz-grid-4 hz-gap-5">
        {members.map((member) => (
          <TeamMemberCard 
            key={member.name} 
            {...member} 
            onClick={onMemberClick ? () => onMemberClick(member) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamGroup;