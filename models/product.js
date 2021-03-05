const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        enum: ["women's", "men's", "unisex"],
        default: "unisex"
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
       type: String
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product