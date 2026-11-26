import Section, { Eyebrow, H2 } from '@/components/home/Section'
import Reveal from '@/components/home/Reveal'
import Code from '@/components/ui/code'
import Start from '@/components/pricing/Start'
import { CHAIN_CURL } from './commands'

export default function Call() {
  return (
    <Section id="call">
      <Reveal>
        <Eyebrow>Step 3</Eyebrow>
        <H2>Make a call.</H2>
      </Reveal>
      <Start prices="/pricing#models" />
      <Reveal className="mt-12 max-w-3xl">
        <Code label="Read the chain, no key needed" text={CHAIN_CURL} />
      </Reveal>
    </Section>
  )
}
