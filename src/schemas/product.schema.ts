import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  description: z
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .trim()
    .optional(),
  price: z
    .number({ message: 'Preço deve ser um número válido' })
    .min(0.01, 'Preço deve ser maior que zero')
    .max(999999.99, 'Preço deve ser menor que 1 milhão'),
  quantity: z
    .number({ message: 'Quantidade deve ser um número válido' })
    .int('Quantidade deve ser um número inteiro')
    .min(0, 'Quantidade não pode ser negativa')
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;

export const editProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  description: z
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .trim()
    .optional(),
  price: z
    .number({ message: 'Preço deve ser um número válido' })
    .min(0.01, 'Preço deve ser maior que zero')
    .max(999999.99, 'Preço deve ser menor que 1 milhão'),
  quantity: z
    .number({ message: 'Quantidade deve ser um número válido' })
    .int('Quantidade deve ser um número inteiro')
    .min(0, 'Quantidade não pode ser negativa')
});

export type EditProductFormData = z.infer<typeof editProductSchema>;