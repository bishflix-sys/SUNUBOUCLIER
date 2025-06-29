"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { threatsByTypeData } from "@/lib/data"

export function ThreatsByTypeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Threats by Type</CardTitle>
        <CardDescription>Distribution of detected threat types.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[200px] w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={threatsByTypeData}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      className="text-xs font-bold"
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  )
                }}
              >
                {threatsByTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
