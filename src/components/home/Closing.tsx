import { buttonClass } from '@/components/ui/button'
import Card from '@/components/ui/card'
import Reveal from './Reveal'
import Section from './Section'

export default function Closing() {
  return (
    <Section glow>
      <Reveal>
        <Card className="p-10 md:p-16">
        <h2 className="text-5xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">Start with an API key.</h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href="https://platform.hanzo.ai/api-keys" className={buttonClass('primary')}>
            Get an API key
          </a>
          <a href="#provide" className="rounded-sm text-base text-muted-foreground underline underline-offset-4 hover:text-foreground">
            or provide compute
          </a>
        </div>
        </Card>
      </Reveal>
    </Section>
  )
}
