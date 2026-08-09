import { Search } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../market.module.css'

interface MarketCatalogControlsProps {
  search: string
  setSearch: (val: string) => void
  categoryFilter: string
  setCategoryFilter: (cat: string) => void
  categories?: string[]
}

const DEFAULT_CATEGORIES = ['All', 'Classical', 'Game OST', 'Jazz']

export function MarketCatalogControls({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  categories = DEFAULT_CATEGORIES,
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

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5" data-ui="market-category-filters">
        {categories.map((cat) => {
          const isActive = categoryFilter === cat
          const labelKey = `market.controls.categories.${cat}`
          const label = t(labelKey, cat === 'All' ? 'Tất cả Thể loại' : cat)

          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={isActive ? styles.categoryPillActive : styles.categoryPillInactive}
              data-element-id={`market-category-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              data-action={`filter-category-${cat.toLowerCase()}`}
              data-ui="market-category-filters"
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
