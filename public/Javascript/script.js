$(document).ready(function () {
    $('#btn_mobile').on('click', function () {
        $('#mobile_menu').toggleClass('active')
        $('#btn_mobile').find('i').toggleClass('fa-x')
    });

    const sections = $('section');
    const navItens = $('.item-NavList');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();
        let activeSectionIndex = 0;
        if (scrollPosition <= 0) {

            header.css('box-shadow', 'none');
        }
        else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function (i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }


        });

        navItens.removeClass('active');
        $(navItens[activeSectionIndex]).addClass('active');


    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%',
        reset: true,
    });

    ScrollReveal().reveal('.cliente', {
        origin: 'left',
        duration: 2000,
        distance: '20%',
        reset: true,
    });

    ScrollReveal().reveal('#wind-detalhes', {
        origin: 'left',
        duration: 1000,
        distance: '20%',
        reset: true,
    });

    ScrollReveal().reveal('.info', {
        origin: 'right',
        duration: 1000,
        distance: '20%',
        reset: true,
    });

    ScrollReveal().reveal('.dev-photo', {
        origin: 'bottom',
        duration: 2000,
        distance: '40%',
        reset: true,
    });
});