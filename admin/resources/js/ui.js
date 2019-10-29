function leftMenu() {
    $('.depth1 > li > a').on('click',function(e){
        e.preventDefault();
        $('.depth1 > li').removeClass('on');
        $(this).parent('li').addClass('on');
    });
    $('.depth2 > li > a, .depth3 > li > a').on('click',function(e){
        if($(this).siblings().size() > 0){
            e.preventDefault();
            $(this).siblings('ul').toggle();                    
        }
    });
}

var popup = {
    init: function(){        
        $('[data-event="popup-open"]').on('click',function(e){
            e.preventDefault();

            var target = $(this).attr('data-target');
            var targetWrap = $(target).find('.popup-wrap');

            $(target).show();
            $(targetWrap).css({
                //'margin-top' : -($(targetWrap).outerHeight() / 2),
                'margin-left' : -($(targetWrap).outerWidth() / 2)
            });
        });
        $('[data-event="popup-close"]').on('click',function(){
            $(this).closest('.popup').fadeOut(150);
        });
    }
}

$(document).ready(function($){
    leftMenu();
    popup.init();
    
    $('input.calendar').datepicker({
        dateFormat : "yy-mm-dd"
    });
    
    // grid 테이블 셀 클릭시 십자 표시
    $('.cellFocus td').on('click',function(){
        $('.cellFocus td').removeClass('highlight');
        $('.cellFocus td').removeClass('self');
        var idx = $(this).index()
        $(this).addClass('self');
        $(this).siblings().addClass('highlight');
        $(this).closest('tr').siblings().each(function(){
            $(this).find('td').eq(idx).addClass('highlight'); 
        });
    });
});