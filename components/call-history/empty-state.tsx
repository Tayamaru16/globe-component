import { Phone } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 p-4 bg-gray-100 rounded-full">
        <Phone className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">通話履歴が見つかりません</h3>
      <p className="text-gray-600 max-w-md">
        まだ通話履歴がありません。顧客管理画面から架電を開始すると、ここに履歴が表示されます。
      </p>
    </div>
  )
}
