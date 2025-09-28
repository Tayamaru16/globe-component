"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CallFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  totalCount: number
}

export function CallFilters({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  totalCount,
}: CallFiltersProps) {
  const filters = [
    { key: "all", label: "全て", count: totalCount },
    { key: "completed", label: "完了", count: 0 },
    { key: "in-progress", label: "進行中", count: 0 },
    { key: "failed", label: "失敗", count: 0 },
  ]

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className={cn(activeFilter === filter.key && "bg-blue-600 hover:bg-blue-700")}
          >
            {filter.label}
          </Button>
        ))}
        <div className="ml-auto text-sm text-gray-500">総件数: {totalCount}件</div>
      </div>

      {/* Search */}
      <Input
        placeholder="顧客ID、電話番号、内容で検索..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  )
}
