const express = require('express');
const router = express.Router();
const { create, index, destroy } = require("./controller");
const { isLoginUser } = require('../middleware/auth');

router.get('/', isLoginUser, index);
router.post('/create', isLoginUser, create);
router.delete('/delete/:username', isLoginUser, destroy);

module.exports = router;