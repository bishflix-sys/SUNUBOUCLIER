import { Header } from "@/components/layout/header";
import { RulesClient } from "@/components/rules/rules-client";

export default function RulesPage() {
  return (
    <>
      <Header title="Règles de Sécurité" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <RulesClient />
      </main>
    </>
  );
}
