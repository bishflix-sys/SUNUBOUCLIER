import {
  BarChart2,
  FileText,
  Globe,
  LayoutDashboard,
  Shield,
  Settings,
  ArrowDown,
  ArrowUp,
  Activity,
  AlertTriangle,
  Server,
  Signal,
} from "lucide-react";
import type { NavItem, StatCardData, TrafficData, RecentActivity, Rule, Site, LogEntry } from "./types";

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/rules", label: "Rules", icon: Shield },
  { href: "/sites", label: "Sites", icon: Globe },
  { href: "/logs", label: "Logs", icon: FileText },
  { href: "/reports", label: "Reports", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const statCards: StatCardData[] = [
  {
    label: "Total Requests",
    value: "480,295",
    change: "+20.1% from last month",
    changeType: "increase",
    icon: Activity,
  },
  {
    label: "Threats Blocked",
    value: "1,237",
    change: "+180.1% from last month",
    changeType: "increase",
    icon: AlertTriangle,
  },
  {
    label: "Uptime",
    value: "99.98%",
    change: "-0.01% from last month",
    changeType: "decrease",
    icon: ArrowUp,
  },
  {
    label: "CPU Load",
    value: "34%",
    change: "+2% from last hour",
    changeType: "increase",
    icon: Server,
  },
];

export const trafficData: TrafficData[] = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

export const recentActivities: RecentActivity[] = [
  { id: "1", description: "SQL Injection attempt from 192.168.1.100 blocked.", timestamp: "2 minutes ago", severity: "high" },
  { id: "2", description: "New rule 'Block-Tor-Exit-Nodes' enabled.", timestamp: "15 minutes ago", severity: "low" },
  { id: "3", description: "CPU usage exceeded 80% threshold.", timestamp: "1 hour ago", severity: "medium" },
  { id: "4", description: "XSS attack on /login endpoint prevented.", timestamp: "3 hours ago", severity: "high" },
  { id: "5", description: "Configuration updated for api.example.com", timestamp: "5 hours ago", severity: "low" },
];

export const rules: Rule[] = [
  { id: "RULE-001", name: "Block Common SQLi Patterns", description: "Protects against common SQL injection attacks by matching known patterns.", type: "Semantic", enabled: true },
  { id: "RULE-002", name: "Prevent Cross-Site Scripting (XSS)", description: "Filters and sanitizes inputs to prevent persistent and reflected XSS.", type: "Semantic", enabled: true },
  { id: "RULE-003", name: "Login Brute-Force Protection", description: "Limits login attempts to 5 per minute from a single IP.", type: "Rate Limit", enabled: true },
  { id: "RULE-004", name: "Block Malicious User-Agents", description: "Blocks requests from known malicious user agents and scanners.", type: "Firewall", enabled: false },
  { id: "RULE-005", name: "Remote Code Execution (RCE) Shield", description: "Inspects payloads for signatures of remote code execution.", type: "Semantic", enabled: true },
];

export const sites: Site[] = [
  { id: "SITE-001", name: "Main Corporate Website", url: "www.example.com", status: "Online", ssl: true },
  { id: "SITE-002", name: "API Gateway", url: "api.example.com", status: "Online", ssl: true },
  { id: "SITE-003", name: "Staging Environment", url: "staging.example.com", status: "Offline", ssl: false },
  { id: "SITE-004", name: "Marketing Landing Page", url: "promo.example.com", status: "Online", ssl: true },
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
    { type: 'SQLi', count: 450, fill: 'hsl(var(--chart-1))' },
    { type: 'XSS', count: 320, fill: 'hsl(var(--chart-2))' },
    { type: 'RCE', count: 180, fill: 'hsl(var(--chart-3))' },
    { type: 'LFI', count: 95, fill: 'hsl(var(--chart-4))' },
    { type: 'Other', count: 210, fill: 'hsl(var(--chart-5))' },
]

export const topBlockedIPsData = [
    { ip: '198.51.100.1', count: 124, country: 'Russia' },
    { ip: '104.28.18.34', count: 98, country: 'China' },
    { ip: '203.0.113.55', count: 76, country: 'USA' },
    { ip: '192.0.2.14', count: 52, country: 'Brazil' },
    { ip: '93.184.216.34', count: 31, country: 'Netherlands' },
]
