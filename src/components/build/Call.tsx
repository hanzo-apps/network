import Section, { Eyebrow, H2 } from '@/components/ui/section'
import Reveal from '@/components/ui/reveal'
import Code from '@/components/ui/code'
import Start from '@/components/ui/start'
import { CHAIN_CURL } from './commands'

export default function Call() {
  return (
    <Section id="call">
      <Reveal>
        <Eyebrow>Step 3</Eyebrow>
        <H2>Make a call.</H2>
      </Reveal>
      <Start prices="/pricing#models" swap="Swap the model name to use any chat model." billed="Each request is billed per token." />
      <Reveal className="mt-12 max-w-3xl">
        <Code label="Read the chain, no key needed" text={CHAIN_CURL} />
      </Reveal>
    </Section>
  )
}
