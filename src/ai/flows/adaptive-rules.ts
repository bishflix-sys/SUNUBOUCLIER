'use server';

/**
 * @fileOverview Ce fichier implémente le flux de suggestions de règles adaptatives pour SunuBouclier.
 *
 * - suggestAdaptiveRules - Une fonction qui génère des suggestions de règles adaptatives basées sur l'apprentissage automatique de l'IA.
 * - SuggestAdaptiveRulesInput - Le type d'entrée pour la fonction suggestAdaptiveRules.
 * - SuggestAdaptiveRulesOutput - Le type de retour pour la fonction suggestAdaptiveRules.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAdaptiveRulesInputSchema = z.object({
  threatDescription: z
    .string()
    .describe('Description de la menace nouvellement identifiée.'),
  recentLogs: z
    .string()
    .describe('Journaux de sécurité récents liés à la menace identifiée.'),
});
export type SuggestAdaptiveRulesInput = z.infer<typeof SuggestAdaptiveRulesInputSchema>;

const SuggestAdaptiveRulesOutputSchema = z.object({
  ruleSuggestions: z
    .array(z.string())
    .describe("Un tableau de règles de sécurité adaptatives suggérées pour atténuer la menace."),
  explanation: z
    .string()
    .describe("Explication des raisons pour lesquelles ces règles sont suggérées et comment elles répondent à la menace."),
});
export type SuggestAdaptiveRulesOutput = z.infer<typeof SuggestAdaptiveRulesOutputSchema>;

export async function suggestAdaptiveRules(input: SuggestAdaptiveRulesInput): Promise<SuggestAdaptiveRulesOutput> {
  return suggestAdaptiveRulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAdaptiveRulesPrompt',
  input: {schema: SuggestAdaptiveRulesInputSchema},
  output: {schema: SuggestAdaptiveRulesOutputSchema},
  prompt: `Vous êtes un analyste de sécurité alimenté par l'IA pour SunuBouclier. En vous basant sur la menace identifiée et les journaux de sécurité récents, suggérez des règles de sécurité adaptatives pour atténuer la menace.

Description de la Menace: {{{threatDescription}}}
Journaux Récents: {{{recentLogs}}}

Suggérez des règles de sécurité spécifiques et exploitables, et expliquez pourquoi chaque règle est suggérée et comment elle répond à la menace. Retournez les règles sous forme de tableau de chaînes de caractères.
`,
});

const suggestAdaptiveRulesFlow = ai.defineFlow(
  {
    name: 'suggestAdaptiveRulesFlow',
    inputSchema: SuggestAdaptiveRulesInputSchema,
    outputSchema: SuggestAdaptiveRulesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
