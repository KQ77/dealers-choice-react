const { syncAndSeed } = require('./seed.js');

const seed = async () => {
  await syncAndSeed();
  console.log('DB seeded');
};

seed();
