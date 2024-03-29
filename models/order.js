const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  status: {
    type: String,
    default: 'In procces',
  },
  total: {
    type: mongoose.Decimal128,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
