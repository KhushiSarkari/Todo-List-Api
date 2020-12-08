const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const { connect } = require('mongoose');
const { itemRouter } = require('./resources/Item/item.router');
const { userRouter } = require('./resources/User/user.router');
const { listRouter } = require('./resources/List/list.router');

const app = express();

app.use(cors);
app.use(json);
app.use(urlencoded({ extended: true }));

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