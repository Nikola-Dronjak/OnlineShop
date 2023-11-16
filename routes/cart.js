const express = require('express');
const router = express.Router();

// Getting all the products that are in the cart.
router.get('/', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        res.send(cartItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

// Sorting all the products that are in the cart in an ascending order.
router.get('/sortASC', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        cartItems.sort((a, b)=>Number(a.price) - Number(b.price));
        res.send(cartItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

// Sorting all the products that are in the cart in a descending order.
router.get('/sortDSC', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        cartItems.sort((a, b)=>Number(b.price) - Number(a.price));
        res.send(cartItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

// Filter products in the cart by category.
router.get('/filter/:category', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        const filteredItems = cartItems.filter(product => product.category === req.params.category);
        res.send(filteredItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

// Sorting the filtered products in the cart by price in an ascending order.
router.get('/filter/:category/sortASC', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        const filteredItems = cartItems.filter(product => product.category === req.params.category);
        filteredItems.sort((a, b)=> Number(a.price) - Number(b.price));
        res.send(filteredItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

// Sorting the filtered products in the cart by price in a descending order.
router.get('/filter/:category/sortDSC', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        const filteredItems = cartItems.filter(product => product.category === req.params.category);
        filteredItems.sort((a, b)=> Number(b.price) - Number(a.price));
        res.send(filteredItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

router.get('/search/:input', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        const filteredItems = cartItems.filter(product => new RegExp(`^${req.params.input}`, 'i').test(product.name) || new RegExp(`^${req.params.input}`, 'i').test(product.description));
        res.send(filteredItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

// Sorting the search results by price in an ascending order.
router.get('/search/:input/sortASC', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        const filteredItems = cartItems.filter(product => new RegExp(`^${req.params.input}`, 'i').test(product.name) || new RegExp(`^${req.params.input}`, 'i').test(product.description));
        filteredItems.sort((a, b)=> Number(a.price) - Number(b.price));
        res.send(filteredItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

// Sorting the search results by price in a descending order.
router.get('/search/:input/sortDSC', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        const filteredItems = cartItems.filter(product => new RegExp(`^${req.params.input}`, 'i').test(product.name) || new RegExp(`^${req.params.input}`, 'i').test(product.description));
        filteredItems.sort((a, b)=> Number(b.price) - Number(a.price));
        res.send(filteredItems);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

// Removing a product from the cart.
router.delete('/:id', async(req, res)=>{
    try {
        const cartItems = req.session.cart;
        if(cartItems.length === 0){
            return res.send("The cart is empty.");
        }
        for (let i = 0; i < cartItems.length; i++) {
            if(cartItems[i]._id === req.params.id){
                cartItems.splice(i, 1);
                res.send("The item was removed successfully.");
                return;
            } 
        }
    } catch (error) {
        res.status(500).send("Something went wrong.");
    }
});

module.exports = router;