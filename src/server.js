const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const { connect } = require('./utils/db');
const itemRouter = require('./resources/Item/item.router');
const userRouter = require('./resources/User/user.router');
const listRouter = require('./resources/List/list.router');
const morgan = require('morgan');
const { signin, signup, protect } = require('./utils/auth')

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.post('/signup', signup);
app.post('/signin', signin);

app.use('/api', protect);

app.use('/api/item', itemRouter);
app.use('/api/list', listRouter);
app.use('/api/user', userRouter);

module.exports.start = async () => {
    try {
        await connect();
        app.listen(3000, () => {
            console.log(`REST API on http://localhost:3000/api`)
        });
    } catch (e) {
        console.error(e)
    }
}