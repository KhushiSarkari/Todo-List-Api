const { Router } = require('express');
const { itemController } = require('./item.controller');

const router = Router();

// Route[/api/item]
router.route('/')
    .get(itemController)
    .post(itemController);

// Route[/api/item/:id]
router.route('/:id')
    .get(itemController)
    .put(itemController)
    .delete(itemController);

module.exports.router = router;