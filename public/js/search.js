$(function(){
    var isSearchFocused = false;
    $('.button-collapse').sideNav({
        closeOnClick: true
    });
    
    $('.collapsible').collapsible();
    
    $('#search-button').click(function(){
        if(isSearchFocused)
        {
            $('#search').focusout();
            isSearchFocused = false;
            return;
        }
        
        $('#banner form').css('display', 'block');
        $('#header').css('display', 'none');
        $('#search').focus();
        isSearchFocused = true;
    });
    
    $('#search').focusout(function(){
        $(this).val('');
        $('#banner form').css('display', 'none');
        $('#header').css('display', 'block');
    });
});