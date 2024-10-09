const {Router} = require('express');

const router = Router();

const {storeClientes, mostrarClientes, deletarClientes, updateCliente} = require('../controller/clientesController');

/**
* @swagger
*  /store/clientes:
*   post:
*     summary: Cria clientes
*     responses:
*       200:
*         description: Cria os clientes na database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/


router.post('/store/clientes', storeClientes);

/**
* @swagger
* /store/mostrarClientes:
*   post:
*     summary: Mostra a lista de clientes
*     responses:
*       200:
*         description: Retorna a lista de clientes do database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/


router.post('/store/mostrarClientes', mostrarClientes);

/**
* @swagger
* /store/deletarClientes/:id:
*   delete:
*     summary: Deleta os clientes
*     responses:
*       200:
*         description: Deleta os clientes da database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.delete('/store/deletarClientes/:id', deletarClientes);

/**
* @swagger
* /store/clientes/:id:
*   put:
*     summary: Deleta os clientes
*     responses:
*       200:
*         description: Deleta os clientes da database
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.put('/store/clientes/:id', updateCliente);

module.exports = router;