'use server';

/**
 * @fileOverview This file implements the adaptive rule suggestions flow for Sentinel Shield.
 *
 * - suggestAdaptiveRules - A function that generates adaptive rule suggestions based on AI auto-learning.
 * - SuggestAdaptiveRulesInput - The input type for the suggestAdaptiveRules function.
 * - SuggestAdaptiveRulesOutput - The return type for the suggestAdaptiveRules function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAdaptiveRulesInputSchema = z.object({
  threatDescription: z
    .string()
    .describe('Description of the newly identified threat.'),
  recentLogs: z
    .string()
    .describe('Recent security logs related to the identified threat.'),
});
export type SuggestAdaptiveRulesInput = z.infer<typeof SuggestAdaptiveRulesInputSchema>;

const SuggestAdaptiveRulesOutputSchema = z.object({
  ruleSuggestions: z
    .array(z.string())
    .describe('An array of suggested adaptive security rules to mitigate the threat.'),
  explanation: z
    .string()
    .describe('Explanation of why these rules are suggested and how they address the threat.'),
});
export type SuggestAdaptiveRulesOutput = z.infer<typeof SuggestAdaptiveRulesOutputSchema>;

export async function suggestAdaptiveRules(input: SuggestAdaptiveRulesInput): Promise<SuggestAdaptiveRulesOutput> {
  return suggestAdaptiveRulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAdaptiveRulesPrompt',
  input: {schema: SuggestAdaptiveRulesInputSchema},
  output: {schema: SuggestAdaptiveRulesOutputSchema},
  prompt: `You are an AI-powered security analyst for Sentinel Shield. Based on the identified threat and recent security logs, suggest adaptive security rules to mitigate the threat.

Threat Description: {{{threatDescription}}}
Recent Logs: {{{recentLogs}}}

Suggest specific and actionable security rules, and explain why each rule is suggested and how it addresses the threat. Return the rules as an array of strings.
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
