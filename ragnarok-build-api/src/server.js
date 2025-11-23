require('dotenv').config(); // carregar a varialvel do .env
const express = require('express');
const cors = require('cors'); // Importando o pacote cors
const BDconexao = require('./configuracao/DB.js');

// conectando no mongo utilizando o /configuracao/DB.js
BDconexao();

// importando os arquivos de rotas /rotas/buildRotas.js
const buildRoutes = require('./rotas/buildRotas.js');

const app = express();


app.use(cors()); // Habilite o CORS para todas as rotas 
app.use(express.json());


// Rotas da API
app.use('/api/builds', buildRoutes);

// portas do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
