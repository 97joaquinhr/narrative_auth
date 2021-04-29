const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');


const router = express.Router();

router.post('/signup', async (req, res) => {
  const { phone: username, password } = req.body;
  try {
    const user = new User({
      phone: username,
      password
    });
    await user.save();
    res.send({ message: 'Registering' });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(422).send({ error: 'Must provide phone and password' });
  }
  
  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or phone' });
  }
  if (!user.verified) {
    return res.status(405).send({ error: 'Must verify account' });
  }

});


module.exports = router;
