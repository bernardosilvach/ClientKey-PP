// Obtém o elemento do botão com o ID "abrir_form"
let abrir_form = document.getElementById("abrir_form");

// Adiciona um listener de evento de clique ao botão "abrir_form"
abrir_form.addEventListener("click", function () {
    // Obtém o elemento modal com o ID "id01"
    let modal_teste = document.getElementById("id01");

    // Exibe o modal definindo seu estilo de display como "block"
    modal_teste.style.display = "block";
});

// Obtém o elemento do botão com o ID "close"
let close = document.getElementById("close");

// Adiciona um listener de evento de clique ao botão "close"
close.addEventListener("click", function () {
    // Obtém o elemento modal com o ID "id01"
    let modal_teste = document.getElementById("id01");

    // Oculta o modal definindo seu estilo de display como "none"
    modal_teste.style.display = "none";
});

// Define uma função assíncrona para lidar com o envio do formulário
async function handleSubmit(event) {
    // Previne o comportamento padrão de envio do formulário
    event.preventDefault();

    // Obtém os valores dos inputs do formulário
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let endereco = document.getElementById("endereco").value;
    let status = document.getElementById("status").value;

    // Cria um objeto com os dados do formulário
    const data = {
        nome,
        cpf,
        email,
        telefone,
        endereco,
        status
    };

    // Envia uma requisição POST para a URL especificada com os dados do formulário
    const response = await fetch('http://localhost:3000/api/store/clientes', {
        method: 'POST',
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    // Converte a resposta para JSON
    let content = await response.json();

    // Verifica se a resposta indica sucesso
    if (content.success) {
        // Cria um novo elemento div para o cartão
        var card = document.createElement("div");
        card.classList.add("card"); // Adiciona a classe 'card' ao elemento

        // Define o conteúdo HTML do cartão com os dados do formulário
        card.innerHTML = `
            <h3>${nome}</h3>
            <p>CPF: ${cpf}</p>
            <p>Email: ${email}</p>
            <p>Telefone: ${telefone}</p>
            <p>Endereço: ${endereco}</p>
            <p>Status: ${status}</p>
        `;

        // Adiciona o cartão ao elemento com a classe "interiorbaixo"
        document.querySelector(".interiorbaixo").appendChild(card);

        // Reseta o formulário
        document.getElementById("myForm").reset();

        // Oculta o modal
        let modal_teste = document.getElementById("id01");
        modal_teste.style.display = 'none';
    } else {
        // Alerta o usuário em caso de erro
        alert("Erro ao cadastrar cliente!");
    }
}
