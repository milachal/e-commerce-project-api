const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./db/mongoose')
const morgan = require('morgan')

const app = express()
const port = 3001

const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true
    }
})

const productRouter = require('./api/product-router')
const userRouter = require('./api/user-router')
const authRouter = require('./api/auth')
const cartRouter = require('./api/cart-router')
const orderRouter = require('./api/order-router')
const adminRouter = require('./api/admin-router')

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))

app.use('/api', productRouter)
app.use('/api', authRouter)

// app.use('/api', (req, res, next) => {
//     req.io = io
//     next()
// })

app.use('/api', cartRouter)
app.use('/api', orderRouter)
app.use('/api/admin', adminRouter)
app.use('/api/account', userRouter)

server.listen(port, () => {
    console.log(`Server is running on ${port}.`)
})
