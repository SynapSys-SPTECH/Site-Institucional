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

function verificarPossuiEmpresa(){
    qtdEmpresas = localStorage.qtdEmpresas;

    if(qtdEmpresas == 0){
        alert("O Usuário não possui empresas, Redirecionando para Tela de Empresas!")
        
        // Aqui temos que substituir pelo sweet alert


        window.location = "../Empresas/empresas.html"
    } else{
        console.log("O Usuário possui "+ qtdEmpresas +" empresas!")
    }

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