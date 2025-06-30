"use client"

import * as React from "react"
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type ApiKey = {
    key: string;
    display: string;
    createdAt: string;
}

export default function SettingsPage() {
    const { toast } = useToast();

    // State for General Settings
    const [adminEmail, setAdminEmail] = React.useState("admin@sunubouclier.sn");
    const [instanceName, setInstanceName] = React.useState("SunuBouclier - Production");

    // State for Notifications
    const [emailAlerts, setEmailAlerts] = React.useState(true);
    const [slackAlerts, setSlackAlerts] = React.useState(false);
    const [webhookUrl, setWebhookUrl] = React.useState("");

    // State for API Management
    const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([
        { key: `prod_sk_${Math.random().toString(36).substr(2, 16)}`, display: "prod_sk_******************1234", createdAt: new Date().toISOString() }
    ]);

    const handleSaveGeneral = (e: React.FormEvent) => {
        e.preventDefault();
        toast({ title: "Settings Saved", description: "General settings have been updated." });
    };

    const handleSaveNotifications = (e: React.FormEvent) => {
        e.preventDefault();
        toast({ title: "Settings Saved", description: "Notification settings have been updated." });
    };

    const generateApiKey = () => {
        const newKey = `prod_sk_${Math.random().toString(36).substr(2, 22)}`;
        const newDisplayKey = `${newKey.slice(0, 8)}******************${newKey.slice(-4)}`;
        const newApiKey: ApiKey = {
            key: newKey,
            display: newDisplayKey,
            createdAt: new Date().toISOString(),
        }
        setApiKeys(keys => [...keys, newApiKey]);
        toast({ title: "API Key Generated", description: "A new API key has been created. Make sure to copy it now.", duration: 10000 });
    };

    const revokeApiKey = (keyToRevoke: string) => {
        setApiKeys(keys => keys.filter(k => k.key !== keyToRevoke));
        toast({ title: "API Key Revoked", description: "The selected API key has been revoked." });
    };

    return (
        <>
            <Header title="Settings" />
            <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
                <div className="space-y-6">
                    <form onSubmit={handleSaveGeneral}>
                        <Card>
                            <CardHeader>
                                <CardTitle>General Settings</CardTitle>
                                <CardDescription>
                                    Manage general application settings.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="admin-email">Admin Email</Label>
                                    <Input id="admin-email" type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instance-name">Instance Name</Label>
                                    <Input id="instance-name" value={instanceName} onChange={e => setInstanceName(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </form>
                    
                    <form onSubmit={handleSaveNotifications}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>
                                    Configure how you receive security alerts.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="email-alerts" checked={emailAlerts} onCheckedChange={(checked) => setEmailAlerts(Boolean(checked))} />
                                    <Label htmlFor="email-alerts">Email alerts for critical events</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="slack-alerts" checked={slackAlerts} onCheckedChange={(checked) => setSlackAlerts(Boolean(checked))} />
                                    <Label htmlFor="slack-alerts">Slack notifications for high-severity events</Label>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label htmlFor="webhook-url">Webhook URL</Label>
                                    <Input id="webhook-url" placeholder="https://your.webhook/endpoint" value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} />
                                    <p className="text-sm text-muted-foreground">Send all events to a custom webhook.</p>
                                </div>
                            </CardContent>
                             <CardFooter>
                                <Button type="submit">Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </form>

                    <Card>
                        <CardHeader>
                            <CardTitle>API Management</CardTitle>
                            <CardDescription>
                                Manage API keys for programmatic access.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {apiKeys.map((apiKey) => (
                                <div key={apiKey.key} className="flex items-center justify-between p-4 rounded-md bg-secondary">
                                    <div className="font-mono text-sm">{apiKey.display}</div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">Revoke</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently revoke the API key.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => revokeApiKey(apiKey.key)}>
                                                Continue
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                             ))}
                            <Button onClick={generateApiKey}>Generate New API Key</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
