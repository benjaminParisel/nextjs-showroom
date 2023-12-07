'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { loginToBonita } from '@/lib/bonita';

const loginSchema = z.object({
  username: z.string().describe('User').default('walter.bates'),
  password: z
    .string({ required_error: 'Password is required.' })
    .describe('Password')
    .default('bpm'),
});

export const LoginForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  function login(data: any) {
    loginToBonita(data.username, data.password).then((token) => {
      console.log('loginToBonita', token);
      // router.push('/process');
    });
  }

  return (
    <div>
      <AutoForm formSchema={loginSchema} onSubmit={login}>
        <AutoFormSubmit />
      </AutoForm>
    </div>
  );
};
