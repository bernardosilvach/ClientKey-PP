// Obtém o botão de criação/edição a partir do DOM
const botao_criar_editar = document.getElementById('botao_criar_editar');

// Obtém o elemento 'interiorbaixo' do DOM
let interior = document.getElementById('interiorbaixo');

// Espera até que o DOM esteja completamente carregado para executar o código
document.addEventListener('DOMContentLoaded', function () {
    // Obtém o nome do usuário armazenado no localStorage e exibe no elemento 'usuarioatual'
    const name = localStorage.getItem('nome_user');
    const usuarioatual = document.getElementById("usuarioatual");
    usuarioatual.textContent = name;

    // Obtém o nome do negócio armazenado no localStorage e exibe no elemento 'negocioatual'
    const nomenegocio = localStorage.getItem('nome_negocio');
    const negocioatual = document.getElementById("negocioatual");
    negocioatual.textContent = nomenegocio;
});

// Espera o DOM carregar para mostrar a lista de clientes
document.addEventListener('DOMContentLoaded', async function mostrarClientes(event) {
    event.preventDefault(); // Previne o comportamento padrão do evento

    // Obtém o ID do usuário relacionado do localStorage
    const usuario_relacionado = localStorage.getItem('id_user');
    let data = { usuario_relacionado };

    // Envia uma requisição POST para o servidor para buscar os clientes
    const response = await fetch('http://localhost:3000/api/store/mostrarClientes', {
        method: 'POST',
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    // Converte a resposta para JSON
    let content = await response.json();

    if (content.success) {
        // Itera sobre os dados dos clientes recebidos
        content.data.forEach(function (mostrar) { // Função mostrar retorna os dados do banco
            // Cria os elementos necessários para exibir os clientes
            const card = document.createElement("div");
            card.classList.add("card");
            const botoes = document.createElement("div");
            botoes.classList.add("botoes");
            const card_total = document.createElement("div");
            card_total.classList.add("card_total");

            // Extrai as informações do cliente
            const nome = mostrar.nome;
            const cpf = mostrar.cpf;
            const email = mostrar.email;
            const telefone = mostrar.telefone;
            const endereco = mostrar.adress;
            const statuscl = mostrar.statuscl;
            const id = mostrar.id; // Ta definindo pras variaveis conforme as informações do banco

            // Cria o conteúdo do cartão do cliente
            const cardContent = `
                <div class="cliente_card" id="cliente_card">
                    <h3>${nome}</h3>
                    <p>CPF: ${cpf}</p>
                    <p>Email: ${email}</p>
                    <p>Telefone: ${telefone}</p>
                    <p>Endereço: ${endereco}</p>
                    <p>Status: ${statuscl}</p>
                </div>
            `;

            // Define o conteúdo HTML dos elementos criados
            card.innerHTML = cardContent;
            botoes.innerHTML = `
                <button class="botao_editar">Editar</button>
                <button class="botao_excluir">Excluir</button>
            `;

            // Adiciona os elementos ao DOM
            interior.appendChild(card_total);
            card_total.appendChild(card);
            card_total.appendChild(botoes);



            // Adiciona evento de clique ao botão "Editar"
            botoes.querySelector('.botao_editar').addEventListener('click', function () {
                // Preenche os campos do formulário com os dados do cliente existente
                document.getElementById('nome').value = nome;
                document.getElementById('cpf').value = cpf;
                document.getElementById('email').value = email;
                document.getElementById('telefone').value = telefone;
                document.getElementById('endereco').value = endereco;
                document.getElementById('status').value = statuscl;
                localStorage.setItem('cliente_id', id); // Armazena o ID do cliente a ser atualizado
                
                // Abre o modal de edição
                let modal_teste = document.getElementById("id01");
                modal_teste.style.display = "block";

                // Configura o botão para edição
                botao_criar_editar.id = 'botao_criar_editar';
                botao_criar_editar.textContent = 'Editar';

                // Remove o evento de clique anterior para evitar criar um card novo
                botao_criar_editar.removeAttribute('onclick', 'handleSubmit(event)');

                // Adiciona um novo evento de clique ao botão de editar
                document.getElementById('botao_criar_editar').addEventListener('click', async function () {
                    // Obtém os valores atualizados dos campos do formulário
                    let updatedNome = document.getElementById('nome').value;
                    let updatedCpf = document.getElementById('cpf').value;
                    let updatedEmail = document.getElementById('email').value;
                    let updatedTelefone = document.getElementById('telefone').value;
                    let updatedEndereco = document.getElementById('endereco').value;
                    let updatedStatus = document.getElementById('status').value;
                    let clienteId = localStorage.getItem('cliente_id'); // Obtém o ID do cliente armazenado

                    // Verifica se os campos obrigatórios foram preenchidos
                    if (!updatedNome || !updatedTelefone) {
                        alert('Preencha os campos obrigatórios (nome e telefone)!');
                        return;
                    }

                    // Prepara os dados para enviar ao servidor
                    const data = {
                        nome: updatedNome,
                        cpf: updatedCpf,
                        email: updatedEmail,
                        telefone: updatedTelefone,
                        endereco: updatedEndereco,
                        status: updatedStatus
                    };

                    try {
                        // Envia a requisição de atualização ao servidor
                        const response = await fetch(`http://localhost:3000/api/store/clientes/${clienteId}`, {
                            method: 'PUT', // Utiliza PUT para atualizar o cliente existente
                            headers: { "Content-type": "application/json;charset=UTF-8" },
                            body: JSON.stringify(data)
                        });

                        let content = await response.json();

                        if (content.success) {
                            alert("Cliente atualizado com sucesso!");
                            modal_teste.style.display = "none"; // Fecha o modal após a atualização
                            location.reload();
                        } else {
                            alert("Erro ao atualizar cliente!");
                        }
                    } catch (error) {
                        console.error('Erro na requisição:', error);
                        alert('Erro ao conectar com o servidor.');
                    }
                });
            });+


                       
            // Adiciona evento de clique ao botão "Excluir"
            botoes.querySelector('.botao_excluir').addEventListener('click', async function () {
                const response = await fetch(`http://localhost:3000/api/store/deletarClientes/${id}`, {
                    method: 'DELETE', // Envia uma requisição para deletar o cliente
                    headers: { 'Content-type': 'application/json;charset=UTF-8' }
                });

                let content = await response.json();

                if (content.success) {
                    alert("SUCESSO AO DELETAR");
                    location.reload(); // Recarrega a página após deletar
                } else {
                    alert("ERRO AO DELETAR");
                }
            });
        });
    }
});

// Adiciona evento de clique ao botão que abre o formulário
let abrir_form = document.getElementById("abrir_form");
abrir_form.addEventListener("click", function () {
    let modal_teste = document.getElementById("id01");
    modal_teste.style.display = "block"; // Exibe o modal de formulário
});

// Adiciona evento de clique ao botão que fecha o formulário
let close = document.getElementById("close");
close.addEventListener("click", function () {
    let modal_teste = document.getElementById("id01");
    modal_teste.style.display = "none"; // Oculta o modal de formulário
});

// Função para tratar o envio do formulário de criação de cliente
async function handleSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do envio do formulário

    // Configura o botão de criação de cliente
    botao_criar_editar.removeAttribute('id'); //Remove o atributo id de editar
    botao_criar_editar.textContent = 'Criar';
    botao_criar_editar.setAttribute('onclick', 'handleSubmit(event)'); // bota a função de criar novamente, invés de editar

    // Obtém os valores dos campos do formulário
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let endereco = document.getElementById("endereco").value;
    let status = document.getElementById("status").value;
    const usuario_relacionado = localStorage.getItem('id_user');

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome || !telefone) {
        alert('Preencha os campos requisitados!');
    } else {
        // Prepara os dados para enviar ao servidor
        const data = {
            nome,
            cpf,
            email,
            telefone,
            endereco,
            status,
            usuario_relacionado
        };
    
        // Envia a requisição POST para criar um novo cliente
        const response = await fetch('http://localhost:3000/api/store/clientes', {
            method: 'POST',
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });
    
        let content = await response.json();
    
        // Verifica se o cliente foi criado com sucesso
        if (content.success) {
            location.reload(); // Recarrega a página após a criação do cliente
        } else {
            alert("Erro ao cadastrar cliente!");
        }
    }
}
