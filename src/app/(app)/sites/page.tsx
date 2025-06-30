"use client"

import * as React from "react"
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { sites as initialSites } from "@/lib/data";
import type { Site } from "@/lib/types";
import { CheckCircle, PlusCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SitesPage() {
    const { toast } = useToast();
    const [sites, setSites] = React.useState<Site[]>(initialSites);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    
    // State for the new site form
    const [newSiteName, setNewSiteName] = React.useState("");
    const [newSiteUrl, setNewSiteUrl] = React.useState("");
    const [newSiteSsl, setNewSiteSsl] = React.useState(true);

    const handleAddSite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSiteName || !newSiteUrl) {
            toast({
                variant: "destructive",
                title: "Erreur de Validation",
                description: "Le nom du site et l'URL en amont sont requis.",
            });
            return;
        }

        const newSite: Site = {
            id: `SITE-00${sites.length + 1}`,
            name: newSiteName,
            url: newSiteUrl,
            ssl: newSiteSsl,
            status: "Online", // Default to online for new sites
        };

        setSites(currentSites => [...currentSites, newSite]);
        toast({
            title: "Site Ajouté",
            description: `${newSite.name} a été ajouté avec succès.`,
        });

        // Reset form and close dialog
        setNewSiteName("");
        setNewSiteUrl("");
        setNewSiteSsl(true);
        setDialogOpen(false);
    };
    
    const handleConfigure = (siteName: string) => {
        toast({
            title: "Bientôt disponible !",
            description: `Les options de configuration pour ${siteName} ne sont pas encore implémentées.`,
        })
    }

  return (
    <>
      <Header title="Sites" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Gérer les Sites</CardTitle>
              <CardDescription>
                Ajoutez, supprimez et configurez vos sites web et applications protégés.
              </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un Site
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddSite}>
                    <DialogHeader>
                    <DialogTitle>Ajouter un Nouveau Site</DialogTitle>
                    <DialogDescription>
                        Entrez les détails du nouveau site à protéger.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Nom du Site
                        </Label>
                        <Input 
                            id="name" 
                            placeholder="ex: Mon Application Géniale" 
                            className="col-span-3"
                            value={newSiteName}
                            onChange={(e) => setNewSiteName(e.target.value)} 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                        URL en Amont
                        </Label>
                        <Input 
                            id="url" 
                            placeholder="http://localhost:3001" 
                            className="col-span-3" 
                            value={newSiteUrl}
                            onChange={(e) => setNewSiteUrl(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ssl" className="text-right">
                        SSL Automatique
                        </Label>
                        <Switch 
                            id="ssl" 
                            checked={newSiteSsl}
                            onCheckedChange={setNewSiteSsl}
                        />
                    </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Ajouter le Site</Button>
                    </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>SSL</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites.map((site) => (
                  <TableRow key={site.id}>
                    <TableCell>
                      <div className="font-medium">{site.name}</div>
                      <div className="text-sm text-muted-foreground">{site.url}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={site.status === "Online" ? "default" : "secondary"} className={site.status === "Online" ? "bg-green-500/20 text-green-700 border-green-500/30" : ""}>
                        {site.status === 'Online' ? 'En ligne' : 'Hors ligne'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        {site.ssl ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-destructive" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleConfigure(site.name)}>Configurer</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
