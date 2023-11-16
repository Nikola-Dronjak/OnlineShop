const express = require('express');
const session = require('express-session');
const app = express();
const products = require('./routes/products');
const cart = require('./routes/cart');

app.use(express.json());

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    next();
});

app.use('/api/products', products);
app.use('/api/cart', cart);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));