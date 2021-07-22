const express = require('express');
const Product = require('../models/product');

const router = express.Router();
const { auth, adminAuth } = require('../middleware/authorization');

router.post('/add-new-product', auth, adminAuth, async (req, res) => {
  // const body = req.body
  // body.sex = body.sex.toLowerCase()
  // body.category = body.category.LowerCase()
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/products/:id', auth, adminAuth, async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, update, { new: true });

    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/products/:id', auth, adminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndRemove(id);
    if (!product) {
      res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

// router.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find({})
//         const page = (
//             <App>
//                 <ProductsPage products={products} />
//             </App>
//         )
//         res.send(ReactDom.renderToString(page))
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router;
