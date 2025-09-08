const express = require('express');
const {creatUer, handleLogin, getUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { productController } = require('../controllers/productController');

const routerAPI = express.Router();

routerAPI.all('/*', auth);

routerAPI.get('/', (req, res) => {
    return res.status(200).json("Hello world with API");
})

routerAPI.post('/register', creatUser);
routerAPI.post('/login', handleLogin);

routerAPI.get('/users', getUser);
routerAPI.get('/account', delay, getAccount);

routerAPI.get('/products', productController);

module.exports = routerAPI;