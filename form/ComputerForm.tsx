'use client';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { z } from 'zod';
enum Sports {
  Football = 'Football/Soccer',
  Basketball = 'Basketball',
  Baseball = 'Baseball',
  Hockey = 'Hockey (Ice)',
  None = "I don't like sports",
}

const formSchema = z.object({
  username: z.string().describe('User'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .describe('Your secure password'),
  favoriteNumber: z.coerce
    .number({ invalid_type_error: 'Please enter a number.' })
    .min(1, { message: 'Please enter a number greater than 0.' })
    .max(10, { message: 'Please enter a number less than 100.' })
    .describe('Your favorite number')
    .optional(),
  acceptTerms: z
    .boolean()
    .describe('Accept terms and conditions.')
    .refine((value) => value, {
      message: 'You must accept the terms and conditions.',
      path: ['acceptTerms'],
    }),
  sendMeMails: z.boolean().optional(),
  birthday: z.coerce.date().optional(),
  color: z.enum(['red', 'green', 'blue']).optional(),
  // Another enum example
  marshmallows: z
    .enum(['not many', 'a few', 'a lot', 'too many'])
    .describe('How many marshmallows fit in your mouth?'),
  // Native enum example
  sports: z.nativeEnum(Sports).describe('What is your favourite sport?'),
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    })
    .optional(),
});

export const ComputerFrom = () => {
  return (
    <AutoForm formSchema={formSchema} onSubmit={console.log}>
      <AutoFormSubmit />
    </AutoForm>
  );
};
