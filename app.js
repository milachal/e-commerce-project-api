const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const Product = require('./models/product')
const router = require('./api/product-router')

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

module.exports = app