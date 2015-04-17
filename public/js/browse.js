var Browse = function(genres, mangaStatus, chapterMin, chapterMax)
{
    this.genres = [];
    this.mangaStatus = [];
    this.chapterMin = Number.MAX_VALUE;
    this.chapterMax = Number.MIN_VALUE;
};

Browse.prototype = {
    hide: function(list, style)
    {
        var browseObject = this;
        $('#' + list).children().each(function(){
            if(browseObject.genres.length !== 0 && !isEqual( $(this).data('genres').split(" "), browseObject.genres ))
            {
                $(this).css('display','none');
                return;
            }

            if(browseObject.mangaStatus.length !== 0 && !isEqual( $(this).data('status').split(" "), browseObject.mangaStatus ))
            {
                $(this).css('display','none');
                return;
            }

            var numOfChapters = $(this).data('numOfChapters');
            if((browseObject.chapterMin !== Number.MAX_VALUE && browseObject.chapterMax !== Number.MIN_VALUE) && (numOfChapters <= browseObject.chapterMin || numOfChapters >= browseObject.chapterMax))
            {
                $(this).css('display','none');
                return;
            }
            
            $(this).css('display','block');
        });
    },
    
    show: function(list)
    {
        this.hide(list, 'block');
    },
    
    sort: function(compare)
    {
        $('#results').children().sort(compare);
    }
};

function isEqual(a,b)
{
    for(var i = 0; i < b.length; i++)
    {
        if(a.indexOf(b[i]) < 0)
        {
            return false;
        }
    }
    return true;
}

var browse;

if($('#results').is(':visible'))
{
    $.get('/api/v1/manga/search', function(data){
        for(var i = 0; i < data.length; i++)
        {
            $('#results').append(
                '<div data-status="'+ data[i].status +'" data-genres="'+ data[i].genres.join(" ") +'" data-title="'+ data[i].title.replace(' ','_') +'" data-num-of-chapters="'+ data[i].numOfChapters +'" data-views="'+ data[i].views.total +'" data-date="'+ data[i].updated_at +'" class="col s12 m4 l3">' + 
                    '<a href="/manga/'+ data[i].title.replace(' ','_') +'"><img height="190" width="250" class="responsive-img" src="'+ data[i].coverUrl +'"></img><span class="center-align">'+ data[i].title +'</span><br><span class="center-align">'+ data[i].genres.toString() +'</span><br><span class="center-align">'+ data[i].numOfChapters +'</span><br><span class="center-align">'+ data[i].status +'</span><br><span class="center-align">'+ data[i].views.total +'</span><br><span class="center-align">'+ data[i].updated_at +'</span></a>' +
                '</div>'
            );
        }
        browse = new Browse();
    });
}

$('#filter li').click(function(){
    $(this).toggleClass('red-text lighten-1');
});

$('#filter-genres li').click(function(){
    var selectedGenre = $(this);
    if(selectedGenre.hasClass('red-text'))
    {
        if(browse.genres.indexOf(selectedGenre.attr('value')) === -1)
        {
            browse.genres.push(selectedGenre.attr('value'));
        }
    }
    else
    {
        var value = selectedGenre.attr('value');
        browse.genres = browse.genres.filter(function(elem){
            return elem !== value;
        });
    }
    browse.hide('results');
});

$('#filter-status li').click(function(){
    if($(this).hasClass('red-text'))
    {
        if(browse.mangaStatus.indexOf($(this).attr('value')) === -1)
        {
            browse.mangaStatus.push($(this).attr('value'));
        }
    }
    else
    {
        var value = $(this).attr('value');
        browse.mangaStatus = browse.mangaStatus.filter(function(elem){
            return elem !== value;
        });
    }
    browse.hide('results');
});

$('#filter-chapters li').click(function(){
    browse.chapterMin = Number.MAX_VALUE;
    browse.chapterMax = Number.MIN_VALUE;
    $('#filter-chapters .red-text').each(function(){
        var minMax = $(this).attr('value').split(" ");
        if(browse.chapterMin > parseInt(minMax[0]))
        {
            browse.chapterMin = minMax[0];
        }
        if(isNaN(parseInt(minMax[1])) || (browse.chapterMax < parseInt(minMax[1])))
        {
            browse.chapterMax = parseInt(minMax[1]) || Number.POSITIVE_INFINITY;
        }
    });
    browse.hide('results');
});

var sortFunc = function(toSort, isDesc)
{
    var $people = $('#results'),
        $peopleli = $people.children();
        
    if(typeof isDesc !== 'boolean')
    {
        isDesc = true;
    }
    
    $peopleli.sort(function(a,b){
    	var an = a.getAttribute('data-' + toSort),
    		bn = b.getAttribute('data-' + toSort);
    
        //Check for numbers
        an = (parseInt(an) || Date.parse(an) || an);
        bn = (parseInt(bn) || Date.parse(bn) || bn);
    	if(an > bn) {
    	    if(isDesc)
    	    {
            	return -1;
    	    }
    	    else
    	    {
    	        return 1
    	    }
    	}
    	if(an < bn) {
    	    if(isDesc)
    	    {
            	return 1;
    	    }
    	    else
    	    {
    	        return -1;
    	    }
    	}
    	return 0;
    });
    
    $peopleli.detach().appendTo($people);
};

$('#filter-sort span').click(function(){
    
    $('#filter-sort i').addClass('no-display');
    $('#filter-sort span').removeClass('red-text text-lighten-1');
    
    $(this).addClass('red-text text-lighten-1');
    
    if($(this).children().first().hasClass('no-display'))
    {
        $(this).children().first().removeClass('no-display');
    }
    
    var isDesc;
    if($(this).attr('data-order') === 'desc')
    {
        isDesc = false;
        $(this).attr('data-order','asc');
    }
    else
    {
        isDesc = true;
        $(this).attr('data-order','desc');
    }
    
    if(isDesc)
    {
        $(this).children().first().removeClass('fa-chevron-up');
        $(this).children().first().addClass('fa-chevron-down');
    }
    else
    {
        $(this).children().first().removeClass('fa-chevron-down');
        $(this).children().first().addClass('fa-chevron-up');
    }
    
    
    
    
    if($(this).attr('value') === 'popularity')
    {
        sortFunc('views', isDesc);
        return;
    }
    if($(this).attr('value') === 'date')
    {
        sortFunc('date', isDesc);
        return;
    }
    if($(this).attr('value') === 'numOfChapters')
    {
        sortFunc('num-of-chapters', isDesc);
        return;
    }
    if($(this).attr('value') === 'name')
    {
        sortFunc('title', isDesc);
        return;
    }
});

$('#browse .card').click(function(){
    $(this).toggleClass('selected');
});

var genres = [];
$('#continue-chapter').click(function(){
    genres = [];
    $('#browse-genre .selected').each(function(){
        genres.push($(this).parent().attr('value'));
    });
    $('#browse-genre').hide();
    $('#browse-chapter').show();
    $('#browse-back').removeClass('no-display');
    $('#browse-back').attr('value','genre');
});

var min = null;
var max = null;

$('#browse-chapter .card').click(function(){
    $('#browse-chapter .card').removeClass('selected');
    $(this).addClass('selected');
});

$('#continue-results').click(function(){
    var rangeString = $('#browse-chapter .selected').first().parent().attr('value');
    var rangeArr = rangeString.split(' ');
    min = rangeArr[0];
    max = parseInt(rangeArr[1]) || '';
    
    $.getJSON('/api/v1/manga/search?genres=' + genres.join('+') + '&min=' + min + '&max=' + max, function(data){
        var toAppend = '';
        for(var i = 0; i < data.length; i++)
        {
            toAppend +=
                '<div data-status="'+ data[i].status +'" data-genres="'+ data[i].genres.join(" ") +'" data-title="'+ data[i].title.replace(' ','_') +'" data-num-of-chapters="'+ data[i].numOfChapters +'" data-views="'+ data[i].views.total +'" data-date="'+ data[i].updated_at +'" class="col s12 m4 l3">' + 
                    '<a href="/manga/'+ data[i].title.replace(' ','_') +'"><img height="190" width="250" class="responsive-img" src="'+ data[i].coverUrl +'"></img><span class="center-align">'+ data[i].title +'</span><br><span class="center-align">'+ data[i].genres.toString() +'</span><br><span class="center-align">'+ data[i].numOfChapters +'</span><br><span class="center-align">'+ data[i].status +'</span><br><span class="center-align">'+ data[i].views.total +'</span><br><span class="center-align">'+ data[i].updated_at +'</span></a>' +
                '</div>';
        }
        $('#browse-results').append(toAppend);
    });
    
    $('#browse-chapter').hide();
    $('#browse-back').attr('value','chapter');
});

$('#simple-browse').click(function(){
    if($(this).text().toLowerCase() === 'simple browse')
    {
        $(this).text('ADVANCED BROWSE');
    }
    else
    {
        $(this).text('SIMPLE BROWSE');
        
    }
    $('#filter-sort').toggleClass('hide-on-large-only');
    $('#filter').toggleClass('hide-on-large-only');
    $('#browse').toggleClass('hide-on-large-only');
});

$('#browse-back').click(function(){
    $('#browse-results').empty();
    var toGo = $(this).attr('value');
    if(toGo === 'genre')
    {
        $('#browse-chapter').hide();
        $('#browse-genre').show();
        $('#browse-back').addClass('no-display');
    }
    if(toGo === 'chapter')
    {
        $('#browse-genre').hide();
        $('#browse-chapter').show();
        $('#browse-back').attr('value','genre');
    }
});
