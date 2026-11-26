import Section, { Eyebrow, H2 } from '@/components/home/Section'
import Reveal from '@/components/home/Reveal'
import Code from '@/components/ui/code'
import { DOCS_LLMS, DOCS_LLMS_FULL, DOCS_MCP } from '@/lib/links'
import { COMMANDS } from './commands'

const link = 'inline-flex min-h-11 items-center text-foreground underline underline-offset-4'

export default function Agent() {
  return (
    <Section id="agent">
      <Reveal>
        <Eyebrow>Step 1</Eyebrow>
        <H2>Connect your agent first.</H2>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">Hanzo's MCP server gives your coding agent Hanzo's tools and docs.</p>
      </Reveal>
      <Reveal className="mt-10 grid items-start gap-4 md:grid-cols-2">
        {COMMANDS.map((c) => (
          <Code key={c.label} label={c.label} text={c.text} />
        ))}
      </Reveal>
      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
        <a href="/llms.txt" className={link}>hanzo.network/llms.txt</a>
        <a href={DOCS_LLMS} className={link}>docs.hanzo.ai/llms.txt</a>
        <a href={DOCS_LLMS_FULL} className={link}>docs.hanzo.ai/llms-full.txt</a>
        <a href={DOCS_MCP} className={link}>MCP docs</a>
      </p>
    </Section>
  )
}
