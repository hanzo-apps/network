
import React from "react";
import ZenPrincipleCard, { ZenPrinciple } from "./ZenPrincipleCard";

interface ZenPrinciplesListProps {
  principles: ZenPrinciple[];
  groupByDiscipline?: boolean;
}

const ZenPrinciplesList: React.FC<ZenPrinciplesListProps> = ({ 
  principles, 
  groupByDiscipline = false 
}) => {
  // Group principles by discipline
  const disciplineGroups = React.useMemo(() => {
    if (!groupByDiscipline) return null;

    const groups: Record<string, ZenPrinciple[]> = {};
    principles.forEach(principle => {
      const discipline = principle.discipline || "Uncategorized";
      if (!groups[discipline]) {
        groups[discipline] = [];
      }
      groups[discipline].push(principle);
    });
    return groups;
  }, [principles, groupByDiscipline]);

  if (groupByDiscipline && disciplineGroups) {
    return (
      <div className="hz-stack-6">
        {Object.entries(disciplineGroups).map(([discipline, disciplinePrinciples]) => (
          <div key={discipline} className="hz-stack-5">
            <div className="hz-row hz-ai-center hz-inline-2">
              <h3 className="hz-t-2xl hz-w-semibold hz-fg-muted">{discipline}</h3>
              <div className="hz-grow hz-bg-raised"></div>
            </div>
            <div className="hz-grid hz-grid-3 hz-gap-5">
              {disciplinePrinciples.map((principle, index) => (
                <ZenPrincipleCard 
                  key={principle.title} 
                  principle={principle} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hz-grid hz-grid-3 hz-gap-5">
      {principles.map((principle, index) => (
        <ZenPrincipleCard key={principle.title} principle={principle} index={index} />
      ))}
    </div>
  );
};

export default ZenPrinciplesList;
