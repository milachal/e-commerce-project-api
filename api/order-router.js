const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/authorization')
const Order = require('../models/order')
const Cart = require('../models/cart')
const addQuantityToCartProducts = require('../utils/addQuantityToCartProducts')

router.post('/order', auth, async (req, res) => {
    const userId = req.user._id
    const cart = await Cart.findOne({ user: userId })

    try {
        const newOrder = new Order({ user: userId, products: cart.products, total: req.body.total })
        await newOrder.save()
        cart.products = []
        cart.save()
        res.status(200).send(newOrder) 
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: 'Something went wrong. Please try again.' })
    }

})

router.get('/order', auth, async (req, res) => {
    const userId = req.user._id
    const orders = await Order.find({ user: userId })

    try {
        res.status(200).send(orders)
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: "Something went wrong. Please try again." })
    }
})

router.get('/order/:id', auth, async (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    const order = await Order.findOne({ user: userId, _id: id }).populate('products').lean()
    const orderProductsWithQuantity = addQuantityToCartProducts(order.products)

    order.products = orderProductsWithQuantity

    try {
        res.status(200).send(order)
    } catch (e) {
        res.status(500).send({ Error: "Something went wrong. Please try again." })
    }
})


module.exports = router