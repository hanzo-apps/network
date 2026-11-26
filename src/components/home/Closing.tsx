import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/button'
import Card from '@/components/ui/card'
import Reveal from './Reveal'
import Section, { H2 } from './Section'
import { EARLY, INVITE_LABEL } from '@/lib/early'

export default function Closing() {
  return (
    <Section glow>
      <Reveal>
        <Card className="p-10 md:p-16">
          <H2>Build on the network.</H2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to={EARLY} className={buttonClass('primary')}>{INVITE_LABEL}</Link>
            <Link to="/build" className={buttonClass('secondary')}>Start building</Link>
          </div>
        </Card>
      </Reveal>
    </Section>
  )
}
