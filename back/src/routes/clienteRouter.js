const {Router} = require('express');

const router = Router();

const {storeClientes, mostrarClientes, deletarClientes, updateCliente} = require('../controller/clientesController');

router.post('/store/clientes', storeClientes);
router.post('/store/mostrarClientes', mostrarClientes);
router.delete('/store/deletarClientes/:id', deletarClientes);
router.put('/store/clientes/:id', updateCliente);

module.exports = router;