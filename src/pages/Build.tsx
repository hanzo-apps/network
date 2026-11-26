import Agent from '@/components/build/Agent'
import Call from '@/components/build/Call'
import Earn from '@/components/build/Earn'
import Network from '@/components/build/Network'
import { container, Eyebrow } from '@/components/home/Section'

export default function Build() {
  return (
    <div className="pt-[72px] md:pt-32">
      <header className={`${container} pb-[72px] md:pb-32`}>
        <Eyebrow>Build</Eyebrow>
        <h1 className="text-6xl font-[560] leading-[1.0] tracking-[-0.045em] md:text-7xl">Start building.</h1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">Connect your agent, point it at the network, make a call.</p>
      </header>
      <Agent />
      <Network />
      <Call />
      <Earn />
    </div>
  )
}
