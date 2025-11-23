"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { name: "Lun", procesados: 856, autoAprobados: 742, revision: 114 },
  { name: "Mar", procesados: 932, autoAprobados: 821, revision: 111 },
  { name: "Mié", procesados: 1045, autoAprobados: 934, revision: 111 },
  { name: "Jue", procesados: 978, autoAprobados: 879, revision: 99 },
  { name: "Vie", procesados: 1123, autoAprobados: 1034, revision: 89 },
  { name: "Sáb", procesados: 345, autoAprobados: 312, revision: 33 },
  { name: "Dom", procesados: 278, autoAprobados: 256, revision: 22 },
]

export function ProcessingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Evolución Semanal de Procesamiento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="procesados"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Total Procesados"
              dot={{ fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="autoAprobados"
              stroke="#10b981"
              strokeWidth={2}
              name="Auto-aprobados"
              dot={{ fill: "#10b981" }}
            />
            <Line
              type="monotone"
              dataKey="revision"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Requieren Revisión"
              dot={{ fill: "#f59e0b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
