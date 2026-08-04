import React, { useEffect, useMemo, useState } from 'react'
import {
  Search,
  Bot,
  LayoutGrid,
  ChartBar,
  Settings,
  PlusCircle,
  PlayCircle,
  PauseCircle,
  Database,
  RefreshCw,
  Server,
} from 'lucide-react'
import { DummyAgentData } from './data'

/* The palette is a filtered list over a command MODEL. It used to be cmdk,
   which pulls @radix-ui/react-dialog + primitive + id + compose-refs into the
   bundle to render a text input and a list this site already owns. */

type Cmd = {
  id: string
  label: string
  group: string
  keywords: string[]
  icon: React.ComponentType<{ className?: string }>
  trailing?: React.ComponentType<{ className?: string }>
}

const NAVIGATION: Cmd[] = [
  { id: 'view-board', label: 'View Kanban Board', group: 'Navigation', icon: LayoutGrid, keywords: ['kanban', 'board', 'tasks'] },
  { id: 'view-agents', label: 'View Agents', group: 'Navigation', icon: Bot, keywords: ['agents', 'ai', 'list'] },
  { id: 'view-analytics', label: 'View Analytics', group: 'Navigation', icon: ChartBar, keywords: ['analytics', 'stats', 'metrics'] },
]

const ACTIONS: Cmd[] = [
  { id: 'new-agent', label: 'Create New Agent', group: 'Actions', icon: PlusCircle, keywords: ['create', 'agent', 'new', 'add'] },
  { id: 'new-task', label: 'Create New Task', group: 'Actions', icon: PlusCircle, keywords: ['create', 'task', 'new', 'add'] },
  { id: 'refresh', label: 'Refresh Dashboard', group: 'Actions', icon: RefreshCw, keywords: ['refresh', 'reload', 'update'] },
  { id: 'settings', label: 'Open Settings', group: 'Actions', icon: Settings, keywords: ['settings', 'preferences', 'config'] },
]

const RESOURCES: Cmd[] = [
  { id: 'data-sources', label: 'Manage Data Sources', group: 'Resources', icon: Database, keywords: ['data', 'sources', 'database', 'vector', 'rag'] },
  { id: 'infrastructure', label: 'View Infrastructure', group: 'Resources', icon: Server, keywords: ['infrastructure', 'server', 'deploy', 'resources'] },
]

const agentCommands = (): Cmd[] =>
  DummyAgentData.map((agent) => ({
    id: `toggle-agent-${agent.id}`,
    label: `${agent.name} (${agent.type})`,
    group: 'Manage Agents',
    icon: Bot,
    trailing: agent.status === 'running' ? PauseCircle : PlayCircle,
    keywords: [agent.name, agent.type, agent.status, 'toggle', 'agent'],
  }))

const run = (id: string) => {
  switch (id) {
    case 'view-board':
      window.location.href = '/dashboard?view=board'
      break
    case 'view-agents':
      window.location.href = '/dashboard?view=agents'
      break
    case 'view-analytics':
      window.location.href = '/dashboard?view=analytics'
      break
    default:
      break
  }
}

const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const commands = useMemo(() => [...NAVIGATION, ...ACTIONS, ...agentCommands(), ...RESOURCES], [])

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.some((k) => k.toLowerCase().includes(q)),
    )
  }, [commands, search])

  if (!open) return null

  const groups = [...new Set(matches.map((c) => c.group))]

  const select = (id: string) => {
    setOpen(false)
    run(id)
  }

  return (
    <div
      className="hz-fixed hz-inset hz-z-overlay hz-bg-overlay hz-glass hz-row hz-ai-start hz-jc-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="hz-w-full hz-mw-md hz-bg-surface hz-bordered hz-r-lg hz-clip"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hz-border-b hz-p-2 hz-row hz-ai-center">
          <Search className="hz-sq-2 hz-ml-2 hz-fg-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="hz-w-full hz-bg-none hz-px-2 hz-py-2 hz-fg"
            placeholder="Search commands..."
            aria-label="Search commands"
            autoFocus
          />
          <kbd className="hz-mr-2 hz-px-2 hz-py-1 hz-t-xs hz-r-md hz-bg-raised hz-fg-muted">Esc</kbd>
        </div>

        <div className="hz-scroll-y hz-p-2" role="listbox">
          {matches.length === 0 && (
            <div className="hz-py-5 hz-align-center hz-fg-muted">No results found.</div>
          )}
          {groups.map((group) => (
            <div key={group} className="hz-pb-4">
              <div className="hz-px-2 hz-py-1 hz-t-xs hz-fg-muted">{group}</div>
              {matches
                .filter((c) => c.group === group)
                .map(({ id, label, icon: Icon, trailing: Trailing }) => (
                  <button
                    key={id}
                    type="button"
                    role="option"
                    onClick={() => select(id)}
                    className="hz-btn hz-btn-ghost hz-w-full hz-jc-between hz-pointer hz-fg"
                  >
                    <span className="hz-row hz-ai-center hz-gap-2">
                      <Icon className="hz-sq-2 hz-fg-muted" />
                      <span>{label}</span>
                    </span>
                    {Trailing ? <Trailing className="hz-sq-2 hz-fg-muted" /> : null}
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
