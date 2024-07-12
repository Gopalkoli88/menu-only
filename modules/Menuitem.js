const mongoose = require('mongoose')
const monuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Starter', 'main course', 'dessert'],
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }


})
const menuitem = mongoose.model('menuitem', monuItemSchema)
module.exports = menuitem;