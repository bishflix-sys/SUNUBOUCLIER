import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <div className="space-y-6">
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
                <Input id="admin-email" type="email" defaultValue="admin@sunubouclier.sn" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="instance-name">Instance Name</Label>
                <Input id="instance-name" defaultValue="SunuBouclier - Production" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive security alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="email-alerts" defaultChecked />
                    <Label htmlFor="email-alerts">Email alerts for critical events</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="slack-alerts" />
                    <Label htmlFor="slack-alerts">Slack notifications for high-severity events</Label>
                </div>
                 <Separator />
                 <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input id="webhook-url" placeholder="https://your.webhook/endpoint" />
                    <p className="text-sm text-muted-foreground">Send all events to a custom webhook.</p>
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>API Management</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-md bg-secondary">
                    <div className="font-mono text-sm">prod_sk_******************1234</div>
                    <Button variant="destructive" size="sm">Revoke</Button>
                </div>
                 <Button>Generate New API Key</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
