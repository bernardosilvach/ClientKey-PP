// Captura o campo de pesquisa
const barraPesquisa = document.getElementById('barrapesquisa');

// Função para filtrar clientes com base no texto da pesquisa
function filtrarClientes() {
    const termoPesquisa = barraPesquisa.value.toLowerCase(); // Obtém o valor da pesquisa
    const clientes = document.querySelectorAll('.card_total'); // Seleciona todos os clientes exibidos

    clientes.forEach(function (cliente) {
        const nomeCliente = cliente.querySelector('h3').textContent.toLowerCase(); // Obtém o nome do cliente
        const cpfCliente = cliente.querySelector('p:nth-child(2)').textContent.toLowerCase(); // CPF
        const emailCliente = cliente.querySelector('p:nth-child(3)').textContent.toLowerCase(); // Email

        // Verifica se o termo da pesquisa corresponde ao nome, CPF ou email
        if (nomeCliente.includes(termoPesquisa) || cpfCliente.includes(termoPesquisa) || emailCliente.includes(termoPesquisa)) {
            cliente.style.display = ''; // Exibe o cliente que corresponde à busca
        } else {
            cliente.style.display = 'none'; // Oculta o cliente que não corresponde à busca
        }
    });
}

// Adiciona um evento de input na barra de pesquisa
barraPesquisa.addEventListener('input', filtrarClientes);
