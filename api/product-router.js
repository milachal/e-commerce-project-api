const express = require('express')
const Product = require('../models/product')
const router = express.Router()

router.post('/add-new-product', async (req, res) => {
    // const body = req.body
    // body.sex = body.sex.toLowerCase()
    // body.category = body.category.LowerCase()
    const product = new Product(req.body)
    try {
       await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/products/:id', async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findById(id)
        if(!product) {
            return res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/products/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    const update = req.body
    console.log(update)
    try {
        // async & await
        const product = await Product.findByIdAndUpdate(id, update, { new: true })

        if (!product) {
            return res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/products/:id', async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findByIdAndRemove(id)
        if (!product) {
            res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router 