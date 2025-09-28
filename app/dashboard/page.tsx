"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { MetricCard } from "@/components/dashboard/metric-card"
import { InquiryChart } from "@/components/dashboard/inquiry-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { ResponseTimeChart } from "@/components/dashboard/response-time-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Phone, CheckCircle, TrendingUp, Clock, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-gray-600 mt-1">AI電話システムの運用状況を確認できます</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="総通話件数"
            value="156"
            change="+12% 前月比"
            changeType="positive"
            icon={Users}
            iconColor="bg-blue-500"
          />
          <MetricCard
            title="完了架電数"
            value="89"
            change="+8% 前月比"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-green-500"
          />
          <MetricCard
            title="成功率"
            value="67.4%"
            change="+3.2% 前月比"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-orange-500"
          />
          <MetricCard
            title="平均通話時間"
            value="4:45"
            change="-5s 前月比"
            changeType="positive"
            icon={Clock}
            iconColor="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <InquiryChart />
          <CategoryChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ResponseTimeChart />
          <QuickActions />
          <RecentActivity />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="今日の架電数" value="24" icon={Phone} iconColor="bg-blue-100 text-blue-600" />
          <MetricCard title="成功率" value="67.4%" icon={TrendingUp} iconColor="bg-green-100 text-green-600" />
          <MetricCard title="総通話件数" value="156" icon={Users} iconColor="bg-purple-100 text-purple-600" />
          <MetricCard title="平均通話時間" value="4:45" icon={Clock} iconColor="bg-orange-100 text-orange-600" />
        </div>
      </div>
    </MainLayout>
  )
}
