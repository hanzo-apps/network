import Agent from '@/components/build/Agent'
import Call from '@/components/build/Call'
import Earn from '@/components/build/Earn'
import Network from '@/components/build/Network'
import { container, Eyebrow, H1 } from '@/components/ui/section'

export default function Build() {
  return (
    <div className="pt-[72px] md:pt-32">
      <header className={`${container} pb-[72px] md:pb-32`}>
        <Eyebrow>Build</Eyebrow>
        <H1>Start building.</H1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">Connect your agent, point it at the network, make a call.</p>
      </header>
      <Agent />
      <Network />
      <Call />
      <Earn />
    </div>
  )
}
