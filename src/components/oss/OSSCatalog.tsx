import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Grid3X3,
  List,
  ChevronDown,
  X,
  Filter,
  ExternalLink,
  BookOpen,
  Github,
  GraduationCap,
  Rocket,
  Package,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  ossCatalog,
  featuredCollections,
  repoTypes,
  categories,
  languages,
  useCases,
  maturityLevels,
  deploymentTypes,
  sortOptions,
  filterRepos,
  sortByHot,
  sortByRecent,
  type OSSRepo,
  type RepoType,
  type Maturity,
  type DeploymentType,
  type FeaturedCollection,
} from '@/data/oss-catalog';


// =============================================================================
// QUICK FILTER CHIPS
// =============================================================================

const quickFilters = [
  { value: 'all', label: 'All' },
  { value: 'core', label: 'Core' },
  { value: 'template', label: 'Templates' },
  { value: 'example', label: 'Examples' },
  { value: 'connector', label: 'Connectors' },
  { value: 'mcp', label: 'MCP' },
  { value: 'sdk', label: 'SDKs' },
];

// =============================================================================
// REPO CARD COMPONENT
// =============================================================================

interface RepoCardProps {
  repo: OSSRepo;
  view: 'grid' | 'list';
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, view }) => {
  const Icon = repo.icon;

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'featured': return 'bg-white/10 text-white border-white/30';
      case 'recommended': return 'bg-neutral-600/10 text-neutral-400 border-neutral-500/30';
      case 'experimental': return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30';
      case 'stable': return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30';
      case 'active': return 'bg-neutral-600/10 text-neutral-400 border-neutral-500/30';
      default: return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  const getMaturityBadge = (maturity: Maturity) => {
    const config = maturityLevels.find(m => m.value === maturity);
    return config ? getBadgeVariant(maturity) : getBadgeVariant('default');
  };

  const primaryAction = repo.signals.deployable && repo.actions.deployUrl
    ? { label: 'Deploy', url: repo.actions.deployUrl, icon: Rocket }
    : repo.type === 'template'
    ? { label: 'Use Template', url: repo.actions.githubUrl, icon: Package }
    : null;

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hz-card hz-row hz-ai-center hz-gap-4 hz-transition hz-card-interactive"
      >
        {/* Icon */}
        <div className="hz-sq-6 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-none">
          {Icon && <Icon className="hz-sq-3 hz-fg-muted" />}
        </div>

        {/* Content */}
        <div className="hz-grow">
          <div className="hz-row hz-ai-center hz-gap-2 hz-mb-1">
            <h3 className="hz-w-semibold hz-fg hz-truncate">{repo.name}</h3>
            {repo.signals.featured && (
              <Badge variant="outline" className={cn('hz-t-xs', getBadgeVariant('featured'))}>
                Featured
              </Badge>
            )}
          </div>
          <p className="hz-t-sm hz-fg-muted hz-truncate">{repo.description}</p>
        </div>

        {/* Badges */}
        <div className="hz-desktop-only hz-row hz-ai-center hz-gap-2">
          {repo.languages.slice(0, 2).map(lang => (
            <Badge key={lang} variant="outline" className="hz-t-xs hz-bg-raised hz-fg-muted">
              {lang}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="hz-row hz-ai-center hz-gap-2">
          {primaryAction && (
            <Button size="sm" className="hz-bg-inverse hz-fg-inverse hz-hoverable" asChild>
              <a href={primaryAction.url} target="_blank" rel="noopener noreferrer">
                {primaryAction.label}
              </a>
            </Button>
          )}
          <Button size="sm" variant="ghost" className="hz-fg-muted hz-link" asChild>
            <a href={repo.actions.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="hz-sq-2" />
            </a>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hz-col hz-r-lg hz-bordered hz-bg-surface hz-transition hz-clip hz-hoverable"
    >
      {/* Header */}
      <div className="hz-p-4 hz-pb-4">
        <div className="hz-row hz-ai-start hz-jc-between hz-mb-3">
          <div className="hz-sq-6 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center">
            {Icon && <Icon className="hz-sq-3 hz-fg-muted hz-transition hz-link" />}
          </div>
          <div className="hz-row hz-gap-2">
            {repo.signals.featured && (
              <Badge variant="outline" className={cn('hz-t-xs', getBadgeVariant('featured'))}>
                Featured
              </Badge>
            )}
            {repo.signals.recommended && !repo.signals.featured && (
              <Badge variant="outline" className={cn('hz-t-xs', getBadgeVariant('recommended'))}>
                Recommended
              </Badge>
            )}
            <Badge variant="outline" className={cn('hz-t-xs', getMaturityBadge(repo.maturity))}>
              {repo.maturity.charAt(0).toUpperCase() + repo.maturity.slice(1)}
            </Badge>
          </div>
        </div>

        <h3 className="hz-w-semibold hz-fg hz-mb-1 hz-transition hz-hoverable">
          {repo.name}
        </h3>
        <p className="hz-t-xs hz-fg-muted hz-mono hz-mb-2">{repo.slug}</p>
        <p className="hz-t-sm hz-fg-muted hz-clamp-2">{repo.description}</p>
      </div>

      {/* Metadata */}
      <div className="hz-px-4 hz-pb-4 hz-row hz-wrap hz-gap-2">
        {repo.languages.slice(0, 3).map(lang => (
          <Badge key={lang} variant="outline" className="hz-t-xs hz-bg-raised hz-fg-muted">
            {lang}
          </Badge>
        ))}
        {repo.categories.slice(0, 1).map(cat => (
          <Badge key={cat} variant="outline" className="hz-t-xs hz-bg-raised hz-fg-muted">
            {cat}
          </Badge>
        ))}
        {repo.signals.deployable && (
          <Badge variant="outline" className="hz-t-xs hz-bg-raised hz-fg-muted hz-border-strong">
            Deployable
          </Badge>
        )}
      </div>

      {/* Upstream Attribution */}
      {repo.upstream && (
        <div className="hz-px-4 hz-pb-4">
          <a
            href={repo.upstream.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hz-t-xs hz-fg-faint hz-transition hz-link"
          >
            Powered by {repo.upstream.name} →
          </a>
        </div>
      )}

      {/* Actions */}
      <div className="hz-mt-auto hz-p-4 hz-pt-4 hz-border-t hz-row hz-ai-center hz-gap-2">
        {primaryAction ? (
          <Button size="sm" className="hz-grow hz-bg-inverse hz-fg-inverse hz-hoverable" asChild>
            <a href={primaryAction.url} target="_blank" rel="noopener noreferrer">
              <primaryAction.icon className="hz-sq-2 hz-mr-2" />
              {primaryAction.label}
            </a>
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="hz-grow hz-hoverable" asChild>
            <a href={repo.actions.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="hz-sq-2 hz-mr-2" />
              View Source
            </a>
          </Button>
        )}

        <div className="hz-row hz-gap-1">
          {repo.actions.docsUrl && (
            <Button size="sm" variant="ghost" className="hz-px-2 hz-fg-muted hz-link" asChild title="Docs">
              <a href={repo.actions.docsUrl} target="_blank" rel="noopener noreferrer">
                <BookOpen className="hz-sq-2" />
              </a>
            </Button>
          )}
          {repo.actions.learnUrl && (
            <Button size="sm" variant="ghost" className="hz-px-2 hz-fg-muted hz-link" asChild title="Learn">
              <a href={repo.actions.learnUrl}>
                <GraduationCap className="hz-sq-2" />
              </a>
            </Button>
          )}
          {primaryAction && (
            <Button size="sm" variant="ghost" className="hz-px-2 hz-fg-muted hz-link" asChild title="GitHub">
              <a href={repo.actions.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="hz-sq-2" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// =============================================================================
// FEATURED COLLECTION CARD
// =============================================================================

interface CollectionCardProps {
  collection: FeaturedCollection;
  onSelect: (repoIds: string[]) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onSelect }) => {
  const Icon = collection.icon;

  return (
    <button
      onClick={() => onSelect(collection.repos)}
      className="hz-card hz-row hz-ai-center hz-gap-3 hz-transition hz-align-left hz-card-interactive"
    >
      <div className="hz-sq-6 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-transition hz-hoverable">
        <Icon className="hz-sq-3 hz-fg-muted hz-transition hz-link" />
      </div>
      <div>
        <h4 className="hz-w-medium hz-fg hz-t-sm hz-transition hz-hoverable">
          {collection.title}
        </h4>
        <p className="hz-t-xs hz-fg-muted">{collection.description}</p>
      </div>
    </button>
  );
};

// =============================================================================
// FACET SECTION
// =============================================================================

interface FacetSectionProps {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  collapsed?: boolean;
}

const FacetSection: React.FC<FacetSectionProps> = ({
  title,
  options,
  selected,
  onChange,
  collapsed = false,
}) => {
  const [isOpen, setIsOpen] = useState(!collapsed);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="hz-border-b hz-pb-4 hz-mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hz-row hz-ai-center hz-jc-between hz-w-full hz-align-left hz-mb-2"
      >
        <span className="hz-t-sm hz-w-medium hz-fg-soft">{title}</span>
        <ChevronDown
          className={cn(
            'hz-sq-2 hz-fg-muted hz-transition',
            isOpen && ''
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="hz-stack-1 hz-clip"
          >
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className={cn(
                  'hz-btn hz-btn-ghost hz-btn-block hz-gap-2 hz-transition',
                  selected.includes(option.value)
                    ? 'hz-bg-quiet hz-fg'
                    : 'hz-fg-muted hz-link'
                )}
              >
                <div
                  className={cn(
                    'hz-sq-2 hz-r-md hz-bordered hz-row hz-ai-center hz-jc-center',
                    selected.includes(option.value)
                      ? 'hz-bg-inverse'
                      : 'hz-border-strong'
                  )}
                >
                  {selected.includes(option.value) && (
                    <Check className="hz-sq-1 hz-fg" />
                  )}
                </div>
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// =============================================================================
// MAIN CATALOG COMPONENT
// =============================================================================

const OSSCatalog: React.FC = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState('all');
  const [sortBy, setSortBy] = useState('hot');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [selectedMaturity, setSelectedMaturity] = useState<string[]>([]);
  const [selectedDeployment, setSelectedDeployment] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string[] | null>(null);

  // Filter and sort repos
  const filteredRepos = useMemo(() => {
    let repos = ossCatalog;

    // Collection filter
    if (selectedCollection) {
      repos = repos.filter(r => selectedCollection.includes(r.id));
    }

    // Quick filter
    if (quickFilter !== 'all') {
      repos = repos.filter(r => r.type === quickFilter);
    }

    // Facet filters
    repos = filterRepos(repos, {
      types: selectedTypes.length ? selectedTypes as RepoType[] : undefined,
      categories: selectedCategories.length ? selectedCategories : undefined,
      languages: selectedLanguages.length ? selectedLanguages : undefined,
      useCases: selectedUseCases.length ? selectedUseCases : undefined,
      maturity: selectedMaturity.length ? selectedMaturity as Maturity[] : undefined,
      deployment: selectedDeployment.length ? selectedDeployment as DeploymentType[] : undefined,
      search: searchQuery || undefined,
    });

    // Sort
    switch (sortBy) {
      case 'hot':
        return sortByHot(repos);
      case 'recent':
        return sortByRecent(repos);
      case 'beginner':
        return [...repos].sort((a, b) => {
          const aScore = (a.type === 'template' ? 2 : 0) + (a.maturity === 'stable' ? 1 : 0);
          const bScore = (b.type === 'template' ? 2 : 0) + (b.maturity === 'stable' ? 1 : 0);
          return bScore - aScore;
        });
      case 'name':
        return [...repos].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortByHot(repos);
    }
  }, [
    searchQuery,
    quickFilter,
    sortBy,
    selectedTypes,
    selectedCategories,
    selectedLanguages,
    selectedUseCases,
    selectedMaturity,
    selectedDeployment,
    selectedCollection,
  ]);

  const featuredRepos = useMemo(() => {
    if (selectedCollection || searchQuery || quickFilter !== 'all') return [];
    return filteredRepos.filter(r => r.signals.featured).slice(0, 6);
  }, [filteredRepos, selectedCollection, searchQuery, quickFilter]);

  const mainRepos = useMemo(() => {
    if (featuredRepos.length === 0) return filteredRepos;
    const featuredIds = new Set(featuredRepos.map(r => r.id));
    return filteredRepos.filter(r => !featuredIds.has(r.id));
  }, [filteredRepos, featuredRepos]);

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedCategories.length > 0 ||
    selectedLanguages.length > 0 ||
    selectedUseCases.length > 0 ||
    selectedMaturity.length > 0 ||
    selectedDeployment.length > 0;

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setSelectedUseCases([]);
    setSelectedMaturity([]);
    setSelectedDeployment([]);
    setSelectedCollection(null);
    setQuickFilter('all');
    setSearchQuery('');
  };

  // Facet rail content
  const FacetRail = () => (
    <div className="hz-stack-4">
      <FacetSection
        title="Type"
        options={repoTypes.map(t => ({ value: t.value, label: t.label }))}
        selected={selectedTypes}
        onChange={setSelectedTypes}
      />
      <FacetSection
        title="Category"
        options={categories.map(c => ({ value: c, label: c }))}
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />
      <FacetSection
        title="Language"
        options={languages.map(l => ({ value: l, label: l }))}
        selected={selectedLanguages}
        onChange={setSelectedLanguages}
      />
      <FacetSection
        title="Use Case"
        options={useCases.map(u => ({ value: u, label: u }))}
        selected={selectedUseCases}
        onChange={setSelectedUseCases}
        collapsed
      />
      <FacetSection
        title="Maturity"
        options={maturityLevels.map(m => ({ value: m.value, label: m.label }))}
        selected={selectedMaturity}
        onChange={setSelectedMaturity}
        collapsed
      />
      <FacetSection
        title="Deployment"
        options={deploymentTypes.map(d => ({ value: d.value, label: d.label }))}
        selected={selectedDeployment}
        onChange={setSelectedDeployment}
        collapsed
      />
    </div>
  );

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-min-h-screen">
      <div className="hz-container">
        {/* Header */}
        <div className="hz-mb-6">
          <h1 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">
            OSS Catalog
          </h1>
          <p className="hz-fg-muted hz-t-lg">
            Open source tools, templates, and infrastructure for building AI applications
          </p>
        </div>

        {/* Featured Collections */}
        {!selectedCollection && !searchQuery && quickFilter === 'all' && (
          <div className="hz-mb-6">
            <h2 className="hz-t-sm hz-w-medium hz-fg-muted hz-upper hz-tracking-wide hz-mb-4">
              Quick Start Collections
            </h2>
            <div className="hz-grid hz-grid-4 hz-gap-4">
              {featuredCollections.map(collection => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onSelect={setSelectedCollection}
                />
              ))}
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="hz-col-row hz-gap-4 hz-mb-5">
          {/* Search */}
          <div className="hz-rel hz-grow">
            <Search className="hz-center-y hz-sq-2 hz-abs hz-fg-muted" />
            <Input
              type="text"
              placeholder="Search repos, templates, tools..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="hz-px-6 hz-bg-surface"
            />
          </div>

          {/* Quick Filters */}
          <div className="hz-row hz-gap-2 hz-scroll-x hz-pb-4">
            {quickFilters.map(filter => (
              <Button
                key={filter.value}
                variant={quickFilter === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setQuickFilter(filter.value);
                  setSelectedCollection(null);
                }}
                className={cn(
                  'hz-whitespace-nowrap',
                  quickFilter === filter.value
                    ? 'hz-bg-inverse hz-fg-inverse hz-hoverable'
                    : 'hz-hoverable'
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="hz-row hz-gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hz-hoverable">
                  {sortOptions.find(s => s.value === sortBy)?.label || 'Sort'}
                  <ChevronDown className="hz-sq-2 hz-ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="hz-bg-surface">
                {sortOptions.map(option => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={cn(
                      'hz-pointer',
                      sortBy === option.value && 'hz-fg'
                    )}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hz-row hz-bordered hz-r-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView('grid')}
                className={cn('hz-px-2', view === 'grid' && 'hz-bg-raised')}
              >
                <Grid3X3 className="hz-sq-2" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView('list')}
                className={cn('hz-px-2', view === 'list' && 'hz-bg-raised')}
              >
                <List className="hz-sq-2" />
              </Button>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="hz-mobile-only">
                  <Filter className="hz-sq-2 hz-mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="hz-sq-3 hz-ml-2 hz-r-full hz-bg-inverse hz-fg-inverse hz-t-xs hz-row hz-ai-center hz-jc-center">
                      {selectedTypes.length + selectedCategories.length + selectedLanguages.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="hz-bg-surface">
                <SheetHeader>
                  <SheetTitle className="hz-fg">Filters</SheetTitle>
                </SheetHeader>
                <div className="hz-mt-5 hz-scroll-y hz-h-full hz-pb-6">
                  <FacetRail />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters */}
        {(hasActiveFilters || selectedCollection) && (
          <div className="hz-row hz-wrap hz-ai-center hz-gap-2 hz-mb-5">
            <span className="hz-t-sm hz-fg-muted">Active filters:</span>
            {selectedCollection && (
              <Badge variant="outline" className="hz-bg-quiet hz-fg">
                Collection
                <button onClick={() => setSelectedCollection(null)} className="hz-ml-1">
                  <X className="hz-sq-1" />
                </button>
              </Badge>
            )}
            {[...selectedTypes, ...selectedCategories, ...selectedLanguages].slice(0, 5).map(filter => (
              <Badge key={filter} variant="outline" className="hz-bg-raised hz-fg-soft">
                {filter}
                <button
                  onClick={() => {
                    setSelectedTypes(selectedTypes.filter(t => t !== filter));
                    setSelectedCategories(selectedCategories.filter(c => c !== filter));
                    setSelectedLanguages(selectedLanguages.filter(l => l !== filter));
                  }}
                  className="hz-ml-1"
                >
                  <X className="hz-sq-1" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="hz-fg-muted hz-link"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="hz-row hz-gap-6">
          {/* Facet Rail - Desktop */}
          <aside className="hz-desktop-only hz-bw-8 hz-none">
            <div className="hz-card hz-sticky">
              <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
                <h3 className="hz-w-medium hz-fg">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="hz-t-xs hz-fg-muted hz-link"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FacetRail />
            </div>
          </aside>

          {/* Results */}
          <div className="hz-grow">
            {/* Results Count */}
            <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
              <p className="hz-t-sm hz-fg-muted">
                {filteredRepos.length} {filteredRepos.length === 1 ? 'result' : 'results'}
              </p>
            </div>

            {/* Featured Row */}
            {featuredRepos.length > 0 && (
              <div className="hz-mb-6">
                <h2 className="hz-t-sm hz-w-medium hz-fg-muted hz-upper hz-tracking-wide hz-mb-4 hz-row hz-ai-center hz-gap-2">
                  <span className="hz-sq-1 hz-r-full hz-bg-inverse" />
                  Hanzo Picks
                </h2>
                <div
                  className={cn(
                    view === 'grid'
                      ? 'hz-grid hz-grid-3 hz-gap-4'
                      : 'hz-stack-3'
                  )}
                >
                  {featuredRepos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} view={view} />
                  ))}
                </div>
              </div>
            )}

            {/* Main Results */}
            {mainRepos.length > 0 ? (
              <div
                className={cn(
                  view === 'grid'
                    ? 'hz-grid hz-grid-3 hz-gap-4'
                    : 'hz-stack-3'
                )}
              >
                {mainRepos.map(repo => (
                  <RepoCard key={repo.id} repo={repo} view={view} />
                ))}
              </div>
            ) : (
              <div className="hz-align-center hz-py-7">
                <p className="hz-fg-muted hz-mb-4">No results found</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OSSCatalog;
