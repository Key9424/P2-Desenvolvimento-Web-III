//Criação da conexão com o banco de dados MongoDB usando Mongoose

require('dotenv').config();  // tem que criar o arquivo .env

// usuario de teste :
// 

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Tenta conectar ao MongoDB usando a URI do arquivo .env
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o MongoDB:', error.message);
        // Se a conexão falhar, encerra o processo da aplicação.
        // Isso é importante porque a API não pode funcionar sem o banco.
        process.exit(1);
    }
};

module.exports = connectDB;