
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Bot, Activity, Database, 
  FileText, Globe, Trash2, 
  PlusCircle, ChevronRight,
  ArrowUpDown, Settings, 
  PlayCircle, StopCircle,
  Save, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Agent } from "./data";

interface AgentDetailProps {
  agent: Agent | null;
  onClose: () => void;
  onUpdate: (agent: Agent) => void;
}

interface RagSource {
  id: string;
  name: string;
  type: "database" | "vector" | "file" | "api";
  connection: string;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agent, onClose, onUpdate }) => {
  const [editedAgent, setEditedAgent] = useState<Agent | null>(agent);
  const [activeTab, setActiveTab] = useState<"overview" | "rag" | "settings">("overview");
  const [selectedRagSource, setSelectedRagSource] = useState<RagSource | null>(null);

  if (!editedAgent) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedAgent(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  const handleSave = () => {
    if (editedAgent) {
      onUpdate(editedAgent);
    }
  };

  const handleAddRagSource = () => {
    const newSource: RagSource = {
      id: `rs-${Date.now()}`,
      name: "New Source",
      type: "database",
      connection: ""
    };
    
    setEditedAgent(prev => {
      if (!prev) return null;
      return {
        ...prev,
        ragSources: [...(prev.ragSources || []), newSource]
      };
    });
    
    setSelectedRagSource(newSource);
  };

  const handleRagSourceChange = (source: RagSource) => {
    setEditedAgent(prev => {
      if (!prev || !prev.ragSources) return prev;
      return {
        ...prev,
        ragSources: prev.ragSources.map(s => 
          s.id === source.id ? source : s
        )
      };
    });
  };

  const handleRemoveRagSource = (sourceId: string) => {
    setEditedAgent(prev => {
      if (!prev || !prev.ragSources) return prev;
      return {
        ...prev,
        ragSources: prev.ragSources.filter(s => s.id !== sourceId)
      };
    });
    
    if (selectedRagSource?.id === sourceId) {
      setSelectedRagSource(null);
    }
  };

  return (
    <Dialog open={!!agent} onOpenChange={() => onClose()}>
      <DialogContent className="hz-mw-lg hz-clip hz-col">
        <DialogHeader>
          <DialogTitle className="hz-row hz-ai-center">
            <div className="hz-sq-5 hz-r-md hz-bg-raised hz-bordered hz-row hz-ai-center hz-jc-center hz-mr-3">
              <Bot className="hz-sq-2 hz-fg-muted" />
            </div>
            <Input 
              name="name"
              value={editedAgent.name}
              onChange={handleInputChange}
              className="hz-t-xl hz-w-semibold hz-bg-none hz-border-none hz-px-0"
            />
          </DialogTitle>
        </DialogHeader>

        <div className="hz-row hz-border-b hz-mt-2">
          <button 
            className={`hz-px-4 hz-py-2 hz-t-sm hz-w-medium ${activeTab === 'overview' ? 'hz-fg hz-border-strong' : 'hz-fg-muted hz-link'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`hz-px-4 hz-py-2 hz-t-sm hz-w-medium ${activeTab === 'rag' ? 'hz-fg hz-border-strong' : 'hz-fg-muted hz-link'}`}
            onClick={() => setActiveTab('rag')}
          >
            RAG Sources
          </button>
          <button 
            className={`hz-px-4 hz-py-2 hz-t-sm hz-w-medium ${activeTab === 'settings' ? 'hz-fg hz-border-strong' : 'hz-fg-muted hz-link'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="hz-grow hz-scroll-y hz-py-4">
          {activeTab === 'overview' && (
            <div className="hz-stack-5">
              <div>
                <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Description</label>
                <Textarea 
                  name="description"
                  value={editedAgent.description || ""}
                  onChange={handleInputChange}
                  placeholder="Agent description..."
                  className="hz-bg-surface"
                />
              </div>

              <div className="hz-grid hz-grid-2 hz-gap-5">
                <div>
                  <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Status</label>
                  <div className="hz-card hz-card-tight hz-row hz-ai-center hz-jc-between">
                    <div className="hz-row hz-ai-center">
                      <div className={`hz-sq-1 hz-r-full hz-mr-2 ${
                        editedAgent.status === 'running' ? 'hz-bg-raised' : 
                        editedAgent.status === 'paused' ? 'hz-bg-raised' : 
                        editedAgent.status === 'error' ? 'hz-bg-raised' : 'hz-bg-raised'
                      }`}></div>
                      <span>{
                        editedAgent.status.charAt(0).toUpperCase() + editedAgent.status.slice(1)
                      }</span>
                    </div>
                    {editedAgent.status === 'running' ? (
                      <Button size="sm" variant="ghost" className="hz-sq-5 hz-fg-muted hz-link">
                        <StopCircle className="hz-sq-2" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="hz-sq-5 hz-fg-muted hz-link">
                        <PlayCircle className="hz-sq-2" />
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Model</label>
                  <div className="hz-card hz-card-tight hz-row hz-ai-center">
                    <Input 
                      name="model"
                      value={editedAgent.model}
                      onChange={handleInputChange}
                      className="hz-bg-none hz-border-none hz-p-0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-2">Resource Usage</h3>
                <div className="hz-grid hz-grid-2 hz-gap-4">
                  <div>
                    <div className="hz-row hz-jc-between hz-mb-1">
                      <span className="hz-t-sm hz-fg-muted">CPU</span>
                      <span className="hz-t-sm">{editedAgent.cpu || 0}%</span>
                    </div>
                    <Progress value={editedAgent.cpu || 0} className="hz-bh-1" />
                  </div>
                  <div>
                    <div className="hz-row hz-jc-between hz-mb-1">
                      <span className="hz-t-sm hz-fg-muted">GPU</span>
                      <span className="hz-t-sm">{editedAgent.gpu || 0}%</span>
                    </div>
                    <Progress value={editedAgent.gpu || 0} className="hz-bh-1" />
                  </div>
                  <div>
                    <div className="hz-row hz-jc-between hz-mb-1">
                      <span className="hz-t-sm hz-fg-muted">Memory</span>
                      <span className="hz-t-sm">{editedAgent.memory}%</span>
                    </div>
                    <Progress value={editedAgent.memory} className="hz-bh-1" />
                  </div>
                  <div>
                    <div className="hz-row hz-jc-between hz-mb-1">
                      <span className="hz-t-sm hz-fg-muted">Storage</span>
                      <span className="hz-t-sm">{editedAgent.storage || 0}%</span>
                    </div>
                    <Progress value={editedAgent.storage || 0} className="hz-bh-1" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-2">Usage Statistics</h3>
                <div className="hz-grid hz-grid-4 hz-gap-4">
                  <div className="hz-card hz-card-tight">
                    <h4 className="hz-t-xs hz-fg-muted hz-mb-1">Tokens Used</h4>
                    <p className="hz-t-lg hz-w-medium">{editedAgent.tokens.toLocaleString()}</p>
                  </div>
                  <div className="hz-card hz-card-tight">
                    <h4 className="hz-t-xs hz-fg-muted hz-mb-1">Cost</h4>
                    <p className="hz-t-lg hz-w-medium">${editedAgent.cost.toFixed(2)}</p>
                  </div>
                  <div className="hz-card hz-card-tight">
                    <h4 className="hz-t-xs hz-fg-muted hz-mb-1">Tasks Assigned</h4>
                    <p className="hz-t-lg hz-w-medium">{editedAgent.tasks}</p>
                  </div>
                  <div className="hz-card hz-card-tight">
                    <h4 className="hz-t-xs hz-fg-muted hz-mb-1">Last Active</h4>
                    <p className="hz-t-lg hz-w-medium">{editedAgent.lastActive}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rag' && (
            <div className="hz-grid hz-grid-3 hz-gap-5">
              <div className="hz-border-r hz-px-4">
                <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
                  <h3 className="hz-t-sm hz-w-medium">Knowledge Sources</h3>
                  <Button size="sm" variant="ghost" onClick={handleAddRagSource}>
                    <PlusCircle className="hz-sq-2" />
                  </Button>
                </div>
                <div className="hz-stack-1">
                  {editedAgent.ragSources?.map(source => (
                    <div 
                      key={source.id}
                      className={`hz-p-2 hz-r-md hz-row hz-ai-center hz-jc-between hz-pointer ${
                        selectedRagSource?.id === source.id ? 'hz-bg-raised' : 'hz-hoverable'
                      }`}
                      onClick={() => setSelectedRagSource(source)}
                    >
                      <div className="hz-row hz-ai-center">
                        {source.type === 'database' && <Database className="hz-sq-2 hz-fg-muted hz-mr-2" />}
                        {source.type === 'vector' && <Activity className="hz-sq-2 hz-fg-muted hz-mr-2" />}
                        {source.type === 'file' && <FileText className="hz-sq-2 hz-fg-muted hz-mr-2" />}
                        {source.type === 'api' && <Globe className="hz-sq-2 hz-fg-muted hz-mr-2" />}
                        <span className="hz-t-sm hz-truncate">{source.name}</span>
                      </div>
                      <ChevronRight className="hz-sq-2 hz-fg-muted" />
                    </div>
                  ))}
                  {!editedAgent.ragSources?.length && (
                    <div className="hz-t-sm hz-fg-muted hz-p-2">
                      No knowledge sources added
                    </div>
                  )}
                </div>
              </div>

              <div className="hz-span-2">
                {selectedRagSource ? (
                  <div className="hz-stack-4">
                    <div className="hz-row hz-jc-between">
                      <h3 className="hz-t-sm hz-w-medium">Source Details</h3>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="hz-fg-muted hz-link"
                        onClick={() => handleRemoveRagSource(selectedRagSource.id)}
                      >
                        <Trash2 className="hz-sq-2 hz-mr-1" />
                        Remove
                      </Button>
                    </div>

                    <div>
                      <label className="hz-t-xs hz-fg-muted hz-mb-1">Name</label>
                      <Input 
                        value={selectedRagSource.name}
                        onChange={(e) => {
                          const updated = { ...selectedRagSource, name: e.target.value };
                          handleRagSourceChange(updated);
                          setSelectedRagSource(updated);
                        }}
                        className="hz-bg-surface"
                      />
                    </div>

                    <div>
                      <label className="hz-t-xs hz-fg-muted hz-mb-1">Type</label>
                      <div className="hz-grid hz-grid-4 hz-gap-2">
                        {(['database', 'vector', 'file', 'api'] as const).map(type => (
                          <div 
                            key={type}
                            className={`hz-p-2 hz-bordered hz-r-md hz-col hz-ai-center hz-jc-center hz-pointer ${
                              selectedRagSource.type === type 
                                ? 'hz-border-strong hz-bg-raised' 
                                : 'hz-hoverable'
                            }`}
                            onClick={() => {
                              const updated = { ...selectedRagSource, type };
                              handleRagSourceChange(updated);
                              setSelectedRagSource(updated);
                            }}
                          >
                            {type === 'database' && <Database className="hz-sq-3 hz-fg-muted hz-mb-1" />}
                            {type === 'vector' && <Activity className="hz-sq-3 hz-fg-muted hz-mb-1" />}
                            {type === 'file' && <FileText className="hz-sq-3 hz-fg-muted hz-mb-1" />}
                            {type === 'api' && <Globe className="hz-sq-3 hz-fg-muted hz-mb-1" />}
                            <span className="hz-t-xs">{type}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="hz-t-xs hz-fg-muted hz-mb-1">Connection String</label>
                      <Input 
                        value={selectedRagSource.connection}
                        onChange={(e) => {
                          const updated = { ...selectedRagSource, connection: e.target.value };
                          handleRagSourceChange(updated);
                          setSelectedRagSource(updated);
                        }}
                        className="hz-bg-surface hz-mono hz-t-xs"
                        placeholder={
                          selectedRagSource.type === 'database' ? 'postgres://user:pass@host/db' :
                          selectedRagSource.type === 'vector' ? 'pinecone://index' :
                          selectedRagSource.type === 'file' ? '/path/to/document.pdf' :
                          'https://api.example.com/endpoint'
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="hz-h-full hz-row hz-ai-center hz-jc-center hz-fg-muted hz-t-sm">
                    Select a knowledge source or add a new one
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="hz-stack-5">
              <div>
                <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Agent Type</label>
                <Input 
                  name="type"
                  value={editedAgent.type}
                  onChange={handleInputChange}
                  className="hz-bg-surface"
                />
              </div>

              <div>
                <h3 className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-2">Advanced Settings</h3>
                <div className="hz-card hz-stack-4">
                  <div>
                    <label className="hz-t-xs hz-fg-muted hz-mb-1">Memory Limit (%)</label>
                    <Input 
                      type="number"
                      name="memory"
                      value={editedAgent.memory}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="hz-bg-surface"
                    />
                  </div>
                  
                  <div>
                    <label className="hz-t-xs hz-fg-muted hz-mb-1">Execution Priority</label>
                    <select className="hz-w-full hz-bg-surface hz-r-md hz-p-2 hz-t-sm">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="hz-t-xs hz-fg-muted hz-mb-1">Execution Mode</label>
                    <select className="hz-w-full hz-bg-surface hz-r-md hz-p-2 hz-t-sm">
                      <option>Automatic</option>
                      <option>Manual</option>
                      <option>Scheduled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hz-row hz-jc-end hz-gap-2 hz-pt-4 hz-border-t hz-mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="hz-sq-2 hz-mr-2" />
            Save Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentDetail;
