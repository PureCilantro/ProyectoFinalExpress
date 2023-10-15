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

// API endpoints
app.use('/user', user);

app.use(auth); // From this point on a valid token is required

app.use('/content', content);

app.use(notFound)

// Server status
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
})