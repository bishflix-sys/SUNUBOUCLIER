'use server';

/**
 * @fileOverview Fournit un rapport résumé des menaces zero-day détectées, généré par le moteur d'IA.
 *
 * - zeroDayThreatSummary - Une fonction qui retourne le rapport résumé des menaces zero-day.
 * - ZeroDayThreatSummaryInput - Le type d'entrée pour la fonction zeroDayThreatSummary.
 * - ZeroDayThreatSummaryOutput - Le type de retour pour la fonction zeroDayThreatSummary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ZeroDayThreatSummaryInputSchema = z.object({
  timePeriod: z
    .string()
    .default('dernières 24 heures')
    .describe('La période pour laquelle résumer les menaces zero-day.'),
  logData: z.string().describe('Données de journal contenant des informations sur les menaces zero-day potentielles.'),
});
export type ZeroDayThreatSummaryInput = z.infer<typeof ZeroDayThreatSummaryInputSchema>;

const ZeroDayThreatSummaryOutputSchema = z.object({
  summary: z.string().describe('Un résumé des menaces zero-day détectées.'),
});
export type ZeroDayThreatSummaryOutput = z.infer<typeof ZeroDayThreatSummaryOutputSchema>;

export async function zeroDayThreatSummary(input: ZeroDayThreatSummaryInput): Promise<ZeroDayThreatSummaryOutput> {
  return zeroDayThreatSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'zeroDayThreatSummaryPrompt',
  input: {schema: ZeroDayThreatSummaryInputSchema},
  output: {schema: ZeroDayThreatSummaryOutputSchema},
  prompt: `Vous êtes un expert en sécurité analysant les journaux système à la recherche de menaces zero-day.
  En vous basant sur les données de journal suivantes des {{{timePeriod}}}, fournissez un résumé concis de toutes les menaces zero-day détectées, y compris leur nature et leur gravité. S'il n'y a pas de menaces zero-day évidentes dans les données de journal, indiquez qu'aucune menace n'a été détectée.

  Données de Journal:
  {{logData}}`,
});

const zeroDayThreatSummaryFlow = ai.defineFlow(
  {
    name: 'zeroDayThreatSummaryFlow',
    inputSchema: ZeroDayThreatSummaryInputSchema,
    outputSchema: ZeroDayThreatSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
