const express = require('express');
const router = express.Router();
const { index, create, update, destroy, getByType } = require("./controller");

router.get('/', index);
router.get('/:type', getByType);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;