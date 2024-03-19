$(document).ready(function(){
    // $(window).on('load',function(){
        // alert(123)
    var heightNavbar = $('.navbar').outerHeight();
    // alert(heightNavbar)
    $('.blog-about').css('height','calc(100vh - '+heightNavbar+'px)');
    $('.blog-about').css('margin-top',heightNavbar+'px');
    // })

    $('body').on('click','.bi-justify-left',function(){
        $('.navbar-collapse').css('top','60px');
        $('.navbar-collapse').css('left','0');
        $('.bi-justify-left').addClass('bi-x-lg');
        $('.bi-justify-left').removeClass('bi-justify-left');
    })
    $('body').on('click','.bi-x-lg',function(){
        $('.navbar-collapse').css('top','-100%');
        $('.navbar-collapse').css('left','-100%');
        $('.bi-x-lg').addClass('bi-justify-left');
        $('.bi-x-lg').removeClass('bi-x-lg');
    })
    
});