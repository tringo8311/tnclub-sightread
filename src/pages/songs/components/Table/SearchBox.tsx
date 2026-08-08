import { TextInput } from '@/components/TextInput'
import { Search } from '@/icons'

export type SearchBoxProps = {
  value?: string
  onSearch: (val: string) => void
  placeholder: string
  autoFocus?: boolean
}

export function SearchBox({ value, onSearch, placeholder, autoFocus }: SearchBoxProps) {
  return (
    <div className="relative h-9 w-full">
      <TextInput
        type="search"
        value={value ?? ''}
        onChange={(e: any) => onSearch(e.target.value)}
        className="border-border bg-card text-card-foreground placeholder:text-muted-foreground absolute h-full w-full rounded-md border pr-3 pl-9 text-sm"
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      <Search
        size={18}
        className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
      />
    </div>
  )
}
