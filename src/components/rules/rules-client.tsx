"use client"

import { useState } from "react"
import { suggestAdaptiveRules } from "@/ai/flows/adaptive-rules"
import type { SuggestAdaptiveRulesOutput } from "@/ai/flows/adaptive-rules"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { rules as initialRules } from "@/lib/data"
import type { Rule } from "@/lib/types"
import { Loader2, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const recentLogsExample = `
[2023-10-27 10:20:01] Requête POST suspecte vers /api/v1/users/profile contenant la charge utile : {"$ne": "user"}.
[2023-10-27 10:20:02] Tentative non autorisée d'accès aux données utilisateur depuis l'IP 54.12.34.56.
[2023-10-27 10:20:03] Plusieurs requêtes échouées avec la syntaxe NoSQL détectées depuis la même IP.
`;

export function RulesClient() {
    const { toast } = useToast()
    const [rules, setRules] = useState<Rule[]>(initialRules)
    const [luaScript, setLuaScript] = useState("-- Votre script Lua personnalisé ici\nfunction handle_request(req)\n  -- Exemple : bloquer les requêtes d'une IP spécifique\n  if req.ip == '123.123.123.123' then\n    return 'block'\n  end\n  return 'pass'\nend")
    const [threatDescription, setThreatDescription] = useState("Une nouvelle vulnérabilité d'injection NoSQL a été découverte dans le point de terminaison de mise à jour du profil utilisateur. Les attaquants peuvent manipuler les requêtes pour extraire des données utilisateur sensibles.")
    const [aiSuggestions, setAiSuggestions] = useState<SuggestAdaptiveRulesOutput | null>(null)
    const [loadingSuggestions, setLoadingSuggestions] = useState(false)

    const handleRuleToggle = (ruleId: string, enabled: boolean) => {
        setRules(currentRules =>
            currentRules.map(rule =>
                rule.id === ruleId ? { ...rule, enabled } : rule
            )
        )
        toast({
            title: `Règle ${enabled ? 'Activée' : 'Désactivée'}`,
            description: `La règle ${ruleId} a été mise à jour.`,
        })
    }
    
    const handleSaveLuaScript = () => {
        console.log("Saving Lua Script:", luaScript)
        toast({
            title: "Script Enregistré",
            description: "Votre script Lua personnalisé a été enregistré avec succès.",
        })
    }

    const handleGenerateRules = async () => {
        setLoadingSuggestions(true)
        setAiSuggestions(null)
        try {
            const result = await suggestAdaptiveRules({
                threatDescription,
                recentLogs: recentLogsExample
            })
            setAiSuggestions(result)
        } catch (error) {
            console.error("Failed to generate AI rules:", error)
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Échec de la génération de suggestions de règles par l'IA.",
            })
        } finally {
            setLoadingSuggestions(false)
        }
    }


  return (
    <Tabs defaultValue="active" className="space-y-4">
      <TabsList>
        <TabsTrigger value="active">Règles Actives</TabsTrigger>
        <TabsTrigger value="custom">Règles Personnalisées (Lua)</TabsTrigger>
        <TabsTrigger value="ai">Suggestions IA</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Card>
          <CardHeader>
            <CardTitle>Règles de Sécurité Actives</CardTitle>
            <CardDescription>
              Gérez et activez les règles de sécurité prédéfinies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom de la Règle</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map(rule => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm text-muted-foreground">{rule.description}</div>
                    </TableCell>
                    <TableCell>{rule.type}</TableCell>
                    <TableCell className="text-right">
                      <Switch 
                        checked={rule.enabled} 
                        onCheckedChange={(checked) => handleRuleToggle(rule.id, checked)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="custom">
        <Card>
          <CardHeader>
            <CardTitle>Script de Règle Personnalisée</CardTitle>
            <CardDescription>
              Ajoutez ou modifiez des règles personnalisées en utilisant Lua pour une atténuation avancée des menaces.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
                <Label htmlFor="lua-script" className="font-medium">Script Lua</Label>
                <Textarea 
                    id="lua-script"
                    value={luaScript}
                    onChange={(e) => setLuaScript(e.target.value)}
                    rows={15} 
                    className="font-code text-sm" 
                />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveLuaScript}>Enregistrer le Script</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="ai">
        <Card>
          <CardHeader>
            <CardTitle>Suggestions de Règles par l'IA</CardTitle>
            <CardDescription>
              Décrivez une menace et laissez notre IA générer des suggestions de règles adaptatives.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid gap-2">
                <Label htmlFor="threat-description">Description de la Menace</Label>
                <Textarea 
                    id="threat-description" 
                    value={threatDescription}
                    onChange={(e) => setThreatDescription(e.target.value)}
                    placeholder="Décrivez la nouvelle menace ou vulnérabilité..." 
                    rows={4}
                />
            </div>
            <Button onClick={handleGenerateRules} disabled={loadingSuggestions}>
                {loadingSuggestions ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Générer les Règles
            </Button>

            {loadingSuggestions && (
                <div className="space-y-4 pt-4">
                    <div className="h-6 w-1/4 rounded-md bg-muted animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-full rounded-md bg-muted animate-pulse"></div>
                        <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse"></div>
                    </div>
                </div>
            )}
            
            {aiSuggestions && (
                <div className="space-y-4 pt-4">
                    <h3 className="font-semibold text-lg">Règles Suggérées</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm font-code bg-secondary p-4 rounded-md">
                        {aiSuggestions.ruleSuggestions.map((rule, index) => (
                            <li key={index}><code>{rule}</code></li>
                        ))}
                    </ul>
                    <h3 className="font-semibold text-lg">Explication</h3>
                    <p className="text-sm text-muted-foreground">{aiSuggestions.explanation}</p>
                </div>
            )}

          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
