const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const mongodbServer = process.env.MONGODB_SERVER;
const multer = require('multer');
const uploadMiddleWare = multer({ dest: 'uploads/' });
const fs =  require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'randaodsmadmaskdsa';

const corsOptions = {
    origin: ['http://localhost:3000', 'https://hermes-akyua.vercel.app'],
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

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
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
    } else{
        res.status(400).json('Wrong Credentials')
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json('Missing token');
    }
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.post('/post', uploadMiddleWare.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]; 
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err, info) => {
        if(err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title, 
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
});

app.put('/post', uploadMiddleWare.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = postDoc.author.equals(info.id);

        if (!isAuthor) {
            return res.status(400).json('You are not the author');
        }

        try {
            await Post.updateOne(
                { _id: id },
                {
                    $set: {
                        title,
                        summary,
                        content,
                        cover: newPath ? newPath : postDoc.cover,
                    },
                }
            );
            res.json({ message: 'Post updated successfully' });
        } catch (error) {
            console.error('Erro ao atualizar o post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({createdAt: -1})
            .limit(10)
        );
});

app.get('/post/:id', async(req, res) => {
    const {id} = req.params;
    postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.listen(4000);