const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./db/mongoose')
const Product = require('./models/product')
const User = require('./models/user')
const productRouter = require('./api/product-router')
const userRouter = require('./api/user-router')
const app = express()


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())
// app.use(pageRouter)
app.use('/api', productRouter)
app.use('/api/account', userRouter)

module.exports = app