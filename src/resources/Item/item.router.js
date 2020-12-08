const { Router } = require('express');
const controller = require('./item.controller');

const router = Router();

// Route[/api/item]
router.route('/')
    .get(controller.getMany)
    .post(controller.createOne);

// Route[/api/item/:id]
router.route('/:id')
    .get(controller.getOne)
    .put(controller.updateOne)
    .delete(controller.deleteOne);

module.exports = router;