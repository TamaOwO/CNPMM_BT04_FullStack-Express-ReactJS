require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRouters = require('./routes/api');
const connection = require('./config/database');
const {getHomePage} = require('./controllers/homeController');
const cors = require('cors');
const app = express(); //cau hinh app la express
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
configViewEngine(app);

const webAPI = express.Router();
webAPI.get('/', getHomePage);
app.use('/', webAPI);

//khai bao route cho API
app.use('/api/v1', apiRouters);
(async()=>{
    try{
        await connection();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }catch(e){
        console.log("Cannot connect to database", e);
    }
})();

