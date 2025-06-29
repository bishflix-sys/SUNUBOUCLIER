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
import { rules } from "@/lib/data"
import { Loader2, Wand2 } from "lucide-react"

const recentLogsExample = `
[2023-10-27 10:20:01] Suspicious POST request to /api/v1/users/profile containing payload: {"$ne": "user"}.
[2023-10-27 10:20:02] Unauthorized attempt to access user data from IP 54.12.34.56.
[2023-10-27 10:20:03] Multiple failed queries with NoSQL syntax detected from the same IP.
`;

export function RulesClient() {
    const [threatDescription, setThreatDescription] = useState("A new NoSQL injection vulnerability was discovered in the user profile update endpoint. Attackers can manipulate queries to extract sensitive user data.")
    const [aiSuggestions, setAiSuggestions] = useState<SuggestAdaptiveRulesOutput | null>(null)
    const [loadingSuggestions, setLoadingSuggestions] = useState(false)

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
            // Here you would use a toast to show the error
        } finally {
            setLoadingSuggestions(false)
        }
    }


  return (
    <Tabs defaultValue="active" className="space-y-4">
      <TabsList>
        <TabsTrigger value="active">Active Rules</TabsTrigger>
        <TabsTrigger value="custom">Custom Rules (Lua)</TabsTrigger>
        <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Card>
          <CardHeader>
            <CardTitle>Active Security Rules</CardTitle>
            <CardDescription>
              Manage and toggle predefined security rules.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Status</TableHead>
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
                      <Switch defaultChecked={rule.enabled} />
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
            <CardTitle>Custom Rule Scripting</CardTitle>
            <CardDescription>
              Add or edit custom rules using Lua for advanced threat mitigation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
                <Label htmlFor="lua-script" className="font-medium">Lua Script</Label>
                <Textarea id="lua-script" placeholder="-- Your Lua script here" rows={15} className="font-code text-sm" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Script</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="ai">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Rule Suggestions</CardTitle>
            <CardDescription>
              Describe a threat and let our AI generate adaptive rule suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid gap-2">
                <Label htmlFor="threat-description">Threat Description</Label>
                <Textarea 
                    id="threat-description" 
                    value={threatDescription}
                    onChange={(e) => setThreatDescription(e.target.value)}
                    placeholder="Describe the new threat or vulnerability..." 
                    rows={4}
                />
            </div>
            <Button onClick={handleGenerateRules} disabled={loadingSuggestions}>
                {loadingSuggestions ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Rules
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
                    <h3 className="font-semibold text-lg">Suggested Rules</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm font-code bg-secondary p-4 rounded-md">
                        {aiSuggestions.ruleSuggestions.map((rule, index) => (
                            <li key={index}><code>{rule}</code></li>
                        ))}
                    </ul>
                    <h3 className="font-semibold text-lg">Explanation</h3>
                    <p className="text-sm text-muted-foreground">{aiSuggestions.explanation}</p>
                </div>
            )}

          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
