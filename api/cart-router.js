const express = require('express');

const router = express.Router();
const { auth } = require('../middleware/authorization');
const Cart = require('../models/cart');
const addQuantityToCartProducts = require('../utils/addQuantityToCartProducts');
const changeQuantity = require('../utils/changeQuantity');

router.post('/cart', auth, async (req, res) => {
  const { user } = req;
  const cart = await Cart.findOne({ user: user._id });

  try {
    if (!cart) {
      const newCart = new Cart({ user: user._id });
      await newCart.save();
      res.status(201).send(newCart);
    } else if (req.body.quantity) {
      const productsArr = cart.products;
      const id = req.body.productId;
      const { quantity } = req.body;

      if (quantity < 1 || quantity > 10) {
        return res.status(400).send();
      }

      const newProductArr = changeQuantity(productsArr, id, quantity);
      cart.products = newProductArr;
      await cart.save();
      const cartLean = await Cart.findOne({ user: user._id }).populate('products').lean();
      const productsWithQuantity = addQuantityToCartProducts(cartLean.products);
      res.status(200).send(productsWithQuantity);
    } else {
      const productsArr = cart.products;
      productsArr.push(req.body.products);
      await cart.save();
      res.status(200).send(cart);
    }
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/cart', auth, async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate('products').lean();
    const newProductsArr = addQuantityToCartProducts(cart.products);
    return res.status(200).send(newProductsArr);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/cart', auth, async (req, res) => {
  const productId = req.body._id;
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId });
  const newProductsArr = cart.products.filter((product) => product.toString() !== productId);
  cart.products = newProductsArr;

  try {
    await cart.save();
    res.status(200).send(newProductsArr);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
