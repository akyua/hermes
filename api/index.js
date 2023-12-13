const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const mongodbServer = process.env.MONGODB_SERVER;

const salt = bcrypt.genSaltSync(10);
const secret = 'randaodsmadmaskdsa'

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(mongodbServer);
app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch(error){
        res.status(400).json(error);
    }
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json('ok');
        });
    } else{
        res.status(400).json('Wrong Credentials')
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
})

app.listen(4000);
