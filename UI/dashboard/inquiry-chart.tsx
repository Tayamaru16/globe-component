"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

const data = [
  { date: "1/9", ai: 33, newSolution: 40, general: 42 },
  { date: "1/10", ai: 35, newSolution: 45, general: 52 },
  { date: "1/11", ai: 24, newSolution: 32, general: 38 },
  { date: "1/12", ai: 42, newSolution: 58, general: 65 },
  { date: "1/13", ai: 35, newSolution: 42, general: 48 },
  { date: "1/14", ai: 48, newSolution: 68, general: 75 },
  { date: "1/15", ai: 52, newSolution: 72, general: 78 },
]

export function InquiryChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📈</span>
          問い合わせ数推移
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <Line type="monotone" dataKey="ai" stroke="#3b82f6" strokeWidth={2} name="AI解決" />
            <Line type="monotone" dataKey="newSolution" stroke="#10b981" strokeWidth={2} name="新規解決" />
            <Line type="monotone" dataKey="general" stroke="#ef4444" strokeWidth={2} name="総問い合わせ" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
