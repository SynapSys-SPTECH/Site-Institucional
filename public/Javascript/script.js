$(document).ready(function(){
    $('#btn_mobile').on('click', function() {
        $('#mobile_menu').toggleClass('active')
        $('#btn_mobile').find('i').toggleClass('fa-x')
    });
});