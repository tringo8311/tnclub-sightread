import { TextInput } from '@/components/TextInput'
import { Search } from '@/icons'
import styles from './SearchBox.module.css'

export type SearchBoxProps = {
  value?: string
  onSearch: (val: string) => void
  placeholder: string
  autoFocus?: boolean
}

export function SearchBox({ value, onSearch, placeholder, autoFocus }: SearchBoxProps) {
  return (
    <div className={styles.searchContainer}>
      <TextInput
        id="songs-search-input"
        elementId="songs-search-input"
        data-element-id="songs-search-input"
        data-ui="songs-page"
        type="search"
        value={value ?? ''}
        onChange={(e: any) => onSearch(e.target.value)}
        className={styles.searchInput}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      <Search
        size={18}
        className={styles.searchIcon}
      />
    </div>
  )
}
