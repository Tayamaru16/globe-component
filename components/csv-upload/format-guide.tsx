import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FormatGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CSVフォーマットガイド</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">以下の列を含むCSVファイルをアップロードしてください：</p>

        <div className="space-y-3 mb-6">
          <div>
            <span className="font-medium text-gray-900">name:</span>
            <span className="text-gray-600 ml-2">氏名（必須）</span>
          </div>
          <div>
            <span className="font-medium text-gray-900">phone:</span>
            <span className="text-gray-600 ml-2">電話番号（必須）</span>
          </div>
          <div>
            <span className="font-medium text-gray-900">email:</span>
            <span className="text-gray-600 ml-2">メールアドレス（任意）</span>
          </div>
          <div>
            <span className="font-medium text-gray-900">company:</span>
            <span className="text-gray-600 ml-2">会社名（任意）</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium text-gray-900 mb-2">サンプル：</p>
          <pre className="text-sm text-gray-700 font-mono">
            {`name,phone,email,company
田中太郎,03-1234-5678,tanaka@example.com,株式会社ABC
佐藤花子,03-9876-5432,sato@example.com,株式会社XYZ`}
          </pre>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>※ UTF-8、UTF-8 BOM、Shift_JIS、CP932エンコーディングに対応</p>
          <p>※ カンマ区切り（,）またはタブ区切りのCSVファイルに対応</p>
        </div>
      </CardContent>
    </Card>
  )
}
