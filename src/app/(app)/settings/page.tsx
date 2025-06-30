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
        toast({ title: "Paramètres Enregistrés", description: "Les paramètres généraux ont été mis à jour." });
    };

    const handleSaveNotifications = (e: React.FormEvent) => {
        e.preventDefault();
        toast({ title: "Paramètres Enregistrés", description: "Les paramètres de notification ont été mis à jour." });
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
        toast({ title: "Clé d'API Générée", description: "Une nouvelle clé d'API a été créée. Assurez-vous de la copier maintenant.", duration: 10000 });
    };

    const revokeApiKey = (keyToRevoke: string) => {
        setApiKeys(keys => keys.filter(k => k.key !== keyToRevoke));
        toast({ title: "Clé d'API Révoquée", description: "La clé d'API sélectionnée a été révoquée." });
    };

    return (
        <>
            <Header title="Paramètres" />
            <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
                <div className="space-y-6">
                    <form onSubmit={handleSaveGeneral}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Paramètres Généraux</CardTitle>
                                <CardDescription>
                                    Gérez les paramètres généraux de l'application.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="admin-email">Email de l'Admin</Label>
                                    <Input id="admin-email" type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instance-name">Nom de l'Instance</Label>
                                    <Input id="instance-name" value={instanceName} onChange={e => setInstanceName(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Enregistrer les Modifications</Button>
                            </CardFooter>
                        </Card>
                    </form>
                    
                    <form onSubmit={handleSaveNotifications}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>
                                    Configurez la manière dont vous recevez les alertes de sécurité.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="email-alerts" checked={emailAlerts} onCheckedChange={(checked) => setEmailAlerts(Boolean(checked))} />
                                    <Label htmlFor="email-alerts">Alertes email pour les événements critiques</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="slack-alerts" checked={slackAlerts} onCheckedChange={(checked) => setSlackAlerts(Boolean(checked))} />
                                    <Label htmlFor="slack-alerts">Notifications Slack pour les événements de haute gravité</Label>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label htmlFor="webhook-url">URL du Webhook</Label>
                                    <Input id="webhook-url" placeholder="https://votre.webhook/endpoint" value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} />
                                    <p className="text-sm text-muted-foreground">Envoyez tous les événements à un webhook personnalisé.</p>
                                </div>
                            </CardContent>
                             <CardFooter>
                                <Button type="submit">Enregistrer les Modifications</Button>
                            </CardFooter>
                        </Card>
                    </form>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des APIs</CardTitle>
                            <CardDescription>
                                Gérez les clés d'API pour un accès programmatique.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {apiKeys.map((apiKey) => (
                                <div key={apiKey.key} className="flex items-center justify-between p-4 rounded-md bg-secondary">
                                    <div className="font-mono text-sm">{apiKey.display}</div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">Révoquer</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Cette action est irréversible. Cela révoquera définitivement la clé d'API.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => revokeApiKey(apiKey.key)}>
                                                Continuer
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                             ))}
                            <Button onClick={generateApiKey}>Générer une nouvelle clé d'API</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
