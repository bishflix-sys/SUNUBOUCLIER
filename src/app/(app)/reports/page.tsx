import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ThreatsOverTimeChart } from "@/components/reports/threats-over-time-chart";
import { ThreatsByTypeChart } from "@/components/reports/threats-by-type-chart";
import { topBlockedIPsData } from "@/lib/data";

export default function ReportsPage() {
  return (
    <>
      <Header title="Reports" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <ThreatsOverTimeChart />
          <ThreatsByTypeChart />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Top Blocked IPs</CardTitle>
            <CardDescription>
              IP addresses with the most blocked malicious requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Blocked Requests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topBlockedIPsData.map((row) => (
                  <TableRow key={row.ip}>
                    <TableCell className="font-medium">{row.ip}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell className="text-right font-mono">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
