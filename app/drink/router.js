const express = require('express');
const router = express.Router();
const { index, create, update, destroy, getByCategory } = require("./controller");
const { isLoginUser } = require('../middleware/auth');

router.get('/', index);
router.get('/category/:id', getByCategory);
router.post('/', isLoginUser, create);
router.put('/:id', isLoginUser, update);
router.delete('/:id', isLoginUser, destroy);

module.exports = router;