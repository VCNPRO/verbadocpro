"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ReviewQueue } from "@/components/dashboard/review-queue"
import { RecentImprovements } from "@/components/dashboard/recent-improvements"
import { ProcessingChart } from "@/components/dashboard/processing-chart"
import {
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido a Verbadoc Enterprise - Vista general de tu actividad
          </p>
        </div>

        {/* Stats Grid - HOY */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Hoy
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Documentos Procesados"
              value="234"
              icon={FileText}
              color="text-blue-500"
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Auto-aprobados"
              value="216"
              description="92% de precisión"
              icon={CheckCircle2}
              color="text-green-500"
            />
            <StatsCard
              title="En Revisión"
              value="18"
              description="8% requieren atención"
              icon={Clock}
              color="text-orange-500"
            />
            <StatsCard
              title="Tiempo Ahorrado"
              value="6.8h"
              description="vs proceso manual"
              icon={Zap}
              color="text-purple-500"
              trend={{ value: 8, isPositive: true }}
            />
          </div>
        </div>

        {/* Stats Grid - ESTA SEMANA */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Esta Semana</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Documentos Procesados"
              value="1,456"
              icon={FileText}
              color="text-blue-500"
            />
            <StatsCard
              title="Auto-aprobados"
              value="1,267"
              description="87% de precisión"
              icon={CheckCircle2}
              color="text-green-500"
            />
            <StatsCard
              title="Revisados"
              value="189"
              icon={Clock}
              color="text-orange-500"
            />
            <StatsCard
              title="Mejora IA"
              value="+1.8%"
              description="vs semana anterior"
              icon={TrendingUp}
              color="text-cyan-500"
            />
          </div>
        </div>

        {/* Charts and Details */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Processing Chart - Spans 2 columns */}
          <div className="lg:col-span-2">
            <ProcessingChart />
          </div>

          {/* Review Queue */}
          <div>
            <ReviewQueue />
          </div>
        </div>

        {/* Recent Improvements */}
        <div>
          <RecentImprovements />
        </div>

        {/* Stats Grid - ESTE MES */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Este Mes</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Documentos Procesados"
              value="6,234"
              icon={FileText}
              color="text-blue-500"
            />
            <StatsCard
              title="Auto-aprobados"
              value="5,236"
              description="84% de precisión"
              icon={CheckCircle2}
              color="text-green-500"
            />
            <StatsCard
              title="Revisados"
              value="998"
              icon={Clock}
              color="text-orange-500"
            />
            <StatsCard
              title="Ahorro Total"
              value="248h"
              description="€12,400 estimado"
              icon={Zap}
              color="text-purple-500"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
