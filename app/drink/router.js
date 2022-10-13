const express = require('express');
const router = express.Router();
const { index, create, update, destroy, getByCategory } = require("./controller");

router.get('/', index);
router.get('/category/:id', getByCategory);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;