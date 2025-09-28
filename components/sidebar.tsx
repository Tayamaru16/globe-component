"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BarChart3, Users, Phone, Upload, FileText, Settings, HelpCircle, User } from "lucide-react"

const navigation = [
  { name: "ホーム", href: "/", icon: Home },
  { name: "ダッシュボード", href: "/dashboard", icon: BarChart3 },
  { name: "顧客管理", href: "/customers", icon: Users },
  { name: "通話履歴", href: "/call-history", icon: Phone },
  { name: "CSVアップロード", href: "/csv-upload", icon: Upload },
  { name: "レポート", href: "/reports", icon: FileText },
  { name: "設定", href: "/settings", icon: Settings },
  { name: "ヘルプ", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
          <Phone className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Reco</h1>
          <p className="text-sm text-gray-500">カスタマーサポート</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">ゲスト</p>
            <p className="text-xs text-gray-500">管理者</p>
          </div>
        </div>
      </div>
    </div>
  )
}
