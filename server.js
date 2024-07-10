const express = require('express');
const mongoose = require('mongoose');
const productRoute =require('./routes/productRoute');
const app = express();
require('dotenv').config()
const errorMiddleware=require('./middleware/errorMiddleware')
var cors = require('cors')
app.use(cors(corsOptions))

const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT || 3000
const FRONTEND=process.env.FRONTEND

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(express.json()); 
app.use(express.urlencoded({extended:false}))

//routes

app.use('/api/products',productRoute);

app.get('/', (req, res) => {
    
    res.send('Hello Node API');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, Hi!');
});
app.use(errorMiddleware);


mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
