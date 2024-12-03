function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = (sessionStorage.NOME_USUARIO);

    // Verificando se está nulo, assim precisa fazer login.
    if (email != null && nome != null) {
        var usernameValue = sessionStorage.NOME_USUARIO;
        document.getElementById('username').textContent = usernameValue;
    } else {
        window.location = "../Login/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}