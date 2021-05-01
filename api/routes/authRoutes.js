const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');


const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({
      username,
      password
    });
    await user.save();
    res.send({ message: 'Registrado' });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).send({ error: 'Falta usuario o secuencia' });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(422).send({ error: 'Usuario o secuencia incorrecta' });
  }
  if (user.password != password) {
    return res.status(422).send({ error: 'Usuario o secuencia incorrecta' });
  }
  res.send({ message: 'Sesión confirmada' });
});


module.exports = router;
