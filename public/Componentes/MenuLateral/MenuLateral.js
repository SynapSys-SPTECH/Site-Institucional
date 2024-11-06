const menuLateral = document.createElement('div');
menuLateral.className = 'menu_lateral';

const title = document.createElement('h3');
title.textContent = 'Empresa';
menuLateral.appendChild(title);

const menuList = document.createElement('ul');

function createMenuItem(href, imgSrc, text) {
    const link = document.createElement('a');
    link.href = href;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = '';

    const listItem = document.createElement('li');
    listItem.textContent = text;

    link.appendChild(img);
    link.appendChild(listItem);

    return link;
}

const items = [
    { href: '../Dashboard/dashboard.html', imgSrc: '../images/chart-svgrepo-com.svg', text: 'Dashboard' },
    { href: '../Empresas/empresas.html', imgSrc: '../images/company-svgrepo-com.svg', text: 'Empresas' },
    { href: '../Propriedades/propriedades.html', imgSrc: '../images/brazil-svgrepo-com.svg', text: 'Propriedades' },
    { href: '../Conta/conta.html', imgSrc: '../images/account-svgrepo-com.svg', text: 'Conta' },
    { href: '', imgSrc: '../images/exit-svgrepo-com.svg', text: 'Sair' }
];

items.forEach(item => {
    const menuItem = createMenuItem(item.href, item.imgSrc, item.text);
    menuList.appendChild(menuItem);
});

menuLateral.appendChild(menuList);

document.body.appendChild(menuLateral);
