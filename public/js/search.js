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
    
    var isFetched = false;
    $('#search').keyup(function(){
        var query = $(this).val();
        
        if(query.length === 0)
        {
            $('#main').css('display','block');
            $('#search-results .row').empty();
            isFetched = false;
        }
        
        if(query.length < 3)
        {
            return;
        }
        
        if(isFetched)
        {
            var queryRegex = new RegExp(query,'g');
            $('#search-results .row').children().each(function(){
                if(!queryRegex.test($(this).data('title')))
                {
                    $(this).css('display','none');
                    return;
                }
                $(this).css('display','block');
            });
        }
        
        var queryString = '/api/v1/manga/search?title=' + query;
        if(!isFetched)
        {
            isFetched = true;
            $.getJSON(queryString, function(data){
                var stringToAppend = '';
                for(var i = 0; i < data.length; i++)
                {
                    stringToAppend += '<div class="col l2" data-title="'+ data[i].title +'"><a href="/manga/'+ data[i].title.replace(/ /g,'_') +'"><img height="150" width="240" class="responsive-img" src="'+ data[i].coverUrl +'"></a></div>';
                }
                $('#main').css('display','none');
                $('#search-results .row').append(stringToAppend);
            });
        }
    });
});