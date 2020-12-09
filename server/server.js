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
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/posts', async (req, res, next) => {
  try {
    const newPost = await Post.create({
      userName: req.body.userName,
      text: req.body.text,
      title: req.body.title,
      category: req.body.categorys,
    });
    res.status(201).send(newPost);
  } catch (err) {
    next(err);
  }
});

router.put('/posts/:postId', async (req, res, next) => {
  try {
    const postToUpdate = await Post.findByPk(req.params.postId);
    await postToUpdate.update(req.body);
    console.log(postToUpdate, 'updated post?');
    const updatedPosts = await Post.findAll({ include: [Reply, User] });
    res.status(200).send(updatedPosts);
  } catch (err) {
    next(err);
  }
});

router.delete('/posts/:postId', async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
      },
    });
    const updatedPosts = await Post.findAll({ include: [Reply, User] });
    res.status(200).send(updatedPosts);
  } catch (err) {
    next(err);
  }
});

router.post('/posts/:postId/replies', async (req, res, next) => {
  try {
    console.log(req.body, 'req.body');
    await Reply.create(req.body);
    const posts = await Post.findAll({ include: [Reply, User] });
    res.status(201).send(posts);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`app listening on port ${port}`));
