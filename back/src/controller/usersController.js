const connection = require('../config/db');
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

const fs = require('fs');
const path = require('path');

async function uploadUserPhoto(req, res) {
    const idUsuario = req.params.id;

    // Log para verificar se o arquivo foi enviado
    console.log('Arquivos recebidos:', req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('Nenhum arquivo de imagem recebido.');
        return res.status(400).json({ success: false, message: 'Nenhuma imagem enviada.' });
    }

    const arquivoImagem = req.files[Object.keys(req.files)[0]];
    const diretorioUpload = path.join(__dirname, '../uploads/profile_images');

    // Cria o diretório se ele não existir
    if (!fs.existsSync(diretorioUpload)) {
        fs.mkdirSync(diretorioUpload, { recursive: true });
    }

    const nomeImagem = `user_${idUsuario}_${Date.now()}${path.extname(arquivoImagem.name)}`;
    const caminhoImagem = `/uploads/profile_images/${nomeImagem}`;
    const caminhoCompletoImagem = path.join(diretorioUpload, nomeImagem);

    // Salva a imagem no servidor
    fs.writeFile(caminhoCompletoImagem, arquivoImagem.data, async (erro) => {
        if (erro) {
            console.error('Erro ao salvar a imagem:', erro);
            return res.status(500).json({ success: false, message: 'Erro ao salvar a imagem no servidor.', error: erro });
        }

        // Após salvar a imagem, tenta atualizar o caminho da imagem no banco de dados
        const query = "UPDATE users SET foto = ? WHERE id = ?";
        const params = [caminhoImagem, idUsuario];

        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Erro ao atualizar o banco de dados:', err);
                return res.status(500).json({ success: false, message: 'Erro ao atualizar o banco de dados.', error: err });
            }

            if (results.affectedRows === 0) {
                console.warn('Nenhum registro atualizado. Verifique se o ID do usuário é válido.');
                return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
            }

            res.status(200).json({
                success: true,
                message: 'Imagem enviada e atualizada com sucesso!',
                imagePath: caminhoImagem
            });
        });
    });
}

async function getUserPhoto(req, res) {
    const idUsuario = req.params.id;

    // Consulta para obter o caminho da foto do usuário
    const query = "SELECT foto FROM users WHERE id = ?";
    connection.query(query, [idUsuario], (err, results) => {
        if (err) {
            console.error('Erro ao obter a foto do usuário:', err);
            return res.status(500).json({ success: false, message: 'Erro ao buscar a foto do usuário.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }

        const caminhoFoto = results[0].foto;
        res.status(200).json({ success: true, imagePath: caminhoFoto });
    });
}

module.exports = {
    storeUsers,
    Login,
    updateUser,
    uploadUserPhoto,
    getUserPhoto
}