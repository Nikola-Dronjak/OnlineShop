const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const router = express.Router();

const uri = "mongodb+srv://Admin:admin@cluster0.cv0sz3z.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Getting all the products.
router.get('/', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find().toArray();
        if(products.length === 0){
            return res.send("There are no products in the database right now.");
        }
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Sorting all the products by price in an ascending order.
router.get('/sortASC', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find().toArray();
        if(products.length === 0){
            return res.send("There are no products in the database right now.");
        }
        products.sort((a, b)=> Number(a.price) - Number(b.price));
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Sorting all the products by price in a descending order.
router.get('/sortDSC', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find().toArray();
        if(products.length === 0){
            return res.send("There are no products in the database right now.");
        }
        products.sort((a, b)=> Number(b.price) - Number(a.price));
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Filter products by category.
router.get('/filter/:category', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find({category: req.params.category}).toArray();
        if(products.length === 0){
            return res.status(404).send("There are no products with the given category.");
        }
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Sorting the filtered products by price in an ascending order.
router.get('/filter/:category/sortASC', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find({category: req.params.category}).toArray();
        if(products.length === 0){
            return res.send("There are no products in the database right now.");
        }
        products.sort((a, b)=> Number(a.price) - Number(b.price));
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Sorting the filtered products by price in a descending order.
router.get('/filter/:category/sortDSC', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find({category: req.params.category}).toArray();
        if(products.length === 0){
            return res.send("There are no products in the database right now.");
        }
        products.sort((a, b)=> Number(b.price) - Number(a.price));
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Searching for a product by name/description.
router.get('/search/:input', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find({
            $or:[
                {name:{$regex: new RegExp(`^${req.params.input}`, 'i')}},
                {description:{$regex: new RegExp(`^${req.params.input}`, 'i')}}
            ]
        }).toArray();
        if(products.length === 0){
            return res.status(404).send("There are no products with the given name/description.");
        }
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Sorting the search results by price in an ascending order.
router.get('/search/:input/sortASC', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find({
            $or:[
                {name:{$regex: new RegExp(`^${req.params.input}`, 'i')}},
                {description:{$regex: new RegExp(`^${req.params.input}`, 'i')}}
            ]
        }).toArray();
        if(products.length === 0){
            return res.send("There are no products in the database right now.");
        }
        products.sort((a, b)=> Number(a.price) - Number(b.price));
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Sorting the search results by price in a descending order.
router.get('/search/:input/sortDSC', async(req, res)=>{
    try {
        await client.connect();

        const products = await client.db('OnlineShop').collection('products').find({
            $or:[
                {name:{$regex: new RegExp(`^${req.params.input}`, 'i')}},
                {description:{$regex: new RegExp(`^${req.params.input}`, 'i')}}
            ]
        }).toArray();
        if(products.length === 0){
            return res.send("There are no products in the database right now.");
        }
        products.sort((a, b)=> Number(b.price) - Number(a.price));
        res.send(products);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Getting the details for a specific product.
router.get('/details/:id', async(req, res)=>{
    try {
        await client.connect();

        const product = await client.db('OnlineShop').collection('products').findOne({_id: req.params.id});
        if(product === null){
            return res.status(404).send("The product with the given ID was not found.");
        }
        res.send(product);
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

// Adding products to the cart.
router.post('/:id', async(req, res)=>{
    try {
        await client.connect();

        const product = await client.db('OnlineShop').collection('products').findOne({_id: req.params.id});
        if(product === null){
            return res.status(404).send("The product with the given ID was not found.");
        }
        req.session.cart.push(product);
        res.send("The product has been added to the cart.");
    } catch (error) {
        res.status(500).send("Something went wrong.");
    } finally {
        await client.close();
    }
});

module.exports = router;