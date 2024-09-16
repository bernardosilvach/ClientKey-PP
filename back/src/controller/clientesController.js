const connection = require('../config/db')
const dotenv = require('dotenv').config();

async function storeClientes(request, response) {
    const params = Array(
        request.body.nome,
        request.body.cpf,
        request.body.email,
        request.body.telefone,
        request.body.endereco,
        request.body.status,
        request.body.usuario_relacionado
    )

    const query = "INSERT INTO clientes(nome, cpf, email, telefone, adress, statuscl, usuario_relacionado) VALUES(?, ?, ?, ?, ?, ?, ?)";
    
    connection.query(query, params, (err, results) => {
        if(results) {
            response.status(200).json({
                success: true,
                message: "Sucesso!",
                data: results,
                clienteId: results.insertId
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err,
            })
        }
    })
}

async function mostrarClientes(request, response){
    const params = Array (
        request.body.usuario_relacionado
    );

    console.log(params);
    const query = "SELECT * FROM clientes WHERE usuario_relacionado = ?"

    connection.query(query, params, (err, results) => {
        if(results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                data: err,
            })
        }
    })
}

async function deletarClientes(request, response) {
    const params = Array (
        request.params.id
    )

    const query = "DELETE FROM clientes WHERE id = ?"; // Corrige a query para deletar o cliente com base no ID

    connection.query(query, params, (err, results) => {
        if(results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results,
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                data: err,
            })
        }
    })
}

async function updateCliente(request, response) {
    const clienteId = request.params.id; // Pega o ID do cliente da URL
    const params = [
        request.body.nome,
        request.body.cpf,
        request.body.email,
        request.body.telefone,
        request.body.endereco,
        request.body.status,
        clienteId
    ];

    const query = "UPDATE clientes SET nome = ?, cpf = ?, email = ?, telefone = ?, adress = ?, statuscl = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Cliente atualizado com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao atualizar cliente!",
                sql: err,
            });
        }
    });
}


module.exports = {
    mostrarClientes,
    storeClientes,
    deletarClientes,
    updateCliente
};