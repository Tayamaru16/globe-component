import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      title: "キャンペーン「新規開拓 - 1月」が完了しました",
      time: "2時間前",
      type: "success",
    },
    {
      title: "株式会社ABCから面談の予約が入りました",
      time: "4時間前",
      type: "info",
    },
    {
      title: "今日の成功率が目標を上回りました",
      time: "1日前",
      type: "success",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>最新情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`w-2 h-2 rounded-full mt-2 ${getTypeColor(activity.type).replace("text-", "bg-").replace("-800", "-500")}`}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
