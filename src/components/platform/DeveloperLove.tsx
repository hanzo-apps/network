
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tweets = [
  {
    name: "Bob Jones",
    handle: "@heybobjones",
    content: "Installed @umami_software with @Hanzo in 60 seconds. Then did it again on AWS with a new Ubuntu 24 instance, Docker, Nginx, Postgres, Certbot and Cloudflare in 60 minutes.",
    avatar: "/placeholder.svg"
  },
  {
    name: "Fabio Coelho",
    handle: "@fccoelho7",
    content: "this week I swapped @heroku with @Hanzo, no more annoying redis/postgres obligatory updates anymore.. in love with Hanzo's docker support",
    avatar: "/placeholder.svg"
  },
  {
    name: "Lyes",
    handle: "@lyker_zi",
    content: "There is an easier option. Deploying literally anything on @Hanzo",
    avatar: "/placeholder.svg"
  },
  {
    name: "Benjamin Klieger",
    handle: "@BenjaminKlieger",
    content: "\"Ship your apps, databases, and more to production in seconds.\"@Hanzo is not exaggerating, it's a breeze to deploy. Bringing Infinite Bookshelf online with a custom domain took minutes… and that just because I had to create a Dockerfile!",
    avatar: "/placeholder.svg"
  },
  {
    name: "kinsyu",
    handle: "@kinsyudev",
    content: "Addicted to organising my services in @Hanzo",
    avatar: "/placeholder.svg"
  },
  {
    name: "Sam Newby",
    handle: "@SamNewby_",
    content: "The UX in deploying a new app on @Hanzo is probably the best I've ever used. Spinning up a new MySQL database was so easy and fast.",
    avatar: "/placeholder.svg"
  },
  {
    name: "flavio",
    handle: "@flaviocopes",
    content: "I'm using @Hanzo_App to get a PostgreSQL database in the cloud and tbh it feels like magic",
    avatar: "/placeholder.svg"
  },
  {
    name: "Kyle McDonald",
    handle: "@kpmdev",
    content: "Damn, @Hanzo is by far the fastest I've ever got up and running on a host. What an insanely good experience.",
    avatar: "/placeholder.svg"
  }
];

const DeveloperLove = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">…and loved by developers</h2>
          <div className="hz-row hz-jc-center">
            <a 
              href="https://twitter.com/search?q=hanzo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hz-inline hz-ai-center hz-fg-muted hz-transition hz-link"
            >
              Join nearly 1M developers building with Hanzo <ArrowRight className="hz-sq-2 hz-ml-2" />
            </a>
          </div>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-4">
          {tweets.map((tweet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="hz-card"
            >
              <div className="hz-row hz-ai-center hz-mb-3">
                <img
                  src={tweet.avatar}
                  alt={tweet.name}
                  className="hz-sq-6 hz-r-full hz-object-cover hz-mr-3"
                />
                <div>
                  <h4 className="hz-w-semibold hz-fg">{tweet.name}</h4>
                  <p className="hz-t-sm hz-fg-muted">{tweet.handle}</p>
                </div>
              </div>
              <p className="hz-fg-soft hz-t-sm">{tweet.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperLove;
