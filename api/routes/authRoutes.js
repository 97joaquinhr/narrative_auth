const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Experiment = mongoose.model('Experiment');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, secondsTaken } = req.body;
  try {
    const user = new User({
      username,
      password
    });
    await user.save();
    const experiment = new Experiment({
      userId: user._id,
      route: 'signup',
      wasSuccessful: true,
      secondsTaken: secondsTaken,
      description: 'successful_signup'
    });
    await experiment.save();
    res.send({ message: 'Registrado' });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { username, password, secondsTaken } = req.body;
  let experiment = new Experiment({
    userId: null,
    route: 'signin',
    wasSuccessful: false,
    secondsTaken: secondsTaken
  });
  if (!username || !password) {
    return res.status(422).send({ error: 'Falta usuario o secuencia' });
  }
  const user = await User.findOne({ username });
  if (!user) {
    experiment.description = 'wrong_user';
    await experiment.save();
    return res.status(422).send({ error: 'Usuario o secuencia incorrecta' });
  }
  experiment.userId = user._id;
  if (user.password != password) {
    experiment.description = 'wrong_password';
    await experiment.save();
    return res.status(422).send({ error: 'Usuario o secuencia incorrecta' });
  }
  experiment.wasSuccessful = true;
  experiment.description = 'successful_signin';
  await experiment.save();
  res.send({ message: 'Sesión confirmada' });
});


module.exports = router;
