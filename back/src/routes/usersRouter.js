const {Router} = require('express');

const router = Router();

const {storeUsers, Login} = require('../controller/usersController');

router.post('/store/users', storeUsers);
router.post('/store/login', Login);

module.exports = router;