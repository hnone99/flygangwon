//레이어 팝업
var popup = {
    init: function(){
        var myScrollTop;
        $(document).off("click", "[data-event='popup-open']").on("click", "[data-event='popup-open']", function(e) {
            e.preventDefault();

            myScrollTop = $(window).scrollTop();

            var target = $(this).attr('data-target');
            var targetWrap = $(target).find('.popup-wrap');

            $(target).show();
            $(targetWrap).css({
                'margin-left' : -($(targetWrap).outerWidth() / 2),
                'margin-top' : -($(targetWrap).outerHeight() / 2)
            });
            $("body").css({"overflow": "hidden"});
        });
        $(document).off("click", "[data-event='popup-close']").on("click", "[data-event='popup-close']", function(e) {
            e.preventDefault();
            $(this).closest('.popup').fadeOut(150);
            $("body").css({"overflow": "auto"});
        });

    },
    open: function(t){
        var target = t;
        var targetWrap = $(target).find('.popup-wrap');

        $(target).show();
        $(targetWrap).css({
            'margin-left' : -($(targetWrap).outerWidth() / 2),
            'margin-top' : -($(targetWrap).outerHeight() / 2)
        });
        $("body").css({"overflow": "hidden"});
    },
    resize: function(t, h){
        var target = t;
        var height = h;
        var targetWrap = $(target).find('.popup-wrap');

        $(targetWrap).css({
            'height' : height,
            'margin-left' : -($(targetWrap).outerWidth() / 2),
            'margin-top' : -(height / 2)
        });
    },
    close: function(t) {
        var target = t;

        $(target).fadeOut(150);
        $("body").css({"overflow": "auto"});
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
    //gnb
    //191224 추가 시작
    var _t = 0;
    $('#gnb .dep1 > li > ul').each(function () {
        $this = $(this);
        if ($(this).outerHeight() > _t ) {
            _t = $(this).outerHeight();
        }
    });
    $('#header .bg, #gnb .dep2').css('height', _t);
    //191224 추가 끝
    $('#gnb .dep1 > li').on('mouseenter',function(){
        $('#header').addClass('hover');
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    });
    $('#gnb .dep1 > li > a').on('focus',function(){
        $('#header').addClass('hover');
        $(this).parent().siblings('li').removeClass('active');
        $(this).parent().addClass('active');
    });
    $('#gnb, #header .bg').on('mouseleave',function(){
        $('#header').removeClass('hover');
        $('#gnb .dep1 > li').removeClass('active');
    });
    $('#header .bg').on('mouseenter',function(){
        $('#header').addClass('hover');
    });

    $('#gnb .dep2').on('mouseenter',function(){
        $('#gnb .dep1 > li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

    //location
    $('#location .inner > div > a').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        $thisDiv = $(this).parent();
        $thisDiv.siblings().removeClass('on');
        if($thisDiv.hasClass('on')){
            $thisDiv.removeClass('on');
        }else{
            $thisDiv.addClass('on');
        }
    });
    //바깥 클릭시 location 닫기
    $(document).click(function(e){
        $('#location .inner > div').removeClass('on');
    });

    //전체메뉴
    $('#allmenu a').on('click',function(e){
        e.preventDefault();
        $('body').toggleClass('in');
    });
    $('.allmenuWrap .dep2 button').on('click',function(e){
        e.preventDefault();
        $(this).parent('li').toggleClass('active');
    });

    //예매 top
    if($('#top').size() > 0){
        //top sticky
        var topOffsetTop = $('#top').position().top;
        $(window).scroll(function(){
            if ($(window).scrollTop() > topOffsetTop) {
                $('html').addClass('topFixed');
            }
            else {
                $('html').removeClass('topFixed');
            }
        });
        //항공운임등 총액 상세보기
        $('#top .total a').on('click',function(e){
            e.preventDefault();
            $('#top').toggleClass('open');
        });
        //재검색 영역 toggle
        $('.search a').on('click',function(e){
            e.preventDefault();
            $('#top').addClass('active');
        });
        $('.reInquiryWrap .close a').on('click',function(e){
            e.preventDefault();
            $('#top').removeClass('active');
        });
    }

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

    //190729 추가
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
});