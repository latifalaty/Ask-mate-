const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let querySchema = new Schema({
    titre: {
        type: String
    },
    contenu: {
        type: String,
    },
    categorie: {
        type: String,
    },
    userId:{ type:String}, // New field to store the user ID
    reponses: [{ type: Schema.Types.ObjectId, ref: 'Response' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', querySchema);
