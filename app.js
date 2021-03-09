const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const Product = require('./models/product')
const User = require('./models/user')
const productRouter = require('./api/product-router')
const userRouter = require('./api/user-router')
const app = express()


app.use(cors())
app.use(express.json())
// app.use(pageRouter)
app.use(productRouter)
app.use(userRouter)

module.exports = app