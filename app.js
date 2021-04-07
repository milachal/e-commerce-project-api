const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./db/mongoose')
const productRouter = require('./api/product-router')
const userRouter = require('./api/user-router')
const authRouter = require('./api/auth')
const cartRouter = require('./api/cart-router')
const orderRouter = require('./api/order-router')
const app = express()
const morgan = require('morgan')


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))

app.use('/api', productRouter)
app.use('/api', authRouter)
app.use('/api', cartRouter)
app.use('/api', orderRouter)
app.use('/api/account', userRouter)

module.exports = app