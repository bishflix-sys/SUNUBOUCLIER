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
[2023-10-27 10:00:00] WARN: Connexion sortante inhabituelle vers 123.45.67.89 sur le port 4444.
[2023-10-27 10:05:12] INFO: Utilisateur 'admin' connecté depuis 192.168.1.1.
[2023-10-27 10:15:30] CRITICAL: Processus non reconnu 'exploit.sh' tentant d'accéder à /etc/shadow.
[2023-10-27 10:20:00] INFO: Nouvelle règle 'bloquer-sorties-suspectes' appliquée automatiquement.
`;

export function ThreatSummary() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        const result = await zeroDayThreatSummary({
          timePeriod: "dernières 24 heures",
          logData: logDataExample,
        });
        setSummary(result.summary);
      } catch (error) {
        console.error("Erreur lors de la récupération du résumé des menaces:", error);
        setSummary("Impossible de charger le résumé des menaces pour le moment.");
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
          <span>Résumé des Menaces par l'IA</span>
        </CardTitle>
        <CardDescription>
          Résumé généré par l'IA des menaces zero-day potentielles détectées.
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
