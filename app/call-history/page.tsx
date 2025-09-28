"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { CallFilters } from "@/components/call-history/call-filters"
import { EmptyState } from "@/components/call-history/empty-state"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Phone } from "lucide-react"

export default function CallHistoryPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in real app this would come from API
  const callHistory: any[] = []

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">通話履歴</h1>
          </div>
          <p className="text-gray-600">過去の通話記録と文字起こしを確認できます</p>
        </div>

        <Card>
          <CardHeader>
            <CallFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              totalCount={callHistory.length}
            />
          </CardHeader>
          <CardContent>
            {callHistory.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">{/* Call history items would be rendered here */}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
