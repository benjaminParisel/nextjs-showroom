import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().describe('User').default('walter.bates'),
  password: z
    .string({ required_error: 'Password is required.' })
    .describe('Password')
    .default('bpm'),
});

export type Process = {
  displayDescription: string;
  deploymentDate: string;
  displayName: string;
  name: string;
  description: string;
  deployedBy: string;
  id: string;
  activationState: string;
  version: string;
  configurationState: string;
  last_update_date: string;
  actorinitiatorid: string;
};

export const ProcessSchema = z.array(
  z.object({
    displayDescription: z.string(),
    deploymentDate: z.string(),
    displayName: z.string(),
    name: z.string(),
    description: z.string(),
    deployedBy: z.string(),
    id: z.string(),
    activationState: z.string(),
    version: z.string(),
    configurationState: z.string(),
    last_update_date: z.string(),
    actorinitiatorid: z.string(),
  })
);
