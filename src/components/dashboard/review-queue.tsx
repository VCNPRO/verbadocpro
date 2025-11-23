"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"

const reviewItems = [
  {
    id: 1,
    type: "Revisión Rápida",
    count: 18,
    avgTime: "5-10 min",
    variant: "warning" as const,
  },
  {
    id: 2,
    type: "Revisión Completa",
    count: 5,
    avgTime: "15-20 min",
    variant: "destructive" as const,
  },
]

export function ReviewQueue() {
  const totalDocuments = reviewItems.reduce((sum, item) => sum + item.count, 0)
  const estimatedTime = 2.5

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Mi Cola de Revisión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">
              {totalDocuments} documentos pendientes
            </span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              ~{estimatedTime} horas
            </div>
          </div>

          <div className="space-y-2">
            {reviewItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={item.variant}>{item.count}</Badge>
                  <span className="text-sm">{item.type}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.avgTime} c/u
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full" size="lg">
          Empezar a Revisar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
