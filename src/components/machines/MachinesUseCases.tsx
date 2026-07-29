
import React from 'react';
import ChromeText from "@/components/ui/chrome-text";

const UseCaseCard = ({ title, description, features }) => {
  return (
    <div className="hz-card">
      <h3 className="hz-t-2xl hz-w-bold hz-mb-4">{title}</h3>
      <p className="hz-fg-soft hz-mb-4">
        {description}
      </p>
      <ul className="hz-stack-2 hz-fg-soft">
        {features.map((feature, index) => (
          <li key={index} className="hz-row hz-ai-start">
            <span className="hz-fg-muted hz-mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MachinesUseCases = () => {
  const useCases = [
    {
      title: "ML Training",
      description: "Train large-scale AI models with high-performance GPU clusters and optimized ML frameworks.",
      features: [
        "Multi-GPU instances with NVLink",
        "Distributed training across multiple machines",
        "Pre-installed PyTorch, TensorFlow, and JAX"
      ]
    },
    {
      title: "Inference Optimization",
      description: "Deploy models for inference with optimized runtime configurations.",
      features: [
        "GPU-accelerated inference endpoints",
        "Automatic model quantization and optimization",
        "Horizontal scaling for high-throughput demands"
      ]
    },
    {
      title: "High-Performance Computing",
      description: "Run scientific simulations, financial modeling, and other compute-intensive workloads.",
      features: [
        "High core-count CPU machines",
        "MPI and other HPC frameworks pre-installed",
        "Bare metal performance with containerized convenience"
      ]
    },
    {
      title: "Large Language Models",
      description: "Run and fine-tune frontier Large Language Models with optimized environments.",
      features: [
        "Optimized for LLaMA, Falcon, and other open LLMs",
        "LoRA and QLoRA fine-tuning support",
        "Seamless integration with Hanzo AI endpoints"
      ]
    }
  ];

  return (
    <section className="hz-py-7">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
            Designed for AI Workloads
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Optimized infrastructure for every stage of machine learning and AI development
          </p>
        </div>
        
        <div className="hz-grid hz-grid-2 hz-gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              description={useCase.description}
              features={useCase.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachinesUseCases;
