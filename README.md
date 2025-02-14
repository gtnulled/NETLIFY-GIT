# Cadastro Nacional de Presbíteros do Brasil

Sistema de cadastro e verificação de presbíteros da Igreja Católica Apostólica Romana no Brasil.

## Funcionalidades

- Cadastro de presbíteros com upload de foto e documentos
- Painel administrativo para gestão de cadastros
- Sistema de aprovação de cadastros
- Busca de presbíteros por nome ou paróquia
- Visualização de perfil público
- Autenticação de administradores
- Responsivo para todos os dispositivos

## Tecnologias Utilizadas

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Banco de dados e Autenticação)
- shadcn/ui (Componentes)
- Lucide Icons
- Framer Motion

## Dependências Principais

```json
{
  "dependencies": {
    "@supabase/supabase-js": "latest",
    "next": "14.2.16",
    "react": "^18",
    "react-dom": "^18",
    "tailwindcss": "^3.4.17",
    "typescript": "^5",
    "framer-motion": "latest"
  }
}
```

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Banco de Dados

### Tabela: presbiteros
- id (uuid, primary key)
- nome_completo (text)
- grau_ordem (text)
- diocese (text)
- data_ordenacao (date)
- bispo_ordenante (text)
- ocupacao_canonica (text)
- nome_paroquia (text)
- foto_perfil (text)
- documento_ordenacao (text)
- facebook (text)
- instagram (text)
- website (text)
- email (text)
- outras_informacoes (text)
- aprovado (boolean)

### Tabela: profiles
- id (uuid, primary key)
- username (text)
- role (text)

## Deploy

O projeto está configurado para deploy no Netlify. Para fazer o deploy:

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente no Netlify
3. O deploy será automático a cada push na branch principal

## Licença

MIT
