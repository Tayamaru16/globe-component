"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mic, MicOff, Volume2 } from "lucide-react"

export function WebRTCTerminal() {
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState("0:00 / 0:00")

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          WebRTC オペレーター端末
          <span className="ml-auto text-sm font-normal text-gray-500">状態: {isConnected ? "接続中" : "未接続"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input placeholder="ws://localhost:8088/ws" className="font-mono text-sm" />
          <Input placeholder="sip:webrtc-op@localhost" className="font-mono text-sm" />
          <div className="flex items-center gap-2">
            <Input placeholder="........" type="password" className="flex-1" />
            <Select defaultValue="macbook-pro">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="macbook-pro">MacBook Proのマイク (Built-in)</SelectItem>
                <SelectItem value="external-mic">外部マイク</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Button variant={isConnected ? "destructive" : "default"} onClick={() => setIsConnected(!isConnected)}>
            {isConnected ? "切断" : "接続"}
          </Button>
          <Button variant="outline">
            <Mic className="h-4 w-4 mr-2" />
            マイク更新
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          接続後にモニターや人への切替を実行してください。音量調整は基本設定で行えます。
        </p>

        {/* Audio Controls */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <Button variant="outline" size="sm" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <div className="flex-1 bg-gray-300 rounded-full h-2">
            <div className="bg-gray-400 h-2 rounded-full" style={{ width: "0%" }}></div>
          </div>
          <span className="text-sm font-mono">{callDuration}</span>
          <Button variant="outline" size="sm">
            <Volume2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            •••
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
