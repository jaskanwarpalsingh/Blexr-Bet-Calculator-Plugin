// script used to append new odd input fields
$(document).on('click','#add-odds',function(){
    if($('.odds').length<10) {
        $('#odds-container').append('<div class="single-odd"><input type="text" class="odds" name="odds[]"><a href="javascript:void(0);" class="remove-input">x</a></div>');
    }
});

// on change event fired to execute the calculator functionality
$(document).on('change','.odds, #odds_format, #stake',function(){
    if($('#stake').val()) {
        updateFormattedValues();
        calculate();
    }
});

// script used to avoid the letters to type in input fields
$(document).on('keypress','#stake,.odds',function(e){
    var charCode = (e.which) ? e.which : e.keyCode;
    if (String.fromCharCode(charCode).match(/[^0-9]/g)) {
        return false;
    }
});

// script used to remove the appended odds related fields in the list
$(document).on('click','.remove-input',function () {
    $(this).parent('.single-odd').remove();
    updateFormattedValues();
    calculate();
});

// script used to hit the filter action to change the data table values as per user's requirement
$(document).on('click','#filter', function () {
    var sport = $('#sport').val();
    var region = $('#region').val();
    var market = $('#market').val();
    fetchOddsData(sport, region, market);
});

// script used to reset the form
$(document).on('click','#clear', function (){
    $('.remove-input').trigger('click');
    $('.odds,#stake').val('');
    $('#amount').text('0');
});