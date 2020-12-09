const Config = require('../config/dev');
const User = require('../resources/User/user.model');
const jwt = require('jsonwebtoken');

const newToken = user => {
    return jwt.sign({ id: user.id }, Config.secrets.jwt, {
        expiresIn: Config.secrets.jwtExp
    });
}

const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, Config.secrets.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload);
        });
    });

module.exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: 'Email & Password required' });
    }
    try {
        const user = await User.create(req.body);
        const token = newToken(user);
        return res.status(201).send({ token });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

module.exports.signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: 'Email & Password required' });
    }
    try {
        const user = await User
            .findOne({
                email: req.body.email
            })
            .select('email password')
            .exec();

        if (!user)
            return res.status(401).send({ message: 'Invalid email-password combination' });

        const match = await user.checkPassword(req.body.password);
        if (!match)
            return res.status(401).send({ message: 'Invalid email-password combination' });
        const token = newToken(user);
        return res.status(201).send({ token });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

module.exports.protect = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end();
    }

    const token = bearer.split('Bearer ')[1].trim();
    let payload;
    try {
        payload = await verifyToken(token);
    } catch (e) {
        return res.status(401).end();
    }

    const user = await User.findById(payload.id)
        .select('-password')
        .lean()
        .exec();

    if (!user) {
        return res.status(401).end();
    }

    req.user = user;
    next();
}


