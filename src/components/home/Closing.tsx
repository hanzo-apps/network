import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/button'
import Card from '@/components/ui/card'
import Reveal from '@/components/ui/reveal'
import Section, { H2 } from '@/components/ui/section'

export default function Closing() {
  return (
    <Section glow>
      <Reveal>
        <Card className="p-10 md:p-16">
          <H2>Build on the network.</H2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/early" className={buttonClass('primary')}>Early access</Link>
            <Link to="/build" className={buttonClass('secondary')}>Start building</Link>
          </div>
        </Card>
      </Reveal>
    </Section>
  )
}
