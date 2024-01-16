const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let responseSchema = new Schema({

    contenu: {
        type: String,
    },
   categorie:{
      type: String,
    },
    question: { type: Schema.Types.ObjectId, ref: 'Question' } // Clé étrangère pour associer la reponse à la question
},
{
    timestamps: true
})


module.exports = mongoose.model('Response', responseSchema)
