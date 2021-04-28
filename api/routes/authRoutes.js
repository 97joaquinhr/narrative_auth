const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');


const router = express.Router();

router.post('/signup', async (req, res) => {
  const { phone, password } = req.body;
  const verificationCode = generateVerificationCode();
  try {
    const user = new User({
      phone,
      password,
      verificationCode,
      verified: false
    });
    await user.save();
    sendSMS(phone, `Tu código de verificación es: ${verificationCode}`);
    
    res.send({ message: 'Verification code sent' });
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

  try {
    await user.comparePassword(password);
    // const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    // res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or phone' });
  }

  try {
    user.verificationCode = generateVerificationCode();
    user.save();
    sendSMS(phone, `Tu código de verificación es: ${user.verificationCode}`);
    res.send({ message: 'Verification code sent' });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ error: err.message });
  }
});

router.post('/verify', async (req, res) => {
  const { phone, verificationCode } = req.body;

  if (!phone || !verificationCode) {
    return res.status(422).send({ error: 'Must provide phone and verification code' });
  }
  
  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(422).send({ error: 'Invalid phone' });
  }
  if (user.verified === true) {
    return res.status(422).send({ error: 'User already verified' });
  }

  // TODO: Encrypt verification code
  if (user.verificationCode !== verificationCode) {
    return res.status(422).send({ error: 'Wrong verification code' });
  }
  user.verified = true;
  user.verificationCode = null;
  user.save();
  const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
  res.send({ token });

});

router.post('/verifySignin', async (req, res) => {
  const { phone, password, verificationCode } = req.body;

  if (!phone || !password || !verificationCode) {
    return res.status(422).send({ error: 'Must provide phone, password and verification code' });
  }
  
  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password, phone or verification code' });
  }

  // TODO: Encrypt verification code
  if (user.verificationCode !== verificationCode) {
    return res.status(422).send({ error: 'Invalid password, phone or verification code' });
  }

  try {
    await user.comparePassword(password);
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password, phone or verification code' });
  }
  user.verificationCode = null;
  user.save();
  const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
  res.send({ token });

});


function generateVerificationCode() { 
  var digits = '0123456789'; 
  let OTP = ''; 
  for (let i = 0; i < 5; i++ ) { 
      OTP += digits[Math.floor(Math.random() * 10)]; 
  } 
  return OTP; 
} 

module.exports = router;
