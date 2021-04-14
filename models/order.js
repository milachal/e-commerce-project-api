const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [
        {   
            type: Schema.Types.ObjectId, 
            ref: 'Product'
        }
    ],
    status: {
        type: String,
        default: 'In procces'
    },
    total: {
        type: Number
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
module.exports = Order