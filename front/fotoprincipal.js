// Função para buscar e exibir a foto do usuário na div com id "uservazio"
async function exibirFotoPerfil() {
    const idUsuario = localStorage.getItem('id_user'); // Obtém o ID do usuário

    try {
        const resposta = await fetch(`http://localhost:3000/api/store/users/${idUsuario}/foto`);
        const resultado = await resposta.json();

        if (resultado.success && resultado.imagePath) {
            document.getElementById('uservazio').src = resultado.imagePath; // Define a imagem de perfil
        } else {
            console.warn('Foto do usuário não encontrada.');
        }
    } catch (erro) {
        console.error('Erro ao carregar a foto do usuário:', erro);
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', exibirFotoPerfil);