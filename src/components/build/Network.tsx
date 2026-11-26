import type { ReactNode } from 'react'
import Section, { Eyebrow, H2 } from '@/components/home/Section'
import Reveal from '@/components/home/Reveal'
import Card from '@/components/ui/card'
import { CopyButton } from '@/components/ui/code'
import { useChain } from '@/lib/chain'
import { count } from '@/lib/format'
import { Link } from 'react-router-dom'
import Code from '@/components/ui/code'
import Tag from '@/components/ui/tag'
import { DOCS_NETWORK, EXPLORER, NODE_GUIDE, NODE_REPO, STATUS } from '@/lib/links'
import { NETWORKS } from '@/lib/networks'
import { DEVNET_COMMAND, VALIDATOR_COMMAND } from './commands'

const link = 'text-foreground underline underline-offset-4'
const cmd = 'font-mono text-[0.9em] text-foreground'
const mono = 'font-mono text-sm break-all'

/** One network's cell. Under 768px each cell stacks and names its network; from 768px the header row does that. */
const Cell = ({ name, children }: { name: string; children: ReactNode }) => (
  <td role="cell" className="block min-w-0 px-5 py-3 align-top md:table-cell md:py-4">
    <span aria-hidden className="mb-1 block font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground md:hidden">{name}</span>
    {children}
  </td>
)

const Row = ({ label, cells }: { label: string; cells: ReactNode[] }) => (
  <tr role="row" className="block border-t border-border py-3 first:border-t-0 md:table-row md:py-0">
    <th role="rowheader" scope="row" className="block px-5 pb-1 text-left font-mono text-xs font-normal uppercase tracking-[0.18em] text-muted-foreground md:table-cell md:py-4">
      {label}
    </th>
    {cells.map((c, i) => (
      <Cell key={NETWORKS[i].name} name={NETWORKS[i].name}>{c}</Cell>
    ))}
  </tr>
)

const Rpc = ({ url, name }: { url: string; name: string }) => (
  <div className="flex flex-col items-start gap-2">
    <code className={mono}>{url}</code>
    <CopyButton text={url} name={name} />
  </div>
)

/** The latest block of one chain: an empty box the height of a number while loading, the number, or "unavailable". */
function Block({ rpc }: { rpc: string }) {
  const s = useChain(rpc)
  return (
    <span className="inline-block min-h-6 tabular-nums">
      {s.status === 'live' ? count(s.height) : s.status === 'down' ? <span className="text-muted-foreground">unavailable</span> : null}
    </span>
  )
}

const None = () => (
  <>
    <span aria-hidden>—</span>
    <span className="sr-only">None</span>
  </>
)

const [main, test] = NETWORKS

export default function Network() {
  return (
    <Section id="network">
      <Reveal>
        <Eyebrow>Step 2</Eyebrow>
        <H2>Network details.</H2>
      </Reveal>
      <Reveal className="mt-10">
        <Card className="p-0">
          <table role="table" className="block w-full text-left md:table">
            <caption className="sr-only">Hanzo networks: RPC, chain ID, latest block, explorer and docs</caption>
            <thead role="rowgroup" className="sr-only md:not-sr-only md:table-header-group">
              <tr role="row">
                <th role="columnheader" scope="col" className="px-5 py-4"><span className="sr-only">Detail</span></th>
                {NETWORKS.map((n) => (
                  <th key={n.name} role="columnheader" scope="col" className="px-5 py-4 text-left font-mono text-xs font-normal uppercase tracking-[0.18em] text-foreground">
                    {n.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup" className="block md:table-row-group">
              <Row
                label="RPC"
                cells={[
                  <Rpc key="m" url={main.rpc} name="mainnet RPC" />,
                  <Rpc key="t" url={test.rpc} name="testnet RPC" />,
                  <p key="d" className="text-sm">
                    Local: <code className="font-mono">{DEVNET_COMMAND}</code>{' '}
                    <a href={NODE_REPO} className={link}>needs a committee file, see the node README</a>
                  </p>,
                ]}
              />
              <Row label="Chain ID" cells={NETWORKS.map((n) => <span key={n.name} className="tabular-nums">{n.chainId}</span>)} />
              <Row label="Currency" cells={NETWORKS.map((n) => (n.currency ? <span key={n.name}>{n.currency}</span> : <None key={n.name} />))} />
                <Row label="Latest block" cells={[<Block key="m" rpc={main.rpc} />, <Block key="t" rpc={test.rpc} />, <span key="d">local</span>]} />
              <Row
                label="Explorer"
                cells={[
                  <a key="m" href={EXPLORER} className={link}>explore.hanzo.network</a>,
                  <None key="t" />,
                  <None key="d" />,
                ]}
              />
              <Row
                label="Docs"
                cells={[
                  <a key="m" href={DOCS_NETWORK} className={link}>Network docs</a>,
                  <a key="t" href={DOCS_NETWORK} className={link}>Network docs</a>,
                  <a key="d" href={NODE_GUIDE} className={link}>Node operator guide</a>,
                ]}
              />
            </tbody>
          </table>
        </Card>
      </Reveal>
      <p className="mt-6 max-w-[60ch] text-sm text-muted-foreground">
        AI is the chain's native coin. The 2 trillion cap and mining policy are designed and not active.{' '}
        <Link to="/economics" className={link}>Economics</Link>
      </p>
      <Reveal className="mt-12 grid items-start gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <Tag is="In progress" />
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.01em]">Run a validator.</h3>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
            Opts this machine in: hanzod fetches, verifies and starts the chain as a child process. Works with mainnet, testnet or devnet; <code className={cmd}>hanzo chain status</code> shows where it stands and{' '}
            <code className={cmd}>hanzo chain down</code> opts out. Mining rewards stay off until the launch gates pass.
          </p>
          <a href={NODE_REPO} className={`${link} inline-flex min-h-11 items-center`}>Node on GitHub</a>
        </div>
        <Code label="Run a validator" text={VALIDATOR_COMMAND} />
      </Reveal>
      <p className="mt-6">
        <a href={STATUS} className={`${link} inline-flex min-h-11 items-center`}>Platform status</a>
      </p>
    </Section>
  )
}
