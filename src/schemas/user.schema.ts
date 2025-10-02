import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .trim(),
  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório')
    .trim()
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres'),
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword']
});

export type RegisterFormData = z.infer<typeof registerSchema>;



export const editProfileWithPasswordSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .trim(),
  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório')
    .trim(),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),
  confirmPassword: z
    .string()
    .optional()
    .or(z.literal(''))
}).refine((data) => {
  if (data.password && data.password.length > 0) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: 'Senhas não conferem',
  path: ['confirmPassword']
});

export type EditProfileWithPasswordFormData = z.infer<typeof editProfileWithPasswordSchema>;

