"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Plus, Filter, Monitor, UserPlus, Users } from "lucide-react"

interface Customer {
  id: string
  name: string
  phone: string
  status: "待機中" | "通話中" | "完了"
  attempts: string
  lastContact: string
  nextScheduled: string
}

const customers: Customer[] = [
  {
    id: "1",
    name: "新規顧客 (080-2253-0965)",
    phone: "08022530965",
    status: "待機中",
    attempts: "0/4",
    lastContact: "-",
    nextScheduled: "-",
  },
]

export function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("すべて")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待機中":
        return "bg-yellow-100 text-yellow-800"
      case "通話中":
        return "bg-blue-100 text-blue-800"
      case "完了":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>顧客管理</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              CSVアップロード
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              連絡先追加
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">連絡先の管理と架電状況を確認できます</p>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="名前、会社名、電話番号で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="すべて">すべて</SelectItem>
              <SelectItem value="待機中">待機中</SelectItem>
              <SelectItem value="通話中">通話中</SelectItem>
              <SelectItem value="完了">完了</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">連絡先</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">ステータス</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">架電回数</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">最終実施</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">次回予定</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{customer.attempts}</td>
                  <td className="py-4 px-4 text-gray-900">{customer.lastContact}</td>
                  <td className="py-4 px-4 text-gray-900">{customer.nextScheduled}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Monitor className="h-4 w-4 mr-1" />
                        モニター
                      </Button>
                      <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-1" />
                        人の切替
                      </Button>
                      <Button variant="outline" size="sm">
                        詳細
                      </Button>
                      <Button variant="outline" size="sm">
                        架電
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {customers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">顧客データがありません</h3>
            <p className="text-gray-600 mb-4">CSVファイルをアップロードして顧客を追加してください</p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              CSVアップロード
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
