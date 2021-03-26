const express = require('express')
const router = express.Router()
const auth = require('../middleware/authorization')
const User = require('../models/user')
const Cart = require('../models/cart')
const { findByIdAndDelete, findByIdAndRemove } = require('../models/user')

router.post('/cart', auth, async (req, res) => {
    const user = req.user
    const cart  =  await Cart.findOne({ user: req.user._id  })
    const productsArr = cart.products

    try {
        if (!cart) {
            const newCart = new Cart({ user: user._id })
            try {
                await newCart.save()
                return res.status(201).send(newCart)
            } catch (e) {
                return res.status(404).send(e)
            }
        }

        productsArr.push(req.body.products)
        console.log(req.body.products, 'from req')
        console.log(productsArr, 'arr')
        await cart.save()
        console.log(productsArr, 'products')
        return res.send(cart)
        
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router