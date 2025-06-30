"use client"

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { logs as initialLogs } from "@/lib/data";
import type { LogEntry } from "@/lib/types";
import { Search, FileDown, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const LOGS_PER_PAGE = 8;

export default function LogsPage() {
    const { toast } = useToast();
    const [logs, setLogs] = React.useState<LogEntry[]>(initialLogs);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [date, setDate] = React.useState<Date | undefined>();
    const [currentPage, setCurrentPage] = React.useState(1);

    const filteredLogs = React.useMemo(() => {
        return logs.filter(log => {
            const searchTermMatch = log.request.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  log.sourceIp.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  log.severity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  log.action.toLowerCase().includes(searchTerm.toLowerCase());
            
            const dateMatch = date ? isSameDay(new Date(log.timestamp), date) : true;

            return searchTermMatch && dateMatch;
        });
    }, [logs, searchTerm, date]);

    const totalPages = Math.ceil(filteredLogs.length / LOGS_PER_PAGE) || 1;
    const paginatedLogs = filteredLogs.slice(
        (currentPage - 1) * LOGS_PER_PAGE,
        currentPage * LOGS_PER_PAGE
    );

    const handleExport = () => {
        toast({
            title: "Exporting logs...",
            description: "Your log data is being prepared for download.",
        });
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setCurrentPage(1);
    }
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    }

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
                                    <Input 
                                        placeholder="Search logs..." 
                                        className="pl-8" 
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
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
                                            onSelect={handleDateSelect}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {date && <Button variant="ghost" onClick={() => setDate(undefined)}>Clear</Button>}
                            </div>
                            <Button variant="outline" onClick={handleExport}>
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
                                    {paginatedLogs.length > 0 ? (
                                        paginatedLogs.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell className="font-mono text-xs">{format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}</TableCell>
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
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center h-24">No logs found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-between items-center space-x-2">
                             <span className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                             </span>
                             <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Previous</Button>
                                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}>Next</Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
