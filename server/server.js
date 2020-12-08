const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const port = process.env.PORT || 3000;
const { User, Reply, Post } = require('../utils/seed.js');

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.use('/api', router);

router.get('/posts', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [Reply, User],
    });
    console.log(posts, 'posts including all');
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/posts', async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data, 'data from post');
    const newPost = await Post.create({
      userName: req.body.user - name,
      text: req.body.text,
      title: req.body.title,
    });
    res.status(201).send(newPost);
  } catch (err) {
    next(err);
  }
});
app.listen(port, () => console.log(`app listening on port ${port}`));
