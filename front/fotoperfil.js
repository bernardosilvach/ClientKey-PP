// Quando clicado, simula o clique no input de arquivo 'inputFoto'.
document.getElementById('botaoEditarFoto').addEventListener('click', () => {
    document.getElementById('inputFoto').click();
});

// Adiciona um evento de mudança ao input de arquivo 'inputFoto'.
// evento será disparado quando o usuário selecionar um arquivo.
document.getElementById('inputFoto').addEventListener('change', async function (event) {
    const arquivo = event.target.files[0]; // Obtém o primeiro arquivo selecionado pelo usuário.
    if (!arquivo) return; // Se nenhum arquivo for selecionado, a função termina aqui.

    // Cria um objeto FormData para enviar o arquivo ao servidor.
    const formData = new FormData();
    formData.append('foto', arquivo); // Adiciona o arquivo ao FormData.

    // Obtém o ID do usuário armazenado no localStorage.
    const idUsuario = localStorage.getItem('id_user');

    try {
        const resposta = await fetch(`http://localhost:3000/api/store/users/${idUsuario}/foto`, {
            method: 'POST', 
            body: formData 
        });

        const resultado = await resposta.json();
        
        // Verifica se a resposta indica sucesso e se contém o caminho da imagem.
        if (resultado.success && resultado.imagePath) {
            // Atualiza a imagem do perfil com o novo caminho.
            document.getElementById('imagemPerfil').src = resultado.imagePath;
            alert('Foto de perfil atualizada com sucesso!');
            location.reload(); // Recarrega a página para refletir as mudanças.
        } else {
            alert('Erro ao atualizar a foto de perfil.');
        }
    } catch (erro) {
        console.error('Erro ao conectar com o servidor:', erro);
        alert('Erro de conexão com o servidor.');
    }
});


// Função para buscar e exibir a foto do usuário
async function carregarFotoUsuario() {
    const idUsuario = localStorage.getItem('id_user'); // Obtém o ID do usuário

    try {
        const resposta = await fetch(`http://localhost:3000/api/store/users/${idUsuario}/foto`);
        const resultado = await resposta.json();

        if (resultado.success && resultado.imagePath) {
            document.getElementById('imagemPerfil').src = resultado.imagePath;
        } else {
            console.warn('Foto do usuário não encontrada.');
        }
    } catch (erro) {
        console.error('Erro ao carregar a foto do usuário:', erro);
    }

}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarFotoUsuario);