const { Router } = require('express');
const controller = require('./list.controller');

const router = Router();

// Router[/api/list]
router.route('/')
    .get(controller.getMany)
    .post(controller.createOne);

//Route[/api/list/:id]
router.route('/:id')
    .get(controller.getOne)
    .put(controller.updateOne)
    .delete(controller.deleteOne);

module.exports = router;