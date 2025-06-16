# 🚀 Deploy do Vectal.AI

## Deploy Automático na Vercel

Clique no botão abaixo para fazer o deploy automático na Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffellipesaraiva88%2Fvecatl.ai.2&env=DATABASE_URL&envDescription=URL%20do%20banco%20de%20dados%20SQLite&envLink=https%3A%2F%2Fgithub.com%2Ffellipesaraiva88%2Fvecatl.ai.2%2Fblob%2Fmain%2F.env.example)

## Configuração Manual

Se preferir fazer o deploy manual:

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login com sua conta GitHub**
3. **Clique em "New Project"**
4. **Importe o repositório:** `fellipesaraiva88/vecatl.ai.2`
5. **Configure as variáveis de ambiente:**
   - `DATABASE_URL`: `file:./dev.db`
6. **Clique em "Deploy"**

## Variáveis de Ambiente Necessárias

```env
# Obrigatória
DATABASE_URL="file:./dev.db"

# Opcionais (para funcionalidades avançadas)
OPENAI_API_KEY="your_openai_api_key_here"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key_here"
CLERK_SECRET_KEY="your_clerk_secret_key_here"
```

## Após o Deploy

1. A aplicação estará disponível em uma URL como: `https://vectal-ai-2-xxx.vercel.app`
2. Todas as funcionalidades estarão em português brasileiro
3. A interface moderna estará ativa
4. O banco de dados SQLite será criado automaticamente

## Funcionalidades Disponíveis

- ✅ Interface completamente em português brasileiro
- ✅ Design moderno com glassmorphism
- ✅ Sidebar redesenhada
- ✅ Sistema de ideias, projetos, tarefas e anotações
- ✅ Chat assistant (requer OpenAI API Key)
- ✅ Responsivo para mobile e desktop

## Suporte

Se encontrar algum problema durante o deploy, verifique:

1. Se todas as variáveis de ambiente estão configuradas
2. Se o repositório está público no GitHub
3. Se o build está passando (sem erros de TypeScript/ESLint)

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e Vercel**
