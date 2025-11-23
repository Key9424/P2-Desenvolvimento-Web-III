# Ragnarok Build - Projeto P2

Projeto de exemplo para criar, listar, editar e deletar builds (Ragnarok) — contém um backend (API REST) em Node/Express + MongoDB e um frontend em React.

## Visão geral

Este repositório contém duas pastas principais:

- `ragnarok-build-api/` — API REST em Node.js com Express e MongoDB (Mongoose).
- `ragnarok-build-frontend/` — Aplicação frontend em React (Create React App) consumindo a API.

O frontend usa o endpoint `http://localhost:3000/api/builds` por padrão (veja `src/App.jsx`).

## Estrutura do repositório

```
ragnarok-build-api/
  ├─ src/
  │  ├─ server.js
  │  ├─ configuracao/DB.js
  │  ├─ controladores/buildControlador.js
  │  ├─ modelos/Build.js
  │  └─ rotas/buildRotas.js
  └─ package.json

ragnarok-build-frontend/
  ├─ public/
  ├─ src/
  │  ├─ App.jsx
  │  └─ components/BuildForm.jsx
  └─ package.json
```

## Tecnologias

- Backend: Node.js, Express, Mongoose (MongoDB), dotenv, cors
- Frontend: React (Create React App), Axios

## Pré-requisitos

- Node.js (versão 14+ recomendada)
- npm
- MongoDB rodando localmente ou em um serviço externo (URI disponível via variável de ambiente)

## Configuração e execução

As instruções abaixo assumem que você está na raiz do repositório (`P2-Desenvolvimento-Web-III`).

### 1) Backend (API)

1. Abra um terminal e vá para a pasta do backend:

```powershell
cd "ragnarok-build-api"
```

2. Instale dependências e rode o servidor:

```powershell
npm install
npm run dev    # ou `npm start` para rodar sem nodemon
```

3. Variáveis de ambiente

Crie um arquivo `.env` em `ragnarok-build-api/` com pelo menos:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ragnarok_builds
```

O servidor expõe a API em `http://localhost:3000` por padrão.

### 2) Frontend (React)

1. Abra outro terminal e vá para a pasta do frontend:

```powershell
cd "ragnarok-build-frontend"
```

2. Instale dependências e rode a aplicação:

```powershell
npm install
npm start
```

> Observação: o `package.json` do frontend já define `PORT=3001` no script de start para evitar conflito com a API que usa a porta 3000.

3. O frontend espera a API em `http://localhost:3000/api/builds` (configurado em `src/App.jsx`). Se você alterar a URL da API, atualize `src/api/axiosConfig.js` ou `src/App.jsx` conforme necessário.

## Endpoints principais (API)

Assumindo base `http://localhost:3000/api/builds`:

- GET `/` — lista todas as builds
- POST `/` — cria uma nova build (JSON body com os campos)
- PATCH `/:id` — atualiza a build com o id
- DELETE `/:id` — deleta a build com o id

Exemplo de payload (POST/PATCH):

```json
{
  "name": "Minha Build",
  "description": "Descrição opcional",
  "job": "Swordsman",
  "level": 99,
  "jobLevel": 70,
  "stats": { "str": 100, "agi": 10, "vit": 50, "int": 1, "dex": 30, "luk": 1 },
  "talent": { "pow": 20, "sta": 10, "wis": 5, "spi": 0, "con": 0, "crt": 0 }
}
```

## Troubleshooting

- Erro de conexão ao carregar builds: verifique se o backend está rodando em `localhost:3000` e se o banco MongoDB está acessível.
- Porta em uso: o frontend foi configurado para rodar na porta 3001; ajuste se necessário.

## Tests

Não há testes automatizados incluídos neste projeto por padrão. Você pode adicionar testes no backend (e.g., Jest) ou no frontend (React Testing Library).

## Próximos passos sugeridos para updates futuros

- Adicionar autenticação (JWT) para endpoints privados.
- Validar schema das builds com uma biblioteca (Joi / celebrate) no backend.
- Refatorar o formulário para usar React Hook Form ou Formik (melhora validação e UX).
- Adicionar testes unitários e de integração.

## Contribuição

Pull requests são bem-vindos. Abra uma issue antes de mudanças grandes.

## Licença

Licença: MIT
