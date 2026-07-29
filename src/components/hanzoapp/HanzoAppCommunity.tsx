
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const TweetCard = ({ username, handle, content, date, replies }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-card hz-transition hz-card-interactive"
    >
      <div className="hz-row hz-ai-center hz-mb-4">
        <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-fg hz-t-xl hz-w-bold">
          {username[0]}
        </div>
        <div className="hz-ml-3">
          <div className="hz-w-bold">{username}</div>
          <div className="hz-fg-muted">@{handle}</div>
        </div>
      </div>
      <div className="hz-fg-soft hz-mb-4">{content}</div>
      <div className="hz-row hz-ai-center hz-jc-between hz-t-sm hz-fg-muted">
        <div>{date}</div>
        <div className="hz-row hz-ai-center">
          <MessageSquare className="hz-sq-2 hz-mr-1" /> {replies}
        </div>
      </div>
    </motion.div>
  );
};

const HanzoAppCommunity = () => {
  const tweets = [
    {
      username: "Siddhant Gupta",
      handle: "Siddhan65490545",
      content: "Finally after a month of relentless trial and error, I've successfully created an AI persona bot emulating the teaching style of my mentor @abnux, the founder of @10kdesigners. Excited to share my journey in this twitter thread. 🤖🎨 \"Sound on 🎙️🔊\"",
      date: "9:43 AM · Oct 10, 2023",
      replies: "261"
    },
    {
      username: "Shubham Saboo",
      handle: "Saboo_Shubham_",
      content: "Hanzo AI is trending on GitHub. It's an open-source drag & drop UI tool that lets you build custom LLM apps in just minutes. Powered by LangChain, it features: - Ready-to-use app templates - Conversational agents that remember - Seamless deployment on cloud platforms",
      date: "11:05 PM · Aug 15, 2023",
      replies: "522"
    },
    {
      username: "Muratcan",
      handle: "koylanai",
      content: "When you lose momentum, it's hard to regain it. But here we go again, building a Personal Cockpit with AI Agents. I've built a chatbot connected to the internet and various APIs, linking it to multiple workflows and AI agents. Here's the first demo: 1. AI Newsletter Agent…",
      date: "1:42 AM · Oct 8, 2023",
      replies: "465"
    },
    {
      username: "Eugene",
      handle: "sudo_eugene",
      content: "Using our new AI bot called Koos with @Hanzo AI to create project management tasks in Notion, right from Slack 🤯 Let me know who would like to see a 5min explainer on how we did this 🎉",
      date: "3:39 AM · Sep 20, 2023",
      replies: "16"
    },
    {
      username: "Lior⚡",
      handle: "LiorOnAI",
      content: "Hanzo AI just reached 12,000 stars on Github. It allows you to build customized LLM apps using a simple drag & drop UI. You can even use built-in templates with logic and conditions connected to LangChain and GPT: ▸ Conversational agent with memory ▸ Chat with PDF and Excel…",
      date: "11:33 AM · Aug 10, 2023",
      replies: "833"
    },
    {
      username: "Derek Cheung",
      handle: "derekcheungsa",
      content: "A multi-modal chatbot that effortlessly merges text and image generation into seamless conversations. 🚀 📢 Watch the demo with conversation starting with asking for advice on building strong financial habits (sped up slightly for demo) 🪄Chatbot magically generates a visual…",
      date: "10:11 PM · Oct 1, 2023",
      replies: "21"
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Community 🫶</h2>
          <p className="hz-t-xl hz-fg-soft hz-mb-6">
            Open source community is the heart of Hanzo AI. See why developers love and build using Hanzo AI
          </p>
          <Button 
            size="lg"
            className="hz-bg-raised hz-fg hz-hoverable"
          >
            Join Discord
          </Button>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {tweets.map((tweet, index) => (
            <TweetCard 
              key={index}
              username={tweet.username}
              handle={tweet.handle}
              content={tweet.content}
              date={tweet.date}
              replies={tweet.replies}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HanzoAppCommunity;
