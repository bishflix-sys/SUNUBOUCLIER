import {
  BarChart2,
  FileText,
  Globe,
  LayoutDashboard,
  Shield,
  Settings,
  ArrowUp,
  Activity,
  AlertTriangle,
  Server,
} from "lucide-react";
import type { NavItem, StatCardData, TrafficData, RecentActivity, Rule, Site, LogEntry } from "./types";

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/rules", label: "Règles", icon: Shield },
  { href: "/sites", label: "Sites", icon: Globe },
  { href: "/logs", label: "Journaux", icon: FileText },
  { href: "/reports", label: "Rapports", icon: BarChart2 },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

export const statCards: StatCardData[] = [
  {
    label: "Requêtes Totales",
    value: "480,295",
    change: "+20.1% depuis le mois dernier",
    changeType: "increase",
    icon: Activity,
  },
  {
    label: "Menaces Bloquées",
    value: "1,237",
    change: "+180.1% depuis le mois dernier",
    changeType: "increase",
    icon: AlertTriangle,
  },
  {
    label: "Disponibilité",
    value: "99.98%",
    change: "-0.01% depuis le mois dernier",
    changeType: "decrease",
    icon: ArrowUp,
  },
  {
    label: "Charge CPU",
    value: "34%",
    change: "+2% depuis la dernière heure",
    changeType: "increase",
    icon: Server,
  },
];

export const trafficData: TrafficData[] = [
  { name: "Janv", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Févr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mars", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Avr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mai", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Juin", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Juil", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Août", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sept", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Déc", total: Math.floor(Math.random() * 5000) + 1000 },
];

export const recentActivities: RecentActivity[] = [
  { id: "1", description: "Tentative d'injection SQL depuis 192.168.1.100 bloquée.", timestamp: "il y a 2 minutes", severity: "high" },
  { id: "2", description: "Nouvelle règle 'Bloquer-Noeuds-Sortie-Tor' activée.", timestamp: "il y a 15 minutes", severity: "low" },
  { id: "3", description: "Utilisation CPU a dépassé le seuil de 80%.", timestamp: "il y a 1 heure", severity: "medium" },
  { id: "4", description: "Attaque XSS sur le point de terminaison /login empêchée.", timestamp: "il y a 3 heures", severity: "high" },
  { id: "5", description: "Configuration mise à jour pour api.example.com.", timestamp: "il y a 5 heures", severity: "low" },
];

export const rules: Rule[] = [
  { id: "RULE-001", name: "Blocage des motifs SQLi courants", description: "Protège contre les attaques par injection SQL courantes en faisant correspondre des motifs connus.", type: "Semantic", enabled: true },
  { id: "RULE-002", name: "Prévention du Cross-Site Scripting (XSS)", description: "Filtre et assainit les entrées pour prévenir les attaques XSS persistantes et réfléchies.", type: "Semantic", enabled: true },
  { id: "RULE-003", name: "Protection contre la force brute de connexion", description: "Limite les tentatives de connexion à 5 par minute depuis une seule IP.", type: "Rate Limit", enabled: true },
  { id: "RULE-004", name: "Blocage des User-Agents malveillants", description: "Bloque les requêtes provenant d'user-agents et de scanners malveillants connus.", type: "Firewall", enabled: false },
  { id: "RULE-005", name: "Bouclier contre l'Exécution de Code à Distance (RCE)", description: "Inspecte les charges utiles pour détecter les signatures d'exécution de code à distance.", type: "Semantic", enabled: true },
];

export const sites: Site[] = [
  { id: "SITE-001", name: "Site Web Principal", url: "www.example.com", status: "Online", ssl: true },
  { id: "SITE-002", name: "Passerelle API", url: "api.example.com", status: "Online", ssl: true },
  { id: "SITE-003", name: "Environnement de Test", url: "staging.example.com", status: "Offline", ssl: false },
  { id: "SITE-004", name: "Page Marketing", url: "promo.example.com", status: "Online", ssl: true },
];

export const logs: LogEntry[] = [
    { id: '1', timestamp: '2024-07-20T10:00:00Z', severity: 'Error', sourceIp: '198.51.100.1', request: 'POST /api/login', action: 'Blocked' },
    { id: '2', timestamp: '2024-07-20T10:00:05Z', severity: 'Info', sourceIp: '203.0.113.25', request: 'GET /', action: 'Allowed' },
    { id: '3', timestamp: '2024-07-21T10:01:10Z', severity: 'Warning', sourceIp: '198.51.100.2', request: 'GET /admin', action: 'Monitored' },
    { id: '4', timestamp: '2024-07-21T10:02:00Z', severity: 'Critical', sourceIp: '198.51.100.1', request: "GET /?q=' OR 1=1", action: 'Blocked' },
    { id: '5', timestamp: '2024-07-22T10:02:30Z', severity: 'Info', sourceIp: '203.0.113.26', request: 'GET /pricing', action: 'Allowed' },
    { id: '6', timestamp: '2024-07-22T10:03:00Z', severity: 'Info', sourceIp: '203.0.113.25', request: 'GET /about', action: 'Allowed' },
    { id: '7', timestamp: '2024-07-23T10:04:00Z', severity: 'Error', sourceIp: '198.51.100.3', request: 'POST /api/v1/users', action: 'Blocked' },
    { id: '8', timestamp: '2024-07-23T10:05:00Z', severity: 'Warning', sourceIp: '192.0.2.14', request: 'GET /old-endpoint', action: 'Monitored' },
    { id: '9', timestamp: '2024-07-24T10:05:30Z', severity: 'Info', sourceIp: '203.0.113.27', request: 'GET /contact', action: 'Allowed' },
    { id: '10', timestamp: '2024-07-24T10:06:00Z', severity: 'Critical', sourceIp: '198.51.100.1', request: 'GET /?q=<script>alert(1)</script>', action: 'Blocked' },
  ];
  

export const threatsOverTimeData = [
    { date: '2023-10-01', threats: 22 },
    { date: '2023-10-02', threats: 45 },
    { date: '2023-10-03', threats: 30 },
    { date: '2023-10-04', threats: 80 },
    { date: '2023-10-05', threats: 55 },
    { date: '2023-10-06', threats: 102 },
    { date: '2023-10-07', threats: 95 },
]

export const threatsByTypeData = [
    { type: 'Injection SQL', count: 450, fill: 'hsl(var(--chart-1))' },
    { type: 'XSS', count: 320, fill: 'hsl(var(--chart-2))' },
    { type: 'Exécution Code', count: 180, fill: 'hsl(var(--chart-3))' },
    { type: 'Inclusion Fichier', count: 95, fill: 'hsl(var(--chart-4))' },
    { type: 'Autres', count: 210, fill: 'hsl(var(--chart-5))' },
]

export const topBlockedIPsData = [
    { ip: '198.51.100.1', count: 124, country: 'Russie' },
    { ip: '104.28.18.34', count: 98, country: 'Chine' },
    { ip: '203.0.113.55', count: 76, country: 'États-Unis' },
    { ip: '192.0.2.14', count: 52, country: 'Brésil' },
    { ip: '93.184.216.34', count: 31, country: 'Pays-Bas' },
]
