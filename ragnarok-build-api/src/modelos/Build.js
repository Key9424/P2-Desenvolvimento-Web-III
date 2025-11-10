//Schema do Mongoose para representar uma build de personagem no Ragnarok Online

const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    job: { type: String, required: true },
    level: { type: Number, default: 99 },
    jobLevel: { type: Number, default: 70 },

    // Atributos da build 
    stats: {
        str: { type: Number, default: 1 },
        agi: { type: Number, default: 1 },
        vit: { type: Number, default: 1 },
        int: { type: Number, default: 1 },
        dex: { type: Number, default: 1 },
        luk: { type: Number, default: 1 },
    },

    talent: {
        pow: { type: Number, default: 0 },
        sta: { type: Number, default: 0 },
        wis: { type: Number, default: 0 },
        spi: { type: Number, default: 0 },
        con: { type: Number, default: 0 },
        crt: { type: Number, default: 0 },
    },

    // Equipamentos da build //UPDATE futuro para o projeto 
    equipment: {
        weapon: { type: Number },
        shield: { type: Number },
        headTop: { type: Number },
        headMiddle: { type: Number },
        headLow: { type: Number },
        armor: { type: Number },
        robe: { type: Number },
        shoes: { type: Number },
        accessory1: { type: Number },
        accessory2: { type: Number },
    },

    // Criador da build (opcional)
    author: {
        createdBy: { type: String, default: 'anonymous' }
    }
}, { timestamps: true });

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;
