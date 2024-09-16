let botao = document.getElementById('botaocadastrar');

botao.onclick = async function(e) {
    e.preventDefault();

    var email = document.getElementById('email').value;
    var nome = document.getElementById('nome').value;
    var cpf = document.getElementById('cpf').value;
    var senha = document.getElementById('senha').value;
    var nomenegocio = document.getElementById('nomenegocio').value;

    if (!email || !nome || !cpf || !senha || !nomenegocio) {
        alert('Preencha todos os campos!');
        return false;
    } else {
        let data = {nome,cpf,email,senha,nomenegocio};

        const response = await fetch('http://localhost:3000/api/store/users', {
            method: 'POST',
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        })

        let content = await response.json()

        if (content.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cadastro feito com sucesso!",
                showConfirmButton: false,
                timer: 1500
              });

            setTimeout(function(){
                window.location.href = 'login.html'
            }, 1500)
            
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Erro no cadastro!",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
}