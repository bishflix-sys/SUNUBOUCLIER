import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCardData } from "@/lib/types";

export function StatCard({ card }: { card: StatCardData }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
        <card.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.value}</div>
        <p className="text-xs text-muted-foreground">{card.change}</p>
      </CardContent>
    </Card>
  );
}
