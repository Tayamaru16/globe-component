"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { WebRTCTerminal } from "@/components/customers/webrtc-terminal"
import { CustomerTable } from "@/components/customers/customer-table"

export default function CustomersPage() {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">顧客管理</h1>
          <p className="text-gray-600 mt-1">WebRTCオペレーター端末</p>
        </div>

        <WebRTCTerminal />
        <CustomerTable />
      </div>
    </MainLayout>
  )
}
