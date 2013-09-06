$(function(){
    var addressFields = $('[name="address"],[name="city"],[name="state"]').closest('tr');
    $('[name="country"]').change(function(){
        var theCountry =$(this).val();
        if(theCountry=="Can"){
            $('[name="zip"]').removeAttr('pattern maxlength');
            addressFields.fadeIn();
        } else if (theCountry=="US"){
            $('[name="zip"]').attr({
                'pattern':'[0-9]*',
                'maxlength':5
            });
        };
    });

    addressFields.hide();
    $('.zip-error').hide();
    $("#zip").keyup(function(){
        var el = $(this);
        if ((el.val().length==5)&& (is_int(el.val()))) {
            // Make AJAX call
            $.ajax({
                url: "http://zip.elevenbasetwo.com",
                cache: false,
                dataType: "json",
                type: "GET",
                data: "zip=" + el.val(),
                success: function(result,success){
                    addressFields.fadeIn();
                    $('[name="city"]').val(result.city);
                    $('[name="state"]').val(result.state);
                    $('.zip-error').hide();
                    $('[name="address"]').focus();
                },
                error: function(result,success){
                    $('.zip-error').show();
                }
            });
        }
    });
    function is_int(value){
        if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
            return true;
        } else {
            return false;
        }
    }
});/**
 * Created with JetBrains PhpStorm.
 * User: nelson-dooleyj
 * Date: 9/6/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */
