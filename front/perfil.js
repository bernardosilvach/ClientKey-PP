document.addEventListener('DOMContentLoaded', function () {
    // Função para preencher os campos de perfil com os dados do usuário logado
    function preencherPerfil() {
        const nome = localStorage.getItem('nome_user');
        const email = localStorage.getItem('email_user');
        const cpf = localStorage.getItem('cpf_user');
        const nomeNegocio = localStorage.getItem('nome_negocio');

        // Verifica se os dados estão no localStorage
        if (nome && email && cpf && nomeNegocio) {
            // Preenche os campos de input no formulário de perfil
            document.getElementById('nome').value = nome;
            document.getElementById('email').value = email;
            document.getElementById('cpf').value = cpf;
            document.getElementById('nomenegocio').value = nomeNegocio; // Caso tenha um campo para nome do negócio
        } else {
            console.log("Dados de usuário não encontrados no localStorage.");
        }
    }

    // Chama a função ao carregar o DOM
    preencherPerfil();

    // Função para atualizar as informações do perfil no banco de dados e no localStorage
    async function atualizarPerfil(event) {
        event.preventDefault(); // Previne o comportamento padrão do submit

        // Captura os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const cpf = document.getElementById('cpf').value;
        const nomeNegocio = document.getElementById('nomenegocio').value;

        const idUser = localStorage.getItem('id_user'); // Obtém o ID do usuário logado

        // Verifica se os campos obrigatórios foram preenchidos
        if (!nome || !email || !cpf) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        // Prepara os dados para envio
        const data = {
            nome: nome,
            email: email,
            cpf: cpf,
            nomeNegocio: nomeNegocio
        };

        try {
            // Envia uma requisição PUT para atualizar o perfil no banco de dados
            const response = await fetch(`http://localhost:3000/api/store/users/${idUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                // Atualiza os dados no localStorage
                localStorage.setItem('nome_user', nome);
                localStorage.setItem('email_user', email);
                localStorage.setItem('cpf_user', cpf);
                localStorage.setItem('nome_negocio', nomeNegocio);

                alert('Perfil atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar o perfil.');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro de conexão com o servidor.');
        }
    }

    // Adiciona o evento de submissão ao formulário de perfil
    const form = document.getElementById('formPerfil');
    form.addEventListener('submit', atualizarPerfil);
});