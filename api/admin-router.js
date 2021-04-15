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
    const user = await User.findOne({ email: req.body.email })
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

router.patch('/user', auth, async (req, res) => {
    const update = req.body
    console.log(update)
    // const user = await User.findOne({ email: req.body.email })

    try {
        const user = await User.findOneAndUpdate({ email: req.body.email }, update, { new: true })
        console.log(user)
        console.log(req.body.email)
        if (!user) {
            res.status(404).send()
        }

        res.status(200).send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/order/:id', auth, async (req, res) => {
    const id = req.params.id
    const update = req.body

    try {
        const order = await Order.findByIdAndUpdate(id, update, { new: true })
        if (!order) {
            res.status(404).send()
        }
        res.status(200).send(order)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router 