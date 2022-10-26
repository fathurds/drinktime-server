const express = require('express');
const router = express.Router();
const { index, create, update, destroy, destroyMany, destroyAll } = require("./controller");
const { isLoginUser } = require('../middleware/auth');

router.get('/', isLoginUser, index);
router.post('/', isLoginUser, create);
router.put('/:id', isLoginUser, update);
router.delete('/', isLoginUser, destroyMany);
router.delete('/all', isLoginUser, destroyAll);
router.delete('/:id', isLoginUser, destroy);

module.exports = router;