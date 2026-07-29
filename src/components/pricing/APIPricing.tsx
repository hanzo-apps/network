import React from "react";
import { Button } from "@/components/ui/button";

const APIPricing = () => {
  const hanzoModels = [
    {
      name: "Zen",
      fullName: "Zen - Flagship 1T+ Parameter MoDE LLM",
      description: "Our flagship model with 1T+ parameters using Mixture of Diverse Experts (MoDE) architecture. Optimal for complex reasoning, code generation, and multi-domain tasks.",
      features: ["200k context window", "MoDE architecture", "50% discount with batch processing*"],
      pricing: {
        input: "$3 / MTok",
        promptCachingWrite: "$3.75 / MTok",
        promptCachingRead: "$0.30 / MTok",
        output: "$15 / MTok"
      }
    },
    {
      name: "Sho",
      fullName: "Sho - Next-Gen Diffusion LLM",
      description: "Revolutionary diffusion model that delivers faster, cheaper inference with breakthrough efficiency. Perfect for high-throughput applications.",
      features: ["200k context window", "Diffusion architecture", "Ultra-fast inference", "50% discount with batch processing*"],
      pricing: {
        input: "$0.80 / MTok",
        promptCachingWrite: "$1 / MTok",
        promptCachingRead: "$0.08 / MTok",
        output: "$4 / MTok"
      }
    }
  ];

  const tools = [
    {
      name: "Web search",
      description: "Give Zen access to the latest information from the web",
      cost: "$10 / 1K searches*"
    },
    {
      name: "Code execution",
      description: "Run Python code in a sandboxed environment for advanced data analysis",
      details: "50 free hours of usage daily per organization",
      cost: "$0.05 per hour per container for additional usage"
    }
  ];

  const thirdPartyModels = [
    {
      name: "Claude Opus 3",
      features: ["200k context window", "50% discount with batch processing*"],
      pricing: {
        input: "$15 / MTok",
        promptCachingWrite: "$18.75 / MTok",
        promptCachingRead: "$1.50 / MTok",
        output: "$75 / MTok"
      }
    },
    {
      name: "Claude Sonnet 3.7",
      features: ["200k context window", "50% discount with batch processing*"],
      pricing: {
        input: "$3 / MTok",
        promptCachingWrite: "$3.75 / MTok",
        promptCachingRead: "$0.30 / MTok",
        output: "$15 / MTok"
      }
    }
  ];

  const ModelCard = ({ model, isThirdParty = false }) => (
    <div className="hz-card hz-mb-5">
      <div className="hz-row hz-jc-between hz-ai-start hz-mb-4">
        <div className="hz-grow">
          <h3 className="hz-t-2xl hz-w-semibold hz-mb-2">{model.fullName || model.name}</h3>
          {model.description && (
            <p className="hz-fg-muted hz-mb-4 hz-t-lg">{model.description}</p>
          )}
          
          {model.features && (
            <div className="hz-mb-5">
              {model.features.map((feature, index) => (
                <div key={index} className="hz-row hz-ai-center hz-t-sm hz-fg-muted hz-mb-2">
                  <span className="hz-sq-1 hz-bg-raised hz-r-full hz-mr-3"></span>
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="hz-ml-4">
          <Button 
            className="hz-bg-inverse hz-fg-inverse hz-bordered hz-border-strong hz-transition hz-hoverable"
            onClick={() => {
              // Link to cloud signup or checkout
              window.open('https://cloud.hanzo.ai/signup', '_blank');
            }}
          >
            Start Using {model.name}
          </Button>
        </div>
      </div>

      <div className="hz-grid hz-grid-4 hz-gap-4 hz-t-sm hz-bg-surface hz-r-lg hz-p-4">
        <div>
          <span className="hz-fg-muted hz-mb-1">Input</span>
          <div className="hz-w-medium hz-t-lg">{model.pricing.input}</div>
        </div>
        <div>
          <span className="hz-fg-muted hz-mb-1">Output</span>
          <div className="hz-w-medium hz-t-lg">{model.pricing.output}</div>
        </div>
        <div>
          <span className="hz-fg-muted hz-mb-1">Cache Write</span>
          <div className="hz-w-medium hz-t-lg">{model.pricing.promptCachingWrite}</div>
        </div>
        <div>
          <span className="hz-fg-muted hz-mb-1">Cache Read</span>
          <div className="hz-w-medium hz-t-lg">{model.pricing.promptCachingRead}</div>
        </div>
      </div>
    </div>
  );

  const ToolCard = ({ tool }) => (
    <div className="hz-card">
      <h3 className="hz-t-xl hz-w-semibold hz-mb-2">{tool.name}</h3>
      <p className="hz-fg-muted hz-mb-4">{tool.description}</p>
      
      {tool.details && (
        <div className="hz-row hz-ai-center hz-t-sm hz-fg-muted hz-mb-3">
          <span className="hz-sq-1 hz-bg-raised hz-r-full hz-mr-2"></span>
          {tool.details}
        </div>
      )}

      <div className="hz-align-right">
        <span className="hz-fg-muted">Cost</span>
        <div className="hz-w-medium">{tool.cost}</div>
      </div>
    </div>
  );

  return (
    <div className="hz-container hz-mb-7">
      {/* Hanzo Models Section */}
      <div className="hz-mb-7">
        <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Hanzo Foundational Models</h2>
        <p className="hz-fg-muted hz-t-lg hz-mb-6">Our flagship AI models built from the ground up for next-generation applications</p>
        <div className="hz-stack-5 hz-mb-6">
          {hanzoModels.map((model) => (
            <ModelCard key={model.name} model={model} />
          ))}
        </div>
        
        <div className="hz-t-sm hz-fg-muted hz-mb-5">
          *Learn more about <a href="#" className="hz-fg-muted">batch processing</a>
        </div>
        
        <div className="hz-t-sm hz-fg-muted hz-mb-5">
          Customers can purchase prioritized API capacity with Priority Tier
        </div>
        
        <div className="hz-t-sm hz-fg-muted hz-mb-6">
          Prompt caching pricing is for our standard 5-minute TTL; <a href="#" className="hz-fg-muted">extended prompt caching</a> is available at an additional cost
        </div>

        <div className="hz-row hz-jc-center">
          <Button size="lg" className="hz-bg-inverse hz-fg-inverse hz-px-6 hz-py-3 hz-hoverable">
            Start building
          </Button>
        </div>
      </div>

      {/* Tools Section */}
      <div className="hz-mb-7">
        <h2 className="hz-t-2xl hz-w-bold hz-mb-6">Explore pricing for tools</h2>
        <div className="hz-grid hz-grid-2 hz-gap-5 hz-mb-6">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
        
        <div className="hz-t-sm hz-fg-muted hz-mb-6">
          *Does not include input and output tokens required to process requests
        </div>

        <div className="hz-row hz-jc-center">
          <Button size="lg" className="hz-bg-inverse hz-fg-inverse hz-px-6 hz-py-3 hz-hoverable">
            Start building
          </Button>
        </div>
      </div>

      {/* Third-party Models Section */}
      <div className="hz-mb-7">
        <h2 className="hz-t-2xl hz-w-bold hz-mb-6">Explore third-party models</h2>
        <div className="hz-grid hz-grid-2 hz-gap-5">
          {thirdPartyModels.map((model) => (
            <ModelCard key={model.name} model={model} isThirdParty={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIPricing;