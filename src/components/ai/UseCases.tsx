
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, BookOpen, Search, FileCode, Database, Brain, Headphones } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: MessageSquare,
      title: 'Conversational AI',
      description: 'Build intelligent chatbots, virtual assistants, and customer support agents with natural language understanding.',
      color: 'hz-bg-surface',
      textColor: 'hz-fg-muted'
    },
    {
      icon: Brain,
      title: 'Generative Content',
      description: 'Create text, images, code, and other content with AI-powered generation and customization.',
      color: 'hz-bg-surface',
      textColor: 'hz-fg-muted'
    },
    {
      icon: Search,
      title: 'Knowledge Retrieval',
      description: 'Implement semantic search, question answering, and information extraction from your data.',
      color: 'hz-bg-surface',
      textColor: 'hz-fg-muted'
    },
    {
      icon: Bot,
      title: 'Autonomous Agents',
      description: 'Deploy AI agents that can perform complex tasks, make decisions, and execute workflows autonomously.',
      color: 'hz-bg-surface',
      textColor: 'hz-fg-muted'
    },
    {
      icon: FileCode,
      title: 'Developer Tooling',
      description: 'Enhance your development workflow with AI-powered code generation, debugging, and documentation.',
      color: 'hz-bg-surface',
      textColor: 'hz-fg-muted'
    },
    {
      icon: Headphones,
      title: 'Voice & Speech',
      description: 'Convert speech to text, text to speech, and analyze voice interactions with advanced AI models.',
      color: 'hz-bg-surface',
      textColor: 'hz-fg-muted'
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel">
      {/* Background elements */}
      <div className="hz-abs hz-top-0 hz-left-0 hz-w-full hz-h-full hz-clip hz-no-pointer">
        <div className="hz-sq-8 hz-abs hz-right-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
        <div className="hz-sq-8 hz-abs hz-bottom-0 hz-left-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
      </div>

      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
              Versatile AI Use Cases
            </h2>
            <p className="hz-t-xl hz-fg-soft">
              Hanzo's AI platform supports a wide range of intelligent applications across industries
            </p>
          </motion.div>
        </div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <div className={`hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-5 hz-transition ${useCase.color} hz-hoverable`}>
                <useCase.icon className={`hz-sq-5 ${useCase.textColor}`} />
              </div>
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">{useCase.title}</h3>
              <p className="hz-fg-muted">{useCase.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Implementation example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hz-mt-7 hz-bg-surface hz-bordered hz-r-lg hz-clip"
        >
          <div className="hz-col-row">
            <div className="hz-p-6 hz-col hz-jc-center">
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">Simple Implementation</h3>
              <p className="hz-fg-muted hz-mb-5">
                Build powerful AI applications with just a few lines of code using our intuitive SDK
              </p>
              <div className="hz-bg-surface hz-r-lg hz-p-4 hz-mono hz-t-sm hz-fg-soft hz-scroll-x">
                <pre>
{`import { Hanzo } from '@hanzo/ai';

// Initialize the Hanzo AI client
const hanzo = new Hanzo({
  apiKey: process.env.HANZO_API_KEY
});

// Create a conversation with memory
const conversation = hanzo.conversation({
  model: 'gpt-4o',
  memory: true,
  system: 'You are a helpful assistant'
});

// Send a message and get a response
const response = await conversation.send('Tell me about AI engineering');

console.log(response);`}
                </pre>
              </div>
            </div>
            <div className="hz-bg-surface hz-p-6 hz-col">
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-4 hz-row hz-ai-center">
                <BookOpen className="hz-sq-2 hz-mr-2 hz-fg-muted" />
                Documentation Example
              </h4>
              <div className="hz-col hz-h-full hz-stack-4 hz-scroll-y">
                <div className="hz-bg-surface hz-r-lg hz-p-4">
                  <div className="hz-row hz-ai-center hz-mb-2">
                    <Database className="hz-sq-2 hz-fg-muted hz-mr-2" />
                    <h5 className="hz-fg-muted hz-w-medium">Vector Search</h5>
                  </div>
                  <pre className="hz-t-xs hz-fg-soft hz-scroll-x">
{`// Create a vector store
const vectorStore = hanzo.vectorStore('');

// Add documents to the store
await vectorStore.addDocuments([
  { text: 'AI engineering best practices...' },
  { text: 'Deploying models to production...' }
]);

// Search for similar documents
const results = await vectorStore.search(
  'How to deploy AI models?', 
  { limit: 3 }
);`}
                  </pre>
                </div>

                <div className="hz-bg-surface hz-r-lg hz-p-4">
                  <div className="hz-row hz-ai-center hz-mb-2">
                    <Bot className="hz-sq-2 hz-fg-muted hz-mr-2" />
                    <h5 className="hz-fg-muted hz-w-medium">AI Agents</h5>
                  </div>
                  <pre className="hz-t-xs hz-fg-soft hz-scroll-x">
{`// Create an agent with tools
const agent = hanzo.agent({
  model: 'claude-3-opus',
  tools: [
    hanzo.tools.webSearch(),
    hanzo.tools.codeInterpreter(),
    vectorStore.asTool('knowledge')
  ]
});

// Run the agent with a task
const result = await agent.run(
  'Analyze our production metrics and suggest optimizations'
);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
