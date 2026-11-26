import Closing from '@/components/home/Closing'
import Hero from '@/components/home/Hero'
import How from '@/components/home/How'
import Latest from '@/components/home/Latest'
import Phases from '@/components/home/Phases'
import Pillars from '@/components/home/Pillars'
import Solutions from '@/components/home/Solutions'
import Stack from '@/components/home/Stack'
import Token from '@/components/home/Token'

export default function NetworkLanding() {
  return (
    <>
      <Hero />
      <Solutions />
      <Pillars />
      <How />
      <Phases />
      <Token />
      <Latest />
      <Closing />
      <Stack />
    </>
  )
}
