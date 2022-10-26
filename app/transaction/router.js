const express = require('express');
const router = express.Router();
const { index, detail } = require("./controller");
const { isLoginUser } = require('../middleware/auth');

router.get('/', isLoginUser, index);
router.get('/:id', isLoginUser, detail);

module.exports = router;