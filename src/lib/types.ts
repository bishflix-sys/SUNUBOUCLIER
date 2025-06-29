import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type StatCardData = {
  label: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
};

export type TrafficData = {
  name: string;
  total: number;
};

export type RecentActivity = {
  id: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
};

export type Rule = {
  id: string;
  name: string;
  description: string;
  type: "Semantic" | "Rate Limit" | "Firewall";
  enabled: boolean;
};

export type Site = {
  id: string;
  name: string;
  url: string;
  status: "Online" | "Offline";
  ssl: boolean;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  severity: "Info" | "Warning" | "Error" | "Critical";
  sourceIp: string;
  request: string;
  action: "Allowed" | "Blocked" | "Monitored";
};
