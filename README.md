# Frontend - Sistema de Produtos

Frontend da aplicação desenvolvido com Next.js, React e TypeScript.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI

## Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis (opcional)
Crie `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Rodar o projeto

**Desenvolvimento:**
```bash
npm run dev
```
Acesse: http://localhost:3000

**Produção:**
```bash
npm run build
npm run start
```

## Comandos disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa versão de produção

## Funcionalidades

- Login e registro de usuários
- Gerenciamento de produtos (CRUD)
- Painel administrativo
- Sistema de permissões (USER, MANAGER, ADMIN)
- Interface responsiva

> OBS
> MANAGER nao foi utilizado

## Fluxo de uso

1. Registre o primeiro usuário
2. Faça login
3. Navegue pelas funcionalidades na navbar
4. Teste criar/editar produtos (se tiver permissão)
5. Acesse painel admin (se for ADMIN)

## Se der erro

```bash
# Limpar e reinstalar
rm -rf node_modules
npm install
npm run dev
```

## OBS
Usuario admin ja cadastrado no banco
- email: fabio@email.com
- senha: Admin@123