import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Zap, BarChart3 } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "CSVファイルをアップロード",
      description: "連絡先を一括登録して営業を開始",
      icon: Upload,
      color: "bg-orange-500",
      href: "/csv-upload",
    },
    {
      title: "架電キャンペーンを開始",
      description: "AI自動架電で効率的な営業活動を実行",
      icon: Zap,
      color: "bg-blue-500",
      href: "/campaigns",
    },
    {
      title: "詳細な分析を確認",
      description: "成果とパフォーマンスを詳しく分析",
      icon: BarChart3,
      color: "bg-green-500",
      href: "/reports",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>クイックアクション</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <div
              className="flex items-start gap-4 p-4 rounded-lg border border-l-4 hover:bg-gray-50 transition-colors cursor-pointer"
              style={{ borderLeftColor: action.color.replace("bg-", "#") }}
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
