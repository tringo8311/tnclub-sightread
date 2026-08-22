import clsx from 'clsx'
import { Search, Star } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../market.module.css'

export type SourceFilterType = 'Local' | 'TN Studio'

interface MarketCatalogControlsProps {
  search: string
  setSearch: (val: string) => void
  sourceFilter: SourceFilterType
  setSourceFilter: (filter: SourceFilterType) => void
  favoritesOnly: boolean
  setFavoritesOnly: (val: boolean) => void
}

const SOURCE_FILTERS: { id: SourceFilterType; labelKey: string; defaultLabel: string }[] = [
  { id: 'Local', labelKey: 'market.controls.sources.local', defaultLabel: 'Curated Songs' },
  {
    id: 'TN Studio',
    labelKey: 'market.controls.sources.tnStudio',
    defaultLabel: 'On TN Web MIDI Studio',
  },
]

export function MarketCatalogControls({
  search,
  setSearch,
  sourceFilter,
  setSourceFilter,
  favoritesOnly,
  setFavoritesOnly,
}: MarketCatalogControlsProps) {
  const { t } = useTranslation()

  return (
    <div
      className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      data-ui="market-catalog-controls"
    >
      {/* Search Input */}
      <div className="relative max-w-md flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t(
            'market.controls.searchPlaceholder',
            'Search pieces, composers, or tags...',
          )}
          className={styles.searchInput}
          aria-label={t('market.controls.searchAriaLabel', 'Search curated songs')}
          data-element-id="market-search-input"
          data-action="search-curated-songs"
          data-ui="market-catalog-controls"
        />
      </div>

      {/* Filter Actions: Source Chips & Favorites Toggle */}
      <div className="flex flex-wrap items-center gap-2" data-ui="market-filters">
        {/* Favorite Toggle Button */}
        <button
          type="button"
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className={clsx(
            'flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all',
            favoritesOnly
              ? 'border-amber-400/50 bg-amber-400/15 text-amber-400 shadow-sm'
              : 'border-foreground/10 bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10',
          )}
          title={
            favoritesOnly
              ? t('market.controls.favoritesOnlyActive', 'Showing favorites only')
              : t('market.controls.favoritesOnly', 'Show favorites only')
          }
          data-element-id="market-toggle-favorites-btn"
          data-action="toggle-favorites-filter"
        >
          <Star
            className={clsx(
              'h-3.5 w-3.5 transition-transform',
              favoritesOnly ? 'scale-110 fill-amber-400 text-amber-400' : '',
            )}
          />
          <span>{t('market.controls.favorites', 'Favorites')}</span>
        </button>

        <div className="bg-border/60 mx-1 hidden h-4 w-[1px] md:block" />

        {/* Source Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5" data-ui="market-source-filters">
          {SOURCE_FILTERS.map((filterItem) => {
            const isActive = sourceFilter === filterItem.id
            const label = t(filterItem.labelKey, filterItem.defaultLabel)

            return (
              <button
                key={filterItem.id}
                onClick={() => setSourceFilter(filterItem.id)}
                className={isActive ? styles.categoryPillActive : styles.categoryPillInactive}
                data-element-id={`market-source-filter-${filterItem.id.toLowerCase().replace(/\s+/g, '-')}`}
                data-action={`filter-source-${filterItem.id.toLowerCase()}`}
                data-ui="market-source-filters"
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
