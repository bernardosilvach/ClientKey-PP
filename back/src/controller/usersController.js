const connection = require('../config/db')
const dotenv = require('dotenv').config();

async function storeUsers(request, response) {
    const params = Array(
        request.body.nome,
        request.body.cpf,
        request.body.email,
        request.body.senha,
        request.body.nomenegocio,
    )

    const query = "INSERT INTO users(nome, cpf, email, senha, nomenegocio) VALUES(?, ?, ?, ?, ?)";
    
    connection.query(query, params, (err, results) => {
        if(results) {
            response.status(200).json({
                success: true,
                message: "Sucesso!",
                data: results
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

async function Login(request, response) {
    const params = Array(
        request.body.email,
        request.body.senha,
    )

    const query = "SELECT email, senha, id, nome, nomenegocio FROM users WHERE email = ? AND senha = ?";
    
    connection.query(query, params, (err, results) => {
        if(results && results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Sucesso!",
                data: results
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

module.exports = {
    storeUsers,
    Login
}