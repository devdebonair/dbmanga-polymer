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
        console.log(this.genres);
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

            var numOfChapters = parseInt($(this).data('numOfChapters'));
            if((browseObject.chapterMin !== Number.MAX_VALUE && browseObject.chapterMax !== Number.MIN_VALUE) && (numOfChapters <= browseObject.chapterMin || numOfChapters >= browseObject.chapterMax))
            {
                $(this).css('display','none');
                return;
            }
            console.log('\trange passed:\t' + $(this).data('numOfChapters'));
            
            $(this).css('display','block');
        });
    },
    
    show: function(list)
    {
        this.hide(list, 'block');
    }
}

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

$.get('/api/v1/manga/search', function(data){
    for(var i = 0; i < data.length; i++)
    {
        $('#results').append(
            '<div data-status="'+ data[i].status +'" data-genres="'+ data[i].genres.join(" ") +'" data-title="'+ data[i].title.replace(' ','_') +'" data-num-of-chapters="'+ data[i].numOfChapters +'" class="col s12 m4 l3">' + 
                '<a href="/manga/'+ data[i].title.replace(' ','_') +'"><img height="190" width="250" class="responsive-img" src="'+ data[i].coverUrl +'"></img><span class="center-align">'+ data[i].title +'</span><br><span class="center-align">'+ data[i].genres.toString() +'</span><br><span class="center-align">'+ data[i].numOfChapters +'</span><br><span class="center-align">'+ data[i].status +'</span></a>' +
            '</div>'
        );
    }
    browse = new Browse();
});

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