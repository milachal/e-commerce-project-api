const request = require('supertest')
const Product = require('../models/product')
const app = require('../app')
const mongoose = require('mongoose')

beforeEach(async () => {
    await Product.deleteMany()
})

afterAll(async () => {
    await mongoose.disconnect()
})

test('Add new product', async () => {
   await request(app).post('/add-new-product').send({
        title: 'Nike Leggings',
        price: 89.99,
        sex: "women's",
        category: 'clothes',
        description: 'Nike runners clothing',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmLKzbGq3KX4RnJOEz48IbIlRpJS1pXH1ofQ&usqp=CAU'
    }).expect(201)
})