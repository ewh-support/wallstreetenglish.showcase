$(document).ready(function(){
    $('.open-box').click(function(){
        $(this).next().toggleClass('active');
    });
    $('.close-box').click(function(){
        $(this).parent().removeClass('active');
    })
});