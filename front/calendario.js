function gerarCalendario() {
    const calendarioDiv = document.getElementById('calendario');
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();

    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();

    // Título do mês
    const nomeMes = dataAtual.toLocaleString('pt-BR', { month: 'long' });
    calendarioDiv.innerHTML = `<h2>${nomeMes} ${anoAtual}</h2>`;

    // Dias da semana
    const diasSemanaDiv = document.createElement('div');
    diasSemanaDiv.classList.add('dias-semana');
    diasSemana.forEach(dia => {
        const diaDiv = document.createElement('div');
        diaDiv.textContent = dia;
        diasSemanaDiv.appendChild(diaDiv);
    });
    calendarioDiv.appendChild(diasSemanaDiv);

    // Dias do mês
    const diasDiv = document.createElement('div');
    diasDiv.classList.add('dias');
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const emptyDiv = document.createElement('div');
        diasDiv.appendChild(emptyDiv);
    }
    for (let dia = 1; dia <= ultimoDiaMes; dia++) {
        const diaDiv = document.createElement('div');
        diaDiv.textContent = dia;
        diaDiv.classList.add('dia');
        if (dia === diaAtual) {
            diaDiv.classList.add('hoje');
        }
        diasDiv.appendChild(diaDiv);
    }
    calendarioDiv.appendChild(diasDiv);
}

// Chama a função para gerar o calendário após o carregamento do DOM
document.addEventListener('DOMContentLoaded', gerarCalendario);
