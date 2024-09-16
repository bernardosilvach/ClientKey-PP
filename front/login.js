
var botaologin = document.getElementById('botaologin')

botaologin.onclick = async function(e) {
    e.preventDefault()


    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value

    if (!email || !senha) {
        alert('Preencha todos os campos!')
        return false
    } else {
        let data = {email,senha}

        const response = await fetch('http://localhost:3000/api/store/login', {
            method: 'POST',
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        })

        let content = await response.json()

        if (content.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login feito com sucesso!",
                showConfirmButton: false,
                timer: 1500
              });

            console.log(content)

            const UserId = content.data[0].id
            localStorage.setItem('id_user', UserId)

            const NomeUser = content.data[0].nome
            localStorage.setItem('nome_user', NomeUser)

            const NomeNegocio = content.data[0].nomenegocio
            localStorage.setItem('nome_negocio', NomeNegocio)
            console.log(NomeNegocio)

            setTimeout(function(){
                window.location.href = 'principal.html'
            }, 1500)
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Erro no login!",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
}

document.getElementById('botaocadastrar').addEventListener('click', function() {
    window.location.href = 'cadastro.html';
});