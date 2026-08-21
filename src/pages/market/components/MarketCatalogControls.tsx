import { Search } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../market.module.css'

export type SourceFilterType = 'All' | 'Local' | 'TN Studio'

interface MarketCatalogControlsProps {
  search: string
  setSearch: (val: string) => void
  sourceFilter: SourceFilterType
  setSourceFilter: (filter: SourceFilterType) => void
}

const SOURCE_FILTERS: { id: SourceFilterType; labelKey: string; defaultLabel: string }[] = [
  { id: 'All', labelKey: 'market.controls.sources.all', defaultLabel: 'Tất cả kho nhạc' },
  { id: 'Local', labelKey: 'market.controls.sources.local', defaultLabel: 'Bài hát có sẵn' },
  {
    id: 'TN Studio',
    labelKey: 'market.controls.sources.tnStudio',
    defaultLabel: 'Trên TN Web MIDI Studio',
  },
]

export function MarketCatalogControls({
  search,
  setSearch,
  sourceFilter,
  setSourceFilter,
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
            'Tìm kiếm tác phẩm, tác giả hoặc thẻ...',
          )}
          className={styles.searchInput}
          aria-label={t('market.controls.searchAriaLabel', 'Search curated songs')}
          data-element-id="market-search-input"
          data-action="search-curated-songs"
          data-ui="market-catalog-controls"
        />
      </div>

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
  )
}
