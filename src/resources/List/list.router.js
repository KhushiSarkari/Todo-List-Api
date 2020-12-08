const { Router } = require('express');
const { listController } = require('./list.controller');

const router = Router();

// Router[/api/list]
router.route('/')
    .get(listController)
    .post(listController);

//Route[/api/list/:id]
router.route('/:id')
    .get(listController)
    .put(listController)
    .delete(listController);

module.exports.router = router;