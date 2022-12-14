const express = require('express');
const router = express.Router();
const { index, detail, transactionToday } = require("./controller");
const { isLoginUser } = require('../middleware/auth');

router.get('/', isLoginUser, index);
router.get('/today', isLoginUser, transactionToday);
router.get('/detail/:id', isLoginUser, detail);

module.exports = router;