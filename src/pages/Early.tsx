import { Link } from 'react-router-dom'
import Section, { container, Eyebrow, H2 } from '@/components/home/Section'
import Reveal from '@/components/home/Reveal'
import { buttonClass, textLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { DISCORD, NODE_GUIDE, X } from '@/lib/links'

const CARD = 'flex h-full flex-col p-6'

export default function Early() {
  return (
    <div>
      <header className={`${container} pb-[72px] pt-[72px] md:pb-32 md:pt-32`}>
        <Eyebrow>Early access</Eyebrow>
        <h1 className="text-6xl font-[560] leading-[1.0] tracking-[-0.045em] md:text-7xl">Early access is invite-only.</h1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">Codes are not being issued yet.</p>
      </header>

      <Section>
        <H2>Where invites will appear.</H2>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          <li>
            <Reveal index={0} className="h-full">
              <Card className={CARD}>
                <h3 className="text-2xl font-semibold">Discord</h3>
                <a href={DISCORD} className={`${textLink} mt-3 self-start`}>
                  Join the Hanzo server.
                </a>
              </Card>
            </Reveal>
          </li>
          <li>
            <Reveal index={1} className="h-full">
              <Card className={CARD}>
                <h3 className="text-2xl font-semibold">X</h3>
                <a href={X} className={`${textLink} mt-3 self-start`}>
                  Follow @hanzoai.
                </a>
              </Card>
            </Reveal>
          </li>
        </ul>
      </Section>

      <Section>
        <H2>What you can do today.</H2>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          <li>
            <Reveal index={0} className="h-full">
              <Card className={CARD}>
                <h3 className="text-2xl font-semibold">Start building</h3>
                <p className="mt-3 text-muted-foreground">Connect your agent, point it at the network, make a call.</p>
                <div className="mt-auto pt-6">
                  <Link to="/build" className={buttonClass('primary')}>
                    Start building
                  </Link>
                </div>
              </Card>
            </Reveal>
          </li>
          <li>
            <Reveal index={1} className="h-full">
              <Card className={CARD}>
                <h3 className="text-2xl font-semibold">Run a node</h3>
                <p className="mt-3 text-muted-foreground">Enroll a node, run tools and agents, get paid per job. Enrolling needs a registration code.</p>
                <div className="mt-auto pt-6">
                  <a href={NODE_GUIDE} className={buttonClass('secondary')}>
                    Run a node
                  </a>
                </div>
              </Card>
            </Reveal>
          </li>
        </ul>
      </Section>
    </div>
  )
}
