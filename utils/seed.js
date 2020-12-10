const { DATEONLY } = require('sequelize');
const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/discussion_board',
  { logging: true }
);

const { STRING, TEXT, DATE, UUID, INTEGER, UUIDV4 } = Sequelize;
const { categoryData } = require('./categoryData');
const { postData } = require('./postData');

//define Models
const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userName: {
    type: STRING,
    unique: true,
  },
  password: {
    type: STRING,
    validate: {
      len: [5, 50],
    },
  },
});

const Post = conn.define('post', {
  userName: {
    type: STRING,
    allowNull: false,
  },
  text: {
    type: TEXT,
    allowNull: true,
  },
  title: {
    type: STRING,
  },
  upvotes: {
    type: INTEGER,
    defaultValue: 0,
  },
  category: {
    type: STRING,
  },
  time: {
    type: DATEONLY,
    defaultValue: Date.now(),
  },
});

const Reply = conn.define('reply', {
  text: {
    type: TEXT,
    allowNull: false,
  },
  time: {
    type: DATE,
    defaultValue: Date.now(),
  },
});
// const Category = conn.define('category', {
//   name: {
//     type: STRING,
//   },
// });

//define associations
Post.belongsTo(User);
User.hasMany(Post);

Reply.belongsTo(User);

Reply.belongsTo(Post);
Post.hasMany(Reply);

// Post.belongsTo(Category);
// Category.hasMany(Post);

//define syndAndSeed function
const syncAndSeed = async () => {
  await conn.authenticate();
  await conn.sync({ force: true });
  console.log('DB authenticated!');
  //   await Promise.all(categoryData.map((cat) => Category.create(cat)));
  await Promise.all(postData.map((post) => Post.create(post)));
};

module.exports = { User, Post, Reply, syncAndSeed };
