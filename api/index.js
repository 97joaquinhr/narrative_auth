require('dotenv').config()
require('./models/User');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
var allowedOrigins = ['http://127.0.0.1:5500',
                      'http://localhost:3000',
                      'https://mitnicks.ml',
                      'http://mitnicks.ml',
                      'https://www.mitnicks.ml',
                      'http://www.mitnicks.ml',
                      'http://64.227.60.176',
                      'https://64.227.60.176'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }    return callback(null, true);
  }
}));
app.use(bodyParser.json());
app.use(authRoutes);

const PORT = process.env.PORT


const mongoUri = process.env.MONGO_DB


mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error',(err)=>{
    console.error('Error connecting to mongo',err);
});


app.get('/',requireAuth,(req,res)=>{
    res.send(`Your phone: ${req.user.phone}`);
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
});