const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')
const { auth, adminAuth } = require('../middleware/authorization')
const addQuantityToCartProducts = require('../utils/addQuantityToCartProducts')

//get all orders of user
//change order status
//filter orders

router.post('/user', auth, adminAuth, async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email})
    const orders = await Order.find({ user: user._id }).populate('products').lean()
    console.log(orders)
    const ordersWithQuantityProducts = orders.map(order => {
        const quantityToProducts = addQuantityToCartProducts(order.products)
        order.products = quantityToProducts
        return order
    })
    try {
        if (!user) {
            return res.status(404).send({ error: 'User doesn\'t exists.' })
        }
        res.status(200).send({ user, orders: ordersWithQuantityProducts })
    } catch (e) {
        res.status(500).send({ error: 'Something went wrong. Please try again.' })
    }
})

module.exports = router 