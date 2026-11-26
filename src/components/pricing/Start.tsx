import { useAnalytics } from '@hanzo/event/react'
import Card from '@/components/ui/card'
import { buttonClass } from '@/components/ui/button'
import Code from '@/components/ui/code'
import Glow from '@/components/pricing/Glow'
import { CURL_QUICKSTART } from '@/components/build/commands'
import { API_KEYS, HANZO_CHAT } from '@/lib/links'

const num = 'text-5xl font-semibold text-foreground/90'

/** The three-step first call. `prices` is where "See all prices" goes: the models list on /pricing itself (the default), or the pricing page from elsewhere. */
export default function Start({ prices = '#models' }: { prices?: string }) {
  const here = prices.startsWith('#') // the models are on this page, below
  const keys = useAnalytics().link(API_KEYS) // carries the visitor's anonymous id to the sign-in, as /login does
  return (
    <>
      <div className="relative mt-10">
        <Glow />
        <ol className="grid gap-4 lg:grid-cols-[1fr_1.6fr_1fr]">
          <li>
            <Card className="h-full p-6">
              <p className={num}>01</p>
              <h3 className="mt-4 text-xl font-semibold">Get an API key</h3>
              <p className="mt-2 text-muted-foreground">Sign in with your Hanzo account and create a key.</p>
              <a href={keys} className={`${buttonClass('primary')} mt-6`}>
                Get an API key
              </a>
            </Card>
          </li>
          <li className="min-w-0">
            <Card className="h-full p-6">
              <p className={num}>02</p>
              <h3 className="mt-4 text-xl font-semibold">Make your first call</h3>
              <Code label="curl" name="curl command" text={CURL_QUICKSTART} className="mt-4" />
              <p className="mt-3 text-sm text-muted-foreground">
                OpenAI-compatible. {here ? 'Swap the model name to use any chat model below.' : 'Swap the model name to use any chat model.'}
              </p>
            </Card>
          </li>
          <li>
            <Card className="h-full p-6">
              <p className={num}>03</p>
              <h3 className="mt-4 text-xl font-semibold">Pay for what you use</h3>
              <p className="mt-2 text-muted-foreground">
                {here ? 'Each request is billed per token at the prices below.' : 'Each request is billed per token.'}
              </p>
              <a href={prices} className="mt-6 inline-block text-foreground underline underline-offset-4">
                See all prices
              </a>
            </Card>
          </li>
        </ol>
      </div>
      <p className="mt-8 text-muted-foreground">
        Want to try first?{' '}
        <a href={HANZO_CHAT} className="text-foreground underline underline-offset-4">
          Ask Hanzo Chat, free, no sign-in.
        </a>
      </p>
    </>
  )
}
