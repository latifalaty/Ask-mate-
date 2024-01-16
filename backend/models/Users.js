const mongoose = require("mongoose");


const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const userSchema = mongoose.Schema({
 
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        pwd: {
            type: String,
        },
        // expertise: [{ type: String }], 
    }, 
    {
        timestamps: true,
    })



// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator,{ message: 'Email already in use.' });
const user = mongoose.model("User", userSchema);

module.exports = user;

