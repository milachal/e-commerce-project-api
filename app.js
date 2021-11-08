const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), 'config/.env') });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

const http = require('http');

const server = http.createServer(app);

const productRouter = require('./api/product-router');
const userRouter = require('./api/user-router');
const authRouter = require('./api/auth');
const cartRouter = require('./api/cart-router');
const orderRouter = require('./api/order-router');
const adminRouter = require('./api/admin-router');
const origin = process.env.NODE_ENV === 'production' ? process.env.FE : process.env.FE_DEV;

app.use(cors({ credentials: true, origin }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));

app.use('/api', productRouter);
app.use('/api', authRouter);

app.use('/api', cartRouter);
app.use('/api', orderRouter);
app.use('/api/admin', adminRouter);
app.use('/api/account', userRouter);

server.listen(PORT, () => {
  /* eslint-disable */
  console.log(`Server is running on ${PORT}.`);
});
