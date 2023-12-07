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

export type Session = {
  copyright: string;
  is_guest_user: string;
  branding_version: string;
  branding_version_with_date: string;
  user_id: string;
  user_name: string;
  session_id: string;
  conf: string;
  is_technical_user: string;
  version: string;
};

export const SessionSchema = z.array(
  z.object({
    copyright: z.string(),
    is_guest_user: z.string(),
    branding_version: z.string(),
    branding_version_with_date: z.string(),
    user_id: z.string(),
    user_name: z.string(),
    session_id: z.string(),
    conf: z.string(),
    is_technical_user: z.string(),
    version: z.string(),
  })
);
