const { Router } = require('express');
const { userController } = require('./user.controller');

const router = Router();

router.get('/', userController);
router.put('/', userController);

module.exports.router = router;