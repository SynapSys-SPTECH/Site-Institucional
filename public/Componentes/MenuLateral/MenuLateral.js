function createNavbar() {
    // Criação do elemento nav
    const navbar = document.createElement('nav');
    navbar.classList.add('nav-bar-lateral');

    // Criação da logo e título
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('logo-synapsys');

    const logoImg = document.createElement('img');
    logoImg.src = '../images/Icon-SynapSys.svg';
    logoImg.alt = 'Logo';

    const titulo = document.createElement('p');
    titulo.classList.add('titulo');
    titulo.textContent = 'SynapSYS';

    const nome = document.createElement('p');
    nome.classList.add('nome');
    nome.textContent = 'Seu nome?';

    // Adiciona os elementos ao div logoDiv
    logoDiv.appendChild(logoImg);
    logoDiv.appendChild(document.createElement('br'));
    logoDiv.appendChild(titulo);
    logoDiv.appendChild(document.createElement('br'));
    logoDiv.appendChild(nome);

    // Criação do div para os botões
    const botoesDiv = document.createElement('div');
    botoesDiv.classList.add('botoes');

    // Adiciona a linha horizontal
    botoesDiv.appendChild(document.createElement('hr'));

    // Função para criar cada botão
    function createButton(id, imgSrc, imgAlt, href, text) {
        const buttonDiv = document.createElement('div');
        buttonDiv.id = id;
        buttonDiv.classList.add('hover');

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = imgAlt;

        const link = document.createElement('a');
        link.href = href;
        link.classList.add('buttom-navbar');
        link.textContent = text;

        // Adiciona a imagem e o link ao div do botão
        buttonDiv.appendChild(img);
        buttonDiv.appendChild(link);

        return buttonDiv;
    }

    // Criação dos botões
    const dashboardButton = createButton('dashboard-button', '../images/chart-line-svgrepo-com.svg', 'Cnpj', '../Dashboard/dashboard.html', 'Dashboard');
    const empresaButton = createButton('cadastro-empresa', '../images/company-svgrepo-com.svg', 'Cnpj', '../Empresas/empresas.html', 'Empresas');
    const propriedadeButton = createButton('cadastro-propriedade', '../images/brazil-svgrepo-com.svg', 'territorio', '../Propriedades/propriedades.html', 'Propriedades');
    const contaButton = createButton('config-conta', '../images/account-svgrepo-com.svg', 'Account', '../Conta/conta.html', 'Conta');

    // Adiciona os botões ao div botoesDiv
    botoesDiv.appendChild(dashboardButton);
    botoesDiv.appendChild(empresaButton);
    botoesDiv.appendChild(propriedadeButton);
    botoesDiv.appendChild(contaButton);

    // Adiciona outra linha horizontal
    botoesDiv.appendChild(document.createElement('hr'));

    // Criação do botão de sair
    const sairButton = createButton('sair', '../images/exit-svgrepo-com.svg', 'Sair', '#', 'Sair');
    botoesDiv.appendChild(sairButton);

    // Adiciona todos os elementos à navbar
    navbar.appendChild(logoDiv);
    navbar.appendChild(botoesDiv);

    return navbar;
}

// Função para inserir a navbar na página
function insertNavbar() {
    const navbar = createNavbar();
    document.body.prepend(navbar); // Adiciona a navbar no início do body
}

// Chama a função para inserir a navbar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', insertNavbar);
