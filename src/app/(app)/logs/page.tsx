"use client"

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { logs } from "@/lib/data";
import { Search, FileDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as React from "react";

export default function LogsPage() {
    const [date, setDate] = React.useState<Date>()

  return (
    <>
      <Header title="Logs" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Logs</CardTitle>
            <CardDescription>
              Review and filter all incoming request logs and security events.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search logs..." className="pl-8" />
                    </div>
                     <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full sm:w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Source IP</TableHead>
                    <TableHead>Request</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={log.severity === "Critical" || log.severity === "Error" ? "destructive" : "secondary"}>
                          {log.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.sourceIp}</TableCell>
                      <TableCell className="font-code text-sm">{log.request}</TableCell>
                      <TableCell>
                        <span className={cn("font-medium", log.action === "Blocked" ? "text-destructive" : "text-green-600")}>
                          {log.action}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end items-center space-x-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
