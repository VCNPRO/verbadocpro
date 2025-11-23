"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Sparkles, FileCheck } from "lucide-react"

const improvements = [
  {
    id: 1,
    title: "Modelo \"Albaranes Proveedor ABC\" actualizado",
    description: "Precisión mejoró de 94% a 97%",
    improvement: "+3%",
    date: "Ayer",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    id: 2,
    title: "Nueva plantilla \"Contratos de Arrendamiento\" disponible",
    description: "89% de precisión inicial (aprenderá con uso)",
    date: "Hace 2 días",
    icon: Sparkles,
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "Informe semanal listo",
    description: "6,234 docs procesados, 84% auto-aprobados",
    date: "Hace 3 días",
    icon: FileCheck,
    color: "text-blue-500",
  },
]

export function RecentImprovements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Mejoras Recientes del Sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {improvements.map((improvement) => (
            <div
              key={improvement.id}
              className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
            >
              <div className={`mt-1 ${improvement.color}`}>
                <improvement.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-none">
                    {improvement.title}
                  </p>
                  {improvement.improvement && (
                    <Badge variant="success" className="shrink-0">
                      {improvement.improvement}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {improvement.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {improvement.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
