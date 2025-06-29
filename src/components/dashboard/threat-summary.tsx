"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zeroDayThreatSummary } from "@/ai/flows/threat-summary";
import { Lightbulb } from "lucide-react";

const logDataExample = `
[2023-10-27 10:00:00] WARN: Unusual outbound connection to 123.45.67.89 on port 4444.
[2023-10-27 10:05:12] INFO: User 'admin' logged in from 192.168.1.1.
[2023-10-27 10:15:30] CRITICAL: Unrecognized process 'exploit.sh' attempting to access /etc/shadow.
[2023-10-27 10:20:00] INFO: New rule 'block-suspicious-outbound' auto-applied.
`;

export function ThreatSummary() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        const result = await zeroDayThreatSummary({
          timePeriod: "last 24 hours",
          logData: logDataExample,
        });
        setSummary(result.summary);
      } catch (error) {
        console.error("Error fetching threat summary:", error);
        setSummary("Could not load threat summary at this time.");
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-2 bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-accent" />
          <span>AI-Powered Threat Summary</span>
        </CardTitle>
        <CardDescription>
          AI-generated summary of potential zero-day threats detected.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-muted-foreground/10 rounded-full w-3/4 animate-pulse"></div>
            <div className="h-4 bg-muted-foreground/10 rounded-full w-1/2 animate-pulse"></div>
          </div>
        ) : (
          <blockquote className="border-l-2 border-accent pl-4 italic text-sm">
            {summary}
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
}
