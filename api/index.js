const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const app = express();
const mongodbServer = process.env.MONGODB_SERVER;

app.use(cors());
app.use(express.json());

mongoose.connect(mongodbServer);
app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password
        });
        res.json(userDoc);
    } catch(error){
        res.status(400).json(error);
    }
})

app.listen(4000);
