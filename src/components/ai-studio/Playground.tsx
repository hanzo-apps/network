
import React from "react";
import { Grid3X3 } from "lucide-react";

const Playground = () => {
  return (
    <div className="hz-grow hz-p-5 hz-col hz-ai-center hz-jc-center hz-align-center">
      <Grid3X3 className="hz-sq-8 hz-fg-faint hz-mb-4" />
      <h3 className="hz-t-xl hz-w-medium hz-mb-2">Playground Mode</h3>
      <p className="hz-fg-muted hz-mw-sm">
        This feature allows you to create custom AI workflows with a visual interface.
        Coming soon in a future update.
      </p>
    </div>
  );
};

export default Playground;
