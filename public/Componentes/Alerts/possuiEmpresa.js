qtdEmpresas = localStorage.qtdEmpresas;
if (qtdEmpresas == 0) {
    // alert("O Usuário não possui empresas, Redirecionando para Tela de Empresas!")
    Swal.fire({
        icon: "error",
        title: "Opa...",
        text: 'O Usuário não possui uma empresa cadastrada! ',
        showConfirmButton: true,
        confirmButtonText: "Cadastrar uma Empresa!"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = "../Empresas/empresas.html"
        }
    });
}