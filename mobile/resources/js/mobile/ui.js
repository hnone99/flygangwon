//레이어 팝업
var popup = {
    init: function(){
        var myScrollTop;
        $(document).off("click", "[data-event='popup-open']").on("click", "[data-event='popup-open']", function(e) {
            e.preventDefault();

            myScrollTop = $(window).scrollTop();
            $('body').addClass('fixed');

            var target = $(this).attr('data-target');
            $(target).show();            
           
        });
        $(document).off("click", "[data-event='popup-close']").on("click", "[data-event='popup-close']", function(e) {
            e.preventDefault();
            $(this).closest('.popup').fadeOut(150);
            $('body').removeClass('fixed');
            $(window).scrollTop(myScrollTop);
        });

    },
    open: function(t){
        myScrollTop = $(window).scrollTop();
        $('body').addClass('fixed');

        var target = t;
        $(target).show();
    },
    resize: function(t, h){
        /*var target = t;
        var height = h;
        var targetWrap = $(target).find('.popup-wrap');*/
    },
    close: function(t) {
        var target = t;
        $(target).fadeOut(150);
        $('body').removeClass('fixed');
        $(window).scrollTop(myScrollTop);
    }
}

//alert
var alertCustom = {
    init: function(){
        $('[data-event="alert-open"]').on('click',function(e){
            e.preventDefault();

            var target = $(this).attr('data-target');
            var targetWrap = $(target).find('.alert-wrap');

            $(target).show();
        });
        $('[data-event="alert-close"]').on('click',function(e){
            e.preventDefault();
            $(this).closest('.alert').hide();
        });
    }
}

$(document).ready(function(){
    $(window).resize(function(){
    });

    //전체메뉴
    $('#allmenu a').on('click',function(e){
        e.preventDefault();
        $('body').toggleClass('in');
    });
    $(document).on('click','.allmenuWrap .dep1 > li > div > a',function(e){
        //191105 메뉴 펼침 방식 수정 및 스크롤 이동
        var _target = $(this).closest('li');
        if(!_target.hasClass('home')){
            e.preventDefault();
            if(_target.hasClass('active')){
                _target.removeClass('active')
            }
            else{
                _target.siblings().removeClass('active')
                var _scrollTop = parseInt(_target.offset().top) - parseInt($('.allmenuWrap .toparea').outerHeight())
                _target.addClass('active');
                $('.allmenuWrap').stop().delay(100).animate({
                    'scrollTop': _scrollTop
                }, 150, 'swing');
            }
        }
    });

    //예매 top
    if($('#top').size() > 0){
        if($('#top .dateReselect').size() < 1){
            //top sticky
            var topOffsetTop = $('#top .total').offset().top;
            $(window).scroll(function(){
                if ($(window).scrollTop() > topOffsetTop) {
                    $('html').addClass('topFixed');
                }
                else {
                    $('html').removeClass('topFixed');
                }
            });
        }        
    }
    //항공운임등 총액 상세보기
    $('#top .total a').on('click',function(e){
        e.preventDefault();
        $('html').toggleClass('summeryOpen');
    });
    $('#top .dim').on('click',function(e){
        e.preventDefault();
        $('html').removeClass('summeryOpen');
    });
    //탑승객별 상세 운임 보기
    $('.btnPayDetail a').on('click',function(e){
        e.preventDefault();
        $('#summery').toggleClass('detailOpen');
        $('#summery .scrollArea').stop().delay(100).animate({
            'scrollTop': $('.btnPayDetail').position().top
        }, 350, 'swing');
    });

    //나이 계산기 토글
    $('.calculatorBtn').on('click',function(){
        $('.calculatorArea').toggleClass('on');
    });

    //공유 버튼
    $('.share > a').on('click',function(e){
        e.preventDefault();
        $('.share').toggleClass('on');
    });
    $('.shareIcons .close').on('click',function(e){
        e.preventDefault();
        $('.share').removeClass('on');
    });

    popup.init();
    alertCustom.init();

    //이메일 도메인 셀렉트 토글
    $(document).on("change", ".emailDomainSelect", function() {
        if($(this).val() === "직접입력") {
            $(this).hide();
            $(this).siblings(".emailDomain").show();
            $(".emailInputWrapper").children("input[type=email]").val("");
        } else {
            $(".emailInputWrapper").children("input[type=email]").val($(this).val());
        }
    });
    $(document).on("click", ".emailRefrash", function() {
        $(this).parent(".emailInputWrapper").hide();
        $(this).parent(".emailInputWrapper").siblings(".emailDomain").show();
        $(this).parent(".emailInputWrapper").children("input[type=email]").val("");
        $(".emailDomain").val("");
    });
    
    //언어 선택 토글
    $('#header .language > a').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.languageMenu').toggle();
    });
    //바깥 클릭시 location 닫기
    $(document).click(function(e){
        $('.languageMenu').hide();
    });
    
    //서브메뉴 토글
    $('h2.has-subMenu span').on('click',function(){
        $('body').toggleClass('subMenu-open');
        $('body').toggleClass('fixed');
    });
    //dim 클릭시 서브메뉴 닫기
    $('.subMenu').on('click',function(){ 
        $('body').removeClass('subMenu-open'); 
        $('body').removeClass('fixed');
    });
    $('.subMenu > ul a').on('click',function(e){
        e.stopPropagation();
    });
    $('.subMenu .close a').on('click',function(e){
        $('body').removeClass('subMenu-open'); 
        $('body').removeClass('fixed');
    });
    
    //list-group 안의 라디오
    $('[data-event="in-list-group"]').on('click',function(e){
        $(this).closest('.list-group-item').siblings().removeClass('active');
        $(this).closest('.list-group-item').addClass('active');
    });
    
    //서브 텍스트 탭
    $('.tabText a').on('click',function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        $(this).parent('li').siblings().removeClass('on');
        $(this).parent('li').addClass('on');
        $(target).siblings('.tabView').hide();
        $(target).show();
    });
    
    $('#btnTransit').on('click',function(e){
        e.preventDefault();
        $('.layerTransit').toggle();
    });
    $('.layerTransit .close').on('click',function(e){
        e.preventDefault();
        $('.layerTransit').hide();
    });
});