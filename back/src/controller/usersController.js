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
    const params = [request.body.email, request.body.senha];

    const query = "SELECT id, nome, cpf, email, nomenegocio FROM users WHERE email = ? AND senha = ?";
    
    connection.query(query, params, (err, results) => {
        if (results && results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Login feito com sucesso!",
                data: results // Enviando os dados do usuário (id, nome, cpf, email, nome_negocio)
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro no login.",
                sql: err
            });
        }
    });
}


async function updateUser(request, response) {
    const userId = request.params.id; // ID do usuário a ser atualizado
    const { nome, email, cpf, nomeNegocio } = request.body; // Dados enviados no corpo da requisição

    // Prepara a query SQL de atualização
    const query = "UPDATE users SET nome = ?, email = ?, cpf = ?, nomenegocio = ? WHERE id = ?";
    const params = [nome, email, cpf, nomeNegocio, userId]; // Parâmetros para a query

    // Executa a query no banco de dados
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Usuário atualizado com sucesso!"
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao atualizar usuário.",
                sql: err
            });
        }
    });
}


module.exports = {
    storeUsers,
    Login,
    updateUser
}