
import React from "react";
import { Terminal as TerminalIcon } from "lucide-react";

const Terminal = () => {
  return (
    <div className="hz-grow hz-p-5 hz-col hz-ai-center hz-jc-center hz-align-center">
      <TerminalIcon className="hz-sq-8 hz-fg-faint hz-mb-4" />
      <h3 className="hz-t-xl hz-w-medium hz-mb-2">Terminal Mode</h3>
      <p className="hz-fg-muted hz-mw-sm">
        This feature provides a command-line interface for advanced model interactions.
        Coming soon in a future update.
      </p>
    </div>
  );
};

export default Terminal;
