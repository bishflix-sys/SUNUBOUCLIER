import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ThreatSummary } from "@/components/dashboard/threat-summary";
import { statCards } from "@/lib/data";

export default function DashboardPage() {
  return (
    <>
      <Header title="Tableau de bord" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatCard key={card.label} card={card} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
           <ThreatSummary />
           <TrafficChart />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <RecentActivity />
        </div>
      </main>
    </>
  );
}
