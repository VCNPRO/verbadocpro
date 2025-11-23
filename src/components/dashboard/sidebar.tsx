"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Upload,
  FileText,
  CheckCircle2,
  BarChart3,
  Settings,
  Layers,
  Brain,
} from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-blue-500",
  },
  {
    label: "Subir Documentos",
    icon: Upload,
    href: "/upload",
    color: "text-violet-500",
  },
  {
    label: "Procesamiento",
    icon: Layers,
    href: "/processing",
    color: "text-pink-500",
  },
  {
    label: "Revisar",
    icon: CheckCircle2,
    href: "/review",
    color: "text-orange-500",
  },
  {
    label: "Documentos",
    icon: FileText,
    href: "/documents",
    color: "text-emerald-500",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
    color: "text-cyan-500",
  },
  {
    label: "Aprendizaje IA",
    icon: Brain,
    href: "/learning",
    color: "text-purple-500",
  },
  {
    label: "Configuración",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative h-10 w-10 mr-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Verbadoc
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-lg transition",
                pathname === route.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="px-3 py-2 rounded-lg bg-gradient-to-tr from-blue-600/10 to-cyan-400/10 border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            Enterprise Plan
          </p>
          <p className="text-xs text-muted-foreground">
            Procesamiento ilimitado con IA
          </p>
        </div>
      </div>
    </div>
  )
}
