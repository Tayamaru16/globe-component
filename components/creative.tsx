"use client"

import { useEffect, useState, type ReactElement } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  BookOpen,
  ChevronDown,
  Cloud,
  FileText,
  Home,
  Menu,
  MessageSquare,
  PanelLeft,
  Play,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Users,
  Clock,
  MoreHorizontal,
  X,
  Phone,
  PhoneCall,
  Upload,
  BarChart3,
  PieChart,
  UserCheck,
  Volume2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for call analytics
const callData = [
  { date: "1/9", ai: 33, new: 40, general: 42 },
  { date: "1/10", ai: 35, new: 45, general: 52 },
  { date: "1/11", ai: 24, new: 32, general: 38 },
  { date: "1/12", ai: 42, new: 58, general: 65 },
  { date: "1/13", ai: 35, new: 42, general: 48 },
  { date: "1/14", ai: 48, new: 68, general: 75 },
  { date: "1/15", ai: 52, new: 72, general: 78 },
]

const categoryData = [
  { name: "技術サポート", value: 35, color: "#8b5cf6" },
  { name: "料金相談", value: 28, color: "#06b6d4" },
  { name: "新規問い合わせ", value: 22, color: "#10b981" },
  { name: "その他", value: 15, color: "#f59e0b" },
]

// Sample data for customers
const customers = [
  {
    id: "新規顧客",
    name: "新規顧客 (080-2253-0965)",
    phone: "08022530965",
    status: "待機中",
    attempts: "0/4",
    lastContact: "-",
    nextScheduled: "-",
  },
]

const tabSequence = ["home", "dashboard", "customers", "calls", "operator", "upload"] as const

type SidebarSubItem = {
  title: string
  url: string
  badge?: string
}

type SidebarItem = {
  title: string
  icon: ReactElement
  tabValue?: (typeof tabSequence)[number]
  badge?: string
  items?: SidebarSubItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: "ホーム",
    icon: <Home />,
    tabValue: "home", // Added tab mapping
  },
  {
    title: "ダッシュボード",
    icon: <BarChart3 />,
    tabValue: "dashboard", // Added tab mapping
    items: [
      { title: "概要", url: "#" },
      { title: "詳細分析", url: "#" },
      { title: "レポート", url: "#" },
    ],
  },
  {
    title: "顧客管理",
    icon: <Users />,
    tabValue: "customers", // Added tab mapping
    items: [
      { title: "全顧客", url: "#" },
      { title: "新規", url: "#", badge: "3" },
      { title: "フォローアップ", url: "#" },
    ],
  },
  {
    title: "通話履歴",
    icon: <Phone />,
    tabValue: "calls", // Added tab mapping
    items: [
      { title: "全て", url: "#" },
      { title: "完了", url: "#" },
      { title: "進行中", url: "#" },
      { title: "失敗", url: "#" },
    ],
  },
  {
    title: "オペレーター",
    icon: <UserCheck />,
    tabValue: "operator", // Added new operator tab mapping
  },
  {
    title: "CSVアップロード",
    icon: <Upload />,
    tabValue: "upload", // Added tab mapping
  },
  {
    title: "レポート",
    icon: <FileText />,
    items: [
      { title: "日次レポート", url: "#" },
      { title: "月次レポート", url: "#" },
      { title: "カスタム", url: "#" },
    ],
  },
  {
    title: "設定",
    icon: <Settings />,
  },
  {
    title: "ヘルプ",
    icon: <BookOpen />,
  },
]

const MotionButton = motion(Button)

const buttonMotionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 320, damping: 20 },
} as const


export function DesignaliCreative() {
  const [progress, setProgress] = useState(0)
  const [notifications, setNotifications] = useState(5)
  const [activeTab, setActiveTab] = useState<(typeof tabSequence)[number]>("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set())

  const tabCount = tabSequence.length
  const tabWidthPercent = 100 / tabCount
  const activeTabIndex = Math.max(
    tabSequence.findIndex((tab) => tab === activeTab),
    0,
  )
  const sliderLeft = `calc(${tabWidthPercent * activeTabIndex}% + 0.125rem)`
  const sliderWidth = `calc(${tabWidthPercent}% - 0.25rem)`

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Find the active sidebar item
    const activeItem = sidebarItems.find((item) => item.tabValue === activeTab)

    if (activeItem && activeItem.items) {
      // Keep only the active tab's toggle open, close all others
      setExpandedItems({ [activeItem.title]: true })
    } else {
      // If active tab doesn't have subitems, close all toggles
      setExpandedItems({})
    }
  }, [activeTab])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isTabValue = (value: string): value is (typeof tabSequence)[number] => {
    return tabSequence.includes(value as (typeof tabSequence)[number])
  }

  const handleTabChange = (newTab: string) => {
    if (isTabValue(newTab)) {
      setActiveTab(newTab)
    }
  }

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(customerId)) {
        newSet.delete(customerId)
      } else {
        newSet.add(customerId)
      }
      return newSet
    })
  }

  const selectAllCustomers = () => {
    if (selectedCustomers.size === customers.length) {
      setSelectedCustomers(new Set())
    } else {
      setSelectedCustomers(new Set(customers.map((c) => c.id)))
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <motion.div
        className={cn("fixed inset-y-0 left-0 z-50 w-64 bg-background md:hidden")}
        initial={false}
        animate={{
          x: mobileMenuOpen ? 0 : -256,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <Phone className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Reco</h2>
                <p className="text-xs text-muted-foreground">カスタマーサポート</p>
              </div>
            </div>
            <MotionButton
              {...buttonMotionProps}
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </MotionButton>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="検索..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  <motion.button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      item.tabValue === activeTab ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => {
                      if (item.tabValue) {
                        handleTabChange(item.tabValue)
                      }
                      if (item.items) {
                        toggleExpanded(item.title)
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <motion.div
                        animate={{ rotate: expandedItems[item.title] ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {item.items && expandedItems[item.title] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="mt-1 ml-6 space-y-1 border-l pl-3 overflow-hidden"
                      >
                        {item.items.map((subItem) => (
                          <motion.a
                            key={subItem.title}
                            href={subItem.url}
                            className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            {subItem.title}
                            {subItem.badge && (
                              <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                                {subItem.badge}
                              </Badge>
                            )}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>ゲ</AvatarFallback>
                  </Avatar>
                  <span>ゲスト管理者</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sidebar - Desktop */}
      <motion.div
        className={cn("fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background md:block")}
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -256,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        <div className="flex h-full flex-col">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <Phone className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Reco</h2>
                <p className="text-xs text-muted-foreground">カスタマーサポート</p>
              </div>
            </div>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="検索..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  <motion.button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      item.tabValue === activeTab ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => {
                      if (item.tabValue) {
                        handleTabChange(item.tabValue)
                      }
                      if (item.items) {
                        toggleExpanded(item.title)
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <motion.div
                        animate={{ rotate: expandedItems[item.title] ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {item.items && expandedItems[item.title] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="mt-1 ml-6 space-y-1 border-l pl-3 overflow-hidden"
                      >
                        {item.items.map((subItem) => (
                          <motion.a
                            key={subItem.title}
                            href={subItem.url}
                            className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            {subItem.title}
                            {subItem.badge && (
                              <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                                {subItem.badge}
                              </Badge>
                            )}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>ゲ</AvatarFallback>
                  </Avatar>
                  <span>ゲスト管理者</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className={cn("min-h-screen transition-all duration-300 ease-in-out")}
        initial={{
          opacity: 0,
          y: 24,
          paddingLeft: sidebarOpen ? 256 : 0,
        }}
        animate={{
          opacity: 1,
          y: 0,
          paddingLeft: sidebarOpen ? 256 : 0,
        }}
        transition={{
          opacity: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          y: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          paddingLeft: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          },
        }}
      >
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <MotionButton
            {...buttonMotionProps}
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </MotionButton>
          <MotionButton
            {...buttonMotionProps}
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <PanelLeft className="h-5 w-5" />
          </MotionButton>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Reco カスタマーサポート</h1>
            <div className="flex items-center gap-3">
              <MotionButton
                {...buttonMotionProps}
                className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg px-6 py-2 font-semibold"
                size="default"
                onClick={() => handleTabChange("operator")}
              >
                <UserCheck className="mr-2 h-5 w-5" />
                オペレーターコンソールへ
              </MotionButton>

              <MotionButton
                {...buttonMotionProps}
                className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg px-6 py-2 font-semibold"
                size="default"
                onClick={() => handleTabChange("customers")}
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                架電を開始
              </MotionButton>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MotionButton
                      {...buttonMotionProps}
                      variant="ghost"
                      size="icon"
                      className="rounded-2xl"
                    >
                      <Cloud className="h-5 w-5" />
                    </MotionButton>
                  </TooltipTrigger>
                  <TooltipContent>クラウドストレージ</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MotionButton
                      {...buttonMotionProps}
                      variant="ghost"
                      size="icon"
                      className="rounded-2xl"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </MotionButton>
                  </TooltipTrigger>
                  <TooltipContent>メッセージ</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MotionButton
                      {...buttonMotionProps}
                      variant="ghost"
                      size="icon"
                      className="rounded-2xl relative"
                    >
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {notifications}
                        </span>
                      )}
                    </MotionButton>
                  </TooltipTrigger>
                  <TooltipContent>通知</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar className="h-9 w-9 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>ゲ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="home" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative">
                <TabsList className="grid w-full max-w-[700px] grid-cols-6 rounded-2xl p-1 relative bg-muted/50">
                  <motion.div
                    className="absolute top-1 bottom-1 bg-white rounded-xl shadow-sm z-10"
                    animate={{
                      left: sliderLeft,
                      width: sliderWidth,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />

                  <TabsTrigger
                    value="home"
                    className="rounded-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none relative z-20 hover:bg-muted data-[state=active]:hover:bg-transparent transition-colors duration-200"
                    onClick={() => handleTabChange("home")}
                  >
                    ホーム
                  </TabsTrigger>

                  <TabsTrigger
                    value="dashboard"
                    className="rounded-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none relative z-20 hover:bg-muted data-[state=active]:hover:bg-transparent transition-colors duration-200"
                    onClick={() => handleTabChange("dashboard")}
                  >
                    ダッシュボード
                  </TabsTrigger>

                  <TabsTrigger
                    value="customers"
                    className="rounded-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none relative z-20 hover:bg-muted data-[state=active]:hover:bg-transparent transition-colors duration-200"
                    onClick={() => handleTabChange("customers")}
                  >
                    顧客管理
                  </TabsTrigger>

                  <TabsTrigger
                    value="calls"
                    className="rounded-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none relative z-20 hover:bg-muted data-[state=active]:hover:bg-transparent transition-colors duration-200"
                    onClick={() => handleTabChange("calls")}
                  >
                    通話履歴
                  </TabsTrigger>

                  <TabsTrigger
                    value="operator"
                    className="rounded-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none relative z-20 hover:bg-muted data-[state=active]:hover:bg-transparent transition-colors duration-200"
                    onClick={() => handleTabChange("operator")}
                  >
                    オペレーター
                  </TabsTrigger>

                  <TabsTrigger
                    value="upload"
                    className="rounded-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none relative z-20 hover:bg-muted data-[state=active]:hover:bg-transparent transition-colors duration-200"
                    onClick={() => handleTabChange("upload")}
                  >
                    CSV
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 28,
              }}
            >
                <TabsContent value="home" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-4">
                          <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">AI電話システム</Badge>
                          <h2 className="text-3xl font-bold">Recoへようこそ</h2>
                          <p className="max-w-[600px] text-white/80">
                            AI自動電話システムで効率的な営業活動を実行し、顧客との関係を強化しましょう。
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <MotionButton
                              {...buttonMotionProps}
                              className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90"
                            >
                              架電を開始
                            </MotionButton>
                            <MotionButton
                              {...buttonMotionProps}
                              variant="outline"
                              className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                            >
                              詳細な分析を確認
                            </MotionButton>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  {/* Quick Stats */}
                  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                      <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">今日の架電数</p>
                              <p className="text-3xl font-bold">24</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                              <Phone className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                      <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">成功率</p>
                              <p className="text-3xl font-bold">67.4%</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                              <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                      <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">総通話数</p>
                              <p className="text-3xl font-bold">156</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
                              <Users className="h-6 w-6 text-purple-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                      <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">平均通話時間</p>
                              <p className="text-3xl font-bold">4:45</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                              <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </section>

                  {/* Recent Activity */}
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">最新情報</h2>
                      <MotionButton
                        {...buttonMotionProps}
                        variant="ghost"
                        className="rounded-2xl"
                      >
                        すべて表示
                      </MotionButton>
                    </div>
                    <div className="rounded-3xl border">
                      <div className="divide-y">
                        <motion.div
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          className="flex items-center gap-4 p-4"
                        >
                          <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                          <div className="flex-1">
                            <p className="font-medium">キャンペーン「新規開拓 - 1月」が完了しました</p>
                            <p className="text-sm text-muted-foreground">2時間前</p>
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          className="flex items-center gap-4 p-4"
                        >
                          <div className="flex h-2 w-2 rounded-full bg-blue-500"></div>
                          <div className="flex-1">
                            <p className="font-medium">株式会社ABCから面談の予約が入りました</p>
                            <p className="text-sm text-muted-foreground">4時間前</p>
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          className="flex items-center gap-4 p-4"
                        >
                          <div className="flex h-2 w-2 rounded-full bg-orange-500"></div>
                          <div className="flex-1">
                            <p className="font-medium">今日の成功率が目標を上回りました</p>
                            <p className="text-sm text-muted-foreground">1日前</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="dashboard" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">ダッシュボード</h2>
                          <p className="max-w-[600px] text-white/80">AI電話システムの運用状況を確認できます</p>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  {/* Metrics Cards */}
                  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">総通話数</p>
                            <p className="text-3xl font-bold">156</p>
                            <p className="text-sm text-green-600">+12% 前月比</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">完了架電数</p>
                            <p className="text-3xl font-bold">89</p>
                            <p className="text-sm text-green-600">+8% 前月比</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                            <PhoneCall className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">成功率</p>
                            <p className="text-3xl font-bold">67.4%</p>
                            <p className="text-sm text-green-600">+3.2% 前月比</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                            <TrendingUp className="h-6 w-6 text-orange-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">平均通話時間</p>
                            <p className="text-3xl font-bold">4:45</p>
                            <p className="text-sm text-red-600">-5s 前月比</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
                            <Clock className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Charts */}
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <Card className="rounded-3xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          問い合わせ数推移
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={callData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Line type="monotone" dataKey="ai" stroke="#3b82f6" strokeWidth={2} />
                              <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} />
                              <Line type="monotone" dataKey="general" stroke="#ef4444" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span>AI解決</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span>新規解決</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span>総問い合わせ</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="h-5 w-5" />
                          カテゴリ別問い合わせ
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {categoryData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          {categoryData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                              <span>{item.name}</span>
                              <span className="ml-auto">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="customers" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">顧客管理</h2>
                          <p className="max-w-[600px] text-white/80">連絡先の管理と架電状況を確認できます</p>
                        </div>
                        <div className="flex gap-3">
                          <MotionButton
                            {...buttonMotionProps}
                            variant="outline"
                            className="rounded-2xl bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                            size="default"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            CSVアップロード
                          </MotionButton>
                          <MotionButton
                            {...buttonMotionProps}
                            className="rounded-2xl bg-white text-teal-700 hover:bg-white/90 shadow-lg px-6 py-2 font-semibold"
                            size="default"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            連絡先追加
                          </MotionButton>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  {/* Customer List */}
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>顧客一覧</CardTitle>
                          <CardDescription>連絡先の管理と架電状況を確認できます</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <MotionButton
                            {...buttonMotionProps}
                            className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg px-4 py-2 font-semibold"
                            size="default"
                          >
                            <PhoneCall className="mr-2 h-4 w-4" />
                            一括架電を開始
                          </MotionButton>
                          {/* Always show bulk call button with dynamic text and disabled state */}
                          <MotionButton
                            {...buttonMotionProps}
                            className={cn(
                              "rounded-2xl shadow-lg px-4 py-2 font-semibold",
                              selectedCustomers.size > 0
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed",
                            )}
                            size="default"
                            disabled={selectedCustomers.size === 0}
                          >
                            <PhoneCall className="mr-2 h-4 w-4" />
                            選択した{selectedCustomers.size}件を架電
                          </MotionButton>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="名前、会社名、電話番号で検索..." className="rounded-2xl pl-9" />
                        </div>
                      </div>
                      <div className="rounded-2xl border overflow-hidden">
                        <div className="bg-muted/50 p-3 grid grid-cols-10 text-sm font-medium">
                          <div className="col-span-1">
                            <input
                              type="checkbox"
                              checked={selectedCustomers.size === customers.length && customers.length > 0}
                              onChange={selectAllCustomers}
                              className="rounded"
                            />
                          </div>
                          <div className="col-span-3">連絡先</div>
                          <div className="col-span-2">ステータス</div>
                          <div className="col-span-1">架電回数</div>
                          <div className="col-span-1">最終実施</div>
                          <div className="col-span-2">操作</div>
                        </div>
                        <div className="divide-y">
                          {customers.map((customer) => (
                            <div key={customer.id} className="p-3 grid grid-cols-10 items-center">
                              <div className="col-span-1">
                                <input
                                  type="checkbox"
                                  checked={selectedCustomers.has(customer.id)}
                                  onChange={() => toggleCustomerSelection(customer.id)}
                                  className="rounded"
                                />
                              </div>
                              <div className="col-span-3">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium">
                                    新
                                  </div>
                                  <div>
                                    <p className="font-medium">{customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-2">
                                <Badge variant="outline" className="rounded-xl bg-yellow-50 text-yellow-700">
                                  {customer.status}
                                </Badge>
                              </div>
                              <div className="col-span-1">{customer.attempts}</div>
                              <div className="col-span-1">{customer.lastContact}</div>
                              <div className="col-span-2">
                                <div className="flex gap-2">
                                  <MotionButton
                                    {...buttonMotionProps}
                                    className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg px-4 py-2 text-sm font-semibold"
                                    size="sm"
                                  >
                                    <PhoneCall className="mr-1 h-3 w-3" />
                                    架電
                                  </MotionButton>
                                  <MotionButton
                                    {...buttonMotionProps}
                                    className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-600 text-white shadow-lg px-4 py-2 text-sm font-semibold"
                                    size="sm"
                                  >
                                    <FileText className="mr-1 h-3 w-3" />
                                    詳細
                                  </MotionButton>
                                  <MotionButton
                                    {...buttonMotionProps}
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-2xl text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 text-sm"
                                  >
                                    削除
                                  </MotionButton>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calls" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">通話履歴</h2>
                          <p className="max-w-[600px] text-white/80">過去の通話記録と文字起こしを確認できます</p>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  {/* Call Filters */}
                  <Card className="rounded-3xl">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-3 mb-4">
                        <MotionButton {...buttonMotionProps} className="rounded-2xl">
                          全て
                        </MotionButton>
                        <MotionButton
                          {...buttonMotionProps}
                          variant="outline"
                          className="rounded-2xl bg-transparent"
                        >
                          完了
                        </MotionButton>
                        <MotionButton
                          {...buttonMotionProps}
                          variant="outline"
                          className="rounded-2xl bg-transparent"
                        >
                          進行中
                        </MotionButton>
                        <MotionButton
                          {...buttonMotionProps}
                          variant="outline"
                          className="rounded-2xl bg-transparent"
                        >
                          失敗
                        </MotionButton>
                        <div className="flex-1"></div>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="顧客ID、電話番号、内容で検索..." className="rounded-2xl pl-9 w-[300px]" />
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">総件数: 0件</div>
                    </CardContent>
                  </Card>

                  {/* Empty State */}
                  <Card className="rounded-3xl">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                        <Phone className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">通話履歴が見つかりません</h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        まだ通話記録がありません。顧客管理から架電を開始してください。
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="upload" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">CSVアップロード</h2>
                          <p className="max-w-[600px] text-white/80">CSVファイルから連絡先を一括登録できます</p>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  {/* File Upload */}
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        ファイルアップロード
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-3xl p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">CSVファイルを選択またはドラッグ&ドロップ</p>
                            <p className="text-sm text-muted-foreground">最大ファイルサイズ: 10MB</p>
                          </div>
                        </div>
                      </div>
                      <MotionButton
                        {...buttonMotionProps}
                        className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700"
                      >
                        アップロード実行
                      </MotionButton>
                    </CardContent>
                  </Card>

                  {/* CSV Format Guide */}
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <CardTitle>CSVフォーマットガイド</CardTitle>
                      <CardDescription>以下の列を含むCSVファイルをアップロードしてください：</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div>
                          <strong>name:</strong> 氏名（必須）
                        </div>
                        <div>
                          <strong>phone:</strong> 電話番号（必須）
                        </div>
                        <div>
                          <strong>email:</strong> メールアドレス（任意）
                        </div>
                        <div>
                          <strong>company:</strong> 会社名（任意）
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium mb-2">サンプル：</h4>
                        <div className="bg-muted p-4 rounded-2xl font-mono text-sm">
                          name,phone,email,company
                          <br />
                          田中太郎,03-1234-5678,tanaka@example.com,株式会社ABC
                          <br />
                          佐藤花子,03-9876-5432,sato@example.com,株式会社XYZ
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-muted-foreground space-y-1">
                        <div>※ UTF-8、UTF-8 BOM、Shift_JIS、CP932エンコーディングに対応</div>
                        <div>※ カンマ区切り（,）またはタブ区切りのCSVファイルに対応</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="operator" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">オペレーター</h2>
                          <p className="max-w-[600px] text-white/80">
                            オペレーター専用の高度な機能とツールにアクセスできます
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  {/* WebRTC Terminal */}
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>WebRTC オペレーター端末</CardTitle>
                        <Badge variant="outline" className="rounded-xl">
                          状態: 未接続
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                          <label className="text-sm font-medium">WebSocket URL</label>
                          <Input defaultValue="ws://localhost:8088/ws" className="rounded-2xl" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">SIP URI</label>
                          <Input defaultValue="sip:webrtc-op@localhost" className="rounded-2xl" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">マイク</label>
                          <select className="w-full rounded-2xl border border-input bg-background px-3 py-2">
                            <option>MacBook Proのマイク (Built-in)</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <MotionButton {...buttonMotionProps} className="rounded-2xl">
                          接続
                        </MotionButton>
                        <MotionButton
                          {...buttonMotionProps}
                          variant="outline"
                          className="rounded-2xl bg-transparent"
                        >
                          切断
                        </MotionButton>
                        <MotionButton
                          {...buttonMotionProps}
                          variant="outline"
                          className="rounded-2xl bg-transparent"
                        >
                          マイク更新
                        </MotionButton>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        接続後にモニターやへの切替を実行してください。音量調整は基本設定で行えます。
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl">
                        <MotionButton
                          {...buttonMotionProps}
                          variant="ghost"
                          size="icon"
                          className="rounded-2xl"
                        >
                          <Play className="h-4 w-4" />
                        </MotionButton>
                        <div className="flex-1 text-sm">0:00 / 0:00</div>
                        <MotionButton
                          {...buttonMotionProps}
                          variant="ghost"
                          size="icon"
                          className="rounded-2xl"
                        >
                          <Volume2 className="h-4 w-4" />
                        </MotionButton>
                        <MotionButton
                          {...buttonMotionProps}
                          variant="ghost"
                          size="icon"
                          className="rounded-2xl"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </MotionButton>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Operator Status */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">オペレーター状態</p>
                            <p className="text-2xl font-bold">オンライン</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                            <UserCheck className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">処理中通話</p>
                            <p className="text-2xl font-bold">3</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                            <PhoneCall className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">待機中案件</p>
                            <p className="text-2xl font-bold">12</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                            <Clock className="h-6 w-6 text-orange-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">今日の処理数</p>
                            <p className="text-2xl font-bold">28</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Advanced Controls */}
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        高度なコントロール
                      </CardTitle>
                      <CardDescription>オペレーター専用の詳細設定と管理機能</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="rounded-3xl border-l-4 border-l-violet-500 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                                  <Volume2 className="h-6 w-6 text-violet-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">音声品質管理</h3>
                                  <p className="text-sm text-muted-foreground">通話音声の品質監視と調整</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="rounded-3xl border-l-4 border-l-blue-500 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                                  <MessageSquare className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">リアルタイム監視</h3>
                                  <p className="text-sm text-muted-foreground">進行中の通話をリアルタイムで監視</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="rounded-3xl border-l-4 border-l-green-500 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                                  <BarChart3 className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">詳細レポート</h3>
                                  <p className="text-sm text-muted-foreground">オペレーター専用の詳細分析レポート</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="rounded-3xl border-l-4 border-l-red-500 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                                  <Bell className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">緊急対応</h3>
                                  <p className="text-sm text-muted-foreground">緊急事態への迅速な対応機能</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Calls Monitor */}
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PhoneCall className="h-5 w-5" />
                        アクティブ通話監視
                      </CardTitle>
                      <CardDescription>現在進行中の通話をリアルタイムで監視</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-2xl border overflow-hidden">
                        <div className="bg-muted/50 p-3 grid grid-cols-12 text-sm font-medium">
                          <div className="col-span-3">顧客情報</div>
                          <div className="col-span-2">通話時間</div>
                          <div className="col-span-2">ステータス</div>
                          <div className="col-span-2">オペレーター</div>
                          <div className="col-span-2">品質</div>
                          <div className="col-span-1">操作</div>
                        </div>
                        <div className="p-8 text-center text-muted-foreground">
                          <PhoneCall className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>現在アクティブな通話はありません</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
            </motion.div>
          </Tabs>
        </main>
      </motion.div>
    </div>
  )
}
