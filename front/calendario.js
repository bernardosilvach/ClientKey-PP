function gerarCalendario() {
    const calendarioDiv = document.getElementById('calendario');
    const dataAtual = new Date(); // Obtém a data atual para calcular o ano, mês e dia.
    const anoAtual = dataAtual.getFullYear(); 
    const mesAtual = dataAtual.getMonth();    // Mês atual (0 a 11).
    const diaAtual = dataAtual.getDate();     // Dia do mês atual.

    // Array com os nomes abreviados dos dias da semana.
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    // Determina o último dia do mês atual.
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    // Determina o dia da semana do primeiro dia do mês atual (0 para Domingo).
    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();

    // Obtém o nome do mês no formato "long" em português.
    const nomeMes = dataAtual.toLocaleString('pt-BR', { month: 'long' });

    // Define o título do calendário (exemplo: "Novembro 2024").
    calendarioDiv.innerHTML = `<h2>${nomeMes} ${anoAtual}</h2>`;

    // Cria os cabeçalhos dos dias da semana.
    const diasSemanaDiv = document.createElement('div');
    diasSemanaDiv.classList.add('dias-semana'); // Classe CSS para estilização.

    // Adiciona os dias da semana ao cabeçalho.
    diasSemana.forEach(dia => {
        const diaDiv = document.createElement('div');
        diaDiv.textContent = dia; // Define o texto do dia (ex.: "Seg").
        diasSemanaDiv.appendChild(diaDiv); // Adiciona ao contêiner.
    });
    calendarioDiv.appendChild(diasSemanaDiv); // Adiciona ao calendário.

    // Cria o contêiner para os dias do mês.
    const diasDiv = document.createElement('div');
    diasDiv.classList.add('dias'); // Classe CSS para os dias do mês.

    // Adiciona espaços vazios para os dias anteriores ao início do mês.
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const emptyDiv = document.createElement('div'); // Div vazia.
        diasDiv.appendChild(emptyDiv); // Adiciona ao contêiner de dias.
    }

    // Preenche os dias do mês.
    for (let dia = 1; dia <= ultimoDiaMes; dia++) {
        const diaDiv = document.createElement('div');
        diaDiv.textContent = dia; // Define o número do dia.

        diaDiv.classList.add('dia'); // Classe CSS para estilização.

        // Destaca o dia atual com a classe 'hoje'.
        if (dia === diaAtual) {
            diaDiv.classList.add('hoje');
        }

        diasDiv.appendChild(diaDiv); // Adiciona o dia ao contêiner.
    }

    // Adiciona o contêiner de dias ao calendário.
    calendarioDiv.appendChild(diasDiv);
}

document.addEventListener('DOMContentLoaded', gerarCalendario);