$(document).ready(function(){   
    //datepicker
    var numMonth;
    var datepickerLoad = {
        init: function(){
            numMonth = 12;
            $('.datepickerArea .load').datepicker({
                showButtonPanel: false,
                numberOfMonths: numMonth,
                //minDate: toDate,
                //maxDate: "+0m",                
                closeText: "닫기",
                prevText: "이전달",
                nextText: "다음달",
                currentText: "오늘",
                monthNames: [ "01","02","03","04","05","06","07","08","09","10","11","12" ],
                monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12" ],
                dayNames: [ "일요일","월요일","화요일","수요일","목요일","금요일","토요일" ],
                dayNamesShort: [ "(일)","(월)","(화)","(수)","(목)","(금)","(토)" ],
                dayNamesMin: [ "일","월","화","수","목","금","토" ],
                weekHeader: "주",
                dateFormat: "y.mm.dd D",
                firstDay: 0,
                isRTL: false
            });
        }
    }
    datepickerLoad.init();
});