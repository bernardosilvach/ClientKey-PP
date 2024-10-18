const {Router} = require('express');

const router = Router();

const {storeUsers, Login, updateUser} = require('../controller/usersController');

router.post('/store/users', storeUsers);
router.post('/store/login', Login);
router.put('/store/users/:id', updateUser);

module.exports = router;