const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        unique: true,
        required: true 
    },
    products: [
        {   
            type: Schema.Types.ObjectId, 
            ref: 'Product'
        }
    ]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart

