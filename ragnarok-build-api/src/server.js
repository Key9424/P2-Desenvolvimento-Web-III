require('dotenv').config(); // carregar a varialvel do .env
const express = require('express');
const cors = require('cors'); // 1. Importe o pacote cors
const BDconexao = require('./configuracao/DB.js');

// conectando no mongo
BDconexao();

// importando os arquivos de rotas
const buildRoutes = require('./rotas/buildRotas.js');

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // 2. Habilite o CORS para todas as rotas (Deve estar ANTES das rotas)
app.use(express.json());

// --- ROTAS DA APLICAÇÃO ---
// Rotas da API
app.use('/api/builds', buildRoutes);

// portas do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
