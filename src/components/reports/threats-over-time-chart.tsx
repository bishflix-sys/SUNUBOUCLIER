"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { threatsOverTimeData } from "@/lib/data"

export function ThreatsOverTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Menaces au Fil du Temps</CardTitle>
        <CardDescription>Tendances quotidiennes de détection des menaces.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[200px] w-full">
          <ResponsiveContainer>
            <LineChart
              data={threatsOverTimeData}
              margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
              <YAxis tickLine={false} axisLine={false} stroke="#888888" fontSize={12}/>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line type="monotone" dataKey="threats" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
