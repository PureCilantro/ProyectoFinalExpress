//Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
//Routers
const user = require('./routes/user');
const content = require('./routes/content');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

app.use('/user', user);

app.use(auth);

app.use('/content', content);

app.use(notFound)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
})