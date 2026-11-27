import { Link } from 'react-router'
import Gate from '@/components/early/Gate'
import Queue from '@/components/early/Queue'
import Section, { container, Eyebrow, H1, H2 } from '@/components/ui/section'
import Reveal from '@/components/ui/reveal'
import { buttonClass, textLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { DISCORD, NODE_GUIDE, X } from '@/lib/links'

const CARD = 'flex h-full flex-col p-6'

export default function Early() {
  return (
    <div>
      <header className={`${container} pb-12 pt-[72px] md:pb-16 md:pt-32`}>
        <Eyebrow>Early access</Eyebrow>
        <H1>Enter your invite code.</H1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">Early access to the network is invite-only.</p>
      </header>

      <Gate />
      <Queue />

      <Section id="invites">
        <H2>Where invites come from.</H2>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">Hanzo issues invite codes.</p>
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
                  <Link to="/build" className={buttonClass('secondary')}>
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
