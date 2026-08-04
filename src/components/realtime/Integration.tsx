
import React from "react";
import { motion } from "framer-motion";
import { Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define a proper type for the presence event
interface PresenceEvent {
  action: 'join' | 'leave';
  userData: {
    name: string;
    [key: string]: any;
  };
}

const Integration = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Simple Integration
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Add real-time capabilities to your application with just a few lines of code
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-4">Easy to Implement</h3>
            <p className="hz-fg-soft hz-mb-5">
              Hanzo Realtime provides a clean, intuitive API that makes it simple to add 
              real-time functionality to any application. With support for multiple platforms 
              and frameworks, you can get started in minutes.
            </p>
            
            <div className="hz-stack-4 hz-mb-6">
              <div className="hz-row hz-ai-start">
                <div className="hz-sq-4 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mr-3 hz-mt-1">
                  <span className="hz-fg-muted hz-t-sm hz-w-bold">1</span>
                </div>
                <div>
                  <h4 className="hz-fg hz-w-medium hz-mb-1">Initialize the client</h4>
                  <p className="hz-fg-muted hz-t-sm">Connect to the Hanzo Realtime service with your API key</p>
                </div>
              </div>
              
              <div className="hz-row hz-ai-start">
                <div className="hz-sq-4 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mr-3 hz-mt-1">
                  <span className="hz-fg-muted hz-t-sm hz-w-bold">2</span>
                </div>
                <div>
                  <h4 className="hz-fg hz-w-medium hz-mb-1">Subscribe to channels</h4>
                  <p className="hz-fg-muted hz-t-sm">Listen for updates on specific channels or topics</p>
                </div>
              </div>
              
              <div className="hz-row hz-ai-start">
                <div className="hz-sq-4 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mr-3 hz-mt-1">
                  <span className="hz-fg-muted hz-t-sm hz-w-bold">3</span>
                </div>
                <div>
                  <h4 className="hz-fg hz-w-medium hz-mb-1">Publish messages</h4>
                  <p className="hz-fg-muted hz-t-sm">Send updates to all connected clients instantly</p>
                </div>
              </div>
            </div>
            
            <Button className="hz-bg-raised hz-hoverable">
              View Documentation <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Code className="hz-sq-3 hz-fg-muted hz-mr-2" />
              <span className="hz-fg-soft">JavaScript Example</span>
            </div>
            
            <div className="hz-bg-surface hz-r-lg hz-p-4 hz-mono hz-t-sm hz-scroll-y">
              <div className="hz-fg-muted">// Initialize the Hanzo Realtime client</div>
              <div className="hz-fg-soft">import {`{ Realtime }`} from '@hanzo/cloud';</div>
              <div className="hz-fg-soft hz-mb-4">const realtime = new Realtime('YOUR_API_KEY');</div>
              
              <div className="hz-fg-muted">// Subscribe to a channel</div>
              <div className="hz-fg-soft">const channel = await realtime.subscribe('chat-room', {`{`}</div>
              <div className="hz-fg-soft hz-px-4">onMessage: (message) {`=>`} {`{`}</div>
              <div className="hz-fg-soft hz-px-6">console.log('New message received:', message);</div>
              <div className="hz-fg-soft hz-px-6">// Update your UI with the message</div>
              <div className="hz-fg-soft hz-px-6">appendMessageToChat(message);</div>
              <div className="hz-fg-soft hz-px-4">{`}`},</div>
              <div className="hz-fg-soft hz-px-4">onPresence: (event: PresenceEvent) {`=>`} {`{`}</div>
              <div className="hz-fg-soft hz-px-6">if (event.action === 'join') {`{`}</div>
              <div className="hz-fg-soft hz-px-6">{`console.log(\`\${event.userData.name} joined the chat\`);`}</div>
              <div className="hz-fg-soft hz-px-6">{`}`} else {`{`}</div>
              <div className="hz-fg-soft hz-px-6">{`console.log(\`\${event.userData.name} left the chat\`);`}</div>
              <div className="hz-fg-soft hz-px-6">{`}`}</div>
              <div className="hz-fg-soft hz-px-4">{`}`}</div>
              <div className="hz-fg-soft">{`}`});</div>
              <div className="hz-fg-soft hz-mb-4"></div>
              
              <div className="hz-fg-muted">// Publish a message to the channel</div>
              <div className="hz-fg-soft">await realtime.publish('chat-room', {`{`}</div>
              <div className="hz-fg-soft hz-px-4">user: {`{`}</div>
              <div className="hz-fg-soft hz-px-6">id: 'user-123',</div>
              <div className="hz-fg-soft hz-px-6">name: 'Alice'</div>
              <div className="hz-fg-soft hz-px-4">{`}`},</div>
              <div className="hz-fg-soft hz-px-4">text: 'Hello, world!',</div>
              <div className="hz-fg-soft hz-px-4">timestamp: new Date().toISOString()</div>
              <div className="hz-fg-soft">{`}`});</div>
              <div className="hz-fg-soft hz-mb-4"></div>
              
              <div className="hz-fg-muted">// Clean up when done</div>
              <div className="hz-fg-soft">await channel.unsubscribe();</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integration;
