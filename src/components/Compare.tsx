import Tag from '@/components/ui/tag'
import { WHITEPAPER_PDF } from '@/lib/links'

const ROWS = [
  ['Synthetic AI-like mining shows hardware was spent. Nobody asked for the result.', 'Only jobs someone requested and admitted beforehand count.'],
  ['Signed GPU attestors add a new authority to trust.', 'Any ordinary CPU can check the work.'],
  ['Validator votes are judgment. They can earn fees.', 'A vote alone can never mint. The math decides.'],
] as const

const HEADS = ['Other approaches', 'Proof of AI'] as const

/** Proof of AI against the other ways to reward AI work. One table, shared by the home page and /economics. */
export default function Compare() {
  return (
    <div>
      <Tag is="Designed" />
      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.01em]">Why proof beats votes.</h3>
      <table className="mt-6 w-full border-collapse text-left text-base leading-relaxed">
        <caption className="sr-only">Other approaches to rewarding AI work, compared with Proof of AI</caption>
        <thead className="max-md:sr-only">
          <tr>
            {HEADS.map((h, i) => (
              <th key={h} scope="col" className={`w-1/2 border-b border-border-strong pb-3 font-mono text-xs font-normal uppercase tracking-[0.18em] ${i ? 'pl-6 text-foreground' : 'pr-6 text-muted-foreground'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row[0]} className="max-md:block max-md:border-b max-md:border-border max-md:py-4">
              {row.map((cell, i) => (
                <td
                  key={cell}
                  data-label={HEADS[i]}
                  className={`align-top md:border-b md:border-border md:py-4 max-md:block max-md:py-1 max-md:before:mb-1 max-md:before:block max-md:before:font-mono max-md:before:text-xs max-md:before:uppercase max-md:before:tracking-[0.18em] max-md:before:text-muted-foreground max-md:before:content-[attr(data-label)] ${i ? 'text-foreground md:pl-6' : 'text-muted-foreground md:pr-6'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-5 text-sm">
        <a href={WHITEPAPER_PDF} className="inline-flex min-h-11 items-center rounded-sm text-foreground underline underline-offset-4 hover:text-muted-foreground">
          Source: whitepaper sections 1, 2.6 and 3.4
        </a>
      </p>
    </div>
  )
}
