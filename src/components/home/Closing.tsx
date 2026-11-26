import { buttonClass } from '@/components/ui/button'
import Card from '@/components/ui/card'
import Reveal from './Reveal'
import Section, { H2 } from './Section'

export default function Closing() {
  return (
    <Section glow>
      <Reveal>
        <Card className="p-10 md:p-16">
        <H2>Start with an API key.</H2>
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
