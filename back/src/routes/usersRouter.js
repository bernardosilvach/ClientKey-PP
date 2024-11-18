const {Router} = require('express');

const router = Router();

const {storeUsers, Login, updateUser, uploadUserPhoto, getUserPhoto} = require('../controller/usersController');

/**
* @swagger
*  /store/users:
*   post:
*     summary: Cria os usuários
*     responses:
*       200:
*         description: Cria os usuários na database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/


router.post('/store/users', storeUsers);

/**
* @swagger
*  /store/login:
*   post:
*     summary: Recebe os dados de login
*     responses:
*       200:
*         description: Recebe e valida os dados de login no database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/


router.post('/store/login', Login);

/**
* @swagger
*  /store/users/:id:
*   put:
*     summary: Atualização do cadastro de usuário
*     responses:
*       200:
*         description: Faz a atualização do cadastro do usuário no database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.put('/store/users/:id', updateUser);

/**
* @swagger
*  /store/users/:id/foto:
*   post:
*     summary: Upload da foto do usuário
*     responses:
*       200:
*         description: Faz o upload da foto do usuário no database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.post('/store/users/:id/foto', uploadUserPhoto);

/**
* @swagger
*  /store/users/:id/foto:
*   get:
*     summary: Busca a foto do usuário
*     responses:
*       200:
*         description: Faz um get na foto do usuário no database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.get('/store/users/:id/foto', getUserPhoto); // Nova rota para obter a foto do usuário

module.exports = router;