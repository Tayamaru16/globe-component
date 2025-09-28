"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { time: "9:00", responseTime: 2.1 },
  { time: "10:00", responseTime: 2.8 },
  { time: "11:00", responseTime: 3.2 },
  { time: "12:00", responseTime: 2.9 },
  { time: "13:00", responseTime: 2.4 },
  { time: "14:00", responseTime: 3.1 },
  { time: "15:00", responseTime: 2.7 },
]

export function ResponseTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🍊</span>
          応答時間推移
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Area type="monotone" dataKey="responseTime" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
