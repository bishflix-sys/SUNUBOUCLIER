"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentActivities } from "@/lib/data";

const severityVariantMap = {
  low: "default",
  medium: "secondary",
  high: "destructive",
  critical: "destructive",
} as const;


export function RecentActivity() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Activité Récente</CardTitle>
        <CardDescription>Un journal des événements de sécurité et des actions les plus récents.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Événement</TableHead>
              <TableHead className="hidden sm:table-cell">Sévérité</TableHead>
              <TableHead className="text-right">Heure</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                    <div className="font-medium">{activity.description}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={severityVariantMap[activity.severity]} className="capitalize">
                    {activity.severity}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
