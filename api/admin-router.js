const express = require('express');

const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');
const { auth, adminAuth } = require('../middleware/authorization');
const addQuantityToCartProducts = require('../utils/addQuantityToCartProducts');

router.post('/user', auth, adminAuth, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const orders = await Order.find({ user: user._id }).populate('products').lean();
  const ordersWithQuantityProducts = orders.map((order) => {
    const quantityToProducts = addQuantityToCartProducts(order.products);
    /* eslint-disable */
    order.products = quantityToProducts;
    return order;
  });
  try {
    if (!user) {
      return res.status(404).send({ error: 'User doesn\'t exists.' });
    }
    res.status(200).send({
      user: {
        email: user.email,
        name: user.name,
        status: user.status,
        createdAt: user.createdAt,
      },
      orders: ordersWithQuantityProducts,
    });
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong. Please try again.' });
  }
});

router.patch('/user', auth, async (req, res) => {
  // restrict update to only status
  const update = req.body;
  // const user = await User.findOne({ email: req.body.email })

  try {
    const user = await User.findOneAndUpdate({ email: req.body.email }, update, { new: true });
    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/order/:id', auth, async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, update, { new: true });
    if (!order) {
      res.status(404).send();
    }
    res.status(200).send(order);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
