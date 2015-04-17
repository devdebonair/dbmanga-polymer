var isDual = false;
var isLighted = true;
var isSlide = true;
var isScreenHeight = true;

buildSingleBook();
function buildSingleBook(height)
{
    this.height = height || $(window).height();
    var toAppend = '';
    for(var i = 0; i < chapter.pages.length; i++)
    {
        toAppend += '<div class="center-align"><img value="'+ i +'" src="'+ chapter.pages[i].image +'"></img></div>';
    }
    toAppend += '<div><a href="/manga/'+ mangaTitle +'/' + nextChapterNumber + '" class="btn red lighten-1">NEXT CHAPTER</a></div>';
    $('#pages').append(toAppend);
    
    $('#pages img').height(this.height);
    
    if(isSlide)
    {
        $('#pages').slick({
            infinite: false,
            speed: 200,
            arrows: false
        });
    }
}

function buildDualBook(height)
{
    this.height = height || $(window).height();
    var toAppend = '';
    for(var i = 0; i < chapter.pages.length; i++)
    {
        toAppend += '<div class="center-align"><img value="'+ i +'" src="'+ chapter.pages[i].image +'"></img>';
        //If another page exists
        if(i+1 < chapter.pages.length)
        {
            var image1 = new Image();
            image1.src = chapter.pages[i].image;
            
            var image2 = new Image();
            image2.src = chapter.pages[i+1].image;
            
            if( (image1.naturalWidth/image1.naturalHeight) < 0.8 && (image2.naturalWidth/image2.naturalHeight) < 0.8)
            {
                toAppend += '<img value="'+ (i+1) +'"src="'+ chapter.pages[i+1].image +'"></img>';
                i++;
            }
        }
        
        toAppend += '</div>';
    }
    toAppend += '<div><a href="/manga/'+ mangaTitle +'/' + nextChapterNumber + '" class="btn red lighten-1">NEXT CHAPTER</a></div>';
    $('#pages').append(toAppend);
    
    $('#pages img').height(this.height);
    
    if(isSlide)
    {
        $('#pages').slick({
            infinite: false,
            speed: 200,
            arrows: false
        });
    }
}

//Button Events
$('#pages').click(function(event){
    if(isSlide)
    {
        if(event.shiftKey)
        {
            $(this).slick('slickPrev');
            return;
        }
        $(this).slick('slickNext');
    }
});

$('#control-page-toggle').click(function(){
    isDual = !isDual;
    
    var currentPage = findCurrentPage();
    $('#pages').slick('unslick');
    $('#pages').empty();
    
    if(isDual)
    {
        buildDualBook();
        $(this).removeClass('fa-files-o');
        $(this).addClass('fa-file-o');
        currentPage = continuePage('' + currentPage);
        $('#pages').slick('slickGoTo', currentPage);
        return;
    }
    buildSingleBook();
    $(this).removeClass('fa-file-o');
    $(this).addClass('fa-files-o');
    currentPage = continuePage('' + currentPage);
    $('#pages').slick('slickGoTo', currentPage);
});

$('#control-light-toggle').click(function(){
    isLighted = !isLighted;
    
    if(isLighted)
    {
        $('html').css('background-color', 'white');
        $('#pages').css('background-color', 'white');
        $('#reader-controls').css('color', 'black');
        return;
    }
    $('html').css('background-color', 'black');
    $('#pages').css('background-color', 'black');
    $('#reader-controls').css('color', 'white');
});

$('#control-slide-toggle').click(function(){
    isSlide = !isSlide;

    if(isSlide)
    {
        $('#pages').slick('unslick');
        $('#pages').empty();
        if(isDual)
        {
            buildDualBook();
        }
        else
        {
            buildSingleBook();
        }
        $(this).removeClass('fa-arrows-h');
        $(this).addClass('fa-arrows-v');
        return;
    }
    $('#pages').slick('unslick');
    $(this).removeClass('fa-arrows-v');
    $(this).addClass('fa-arrows-h');
});

$('#control-expand').click(function(){
    var elem = document.getElementById('pages');
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
    
    $('#pages img').height(screen.availHeight);
});

$('#control-zoom-toggle').click(function(){
    isScreenHeight = !isScreenHeight;
    
    $('#pages img').each(function(){
        if(isScreenHeight)
        {
            $(this).height($(window).height());
        }
        else
        {
            var image = new Image();
            image.src = $(this).attr('src');
            $(this).height(image.naturalHeight);
        }
    });
    
    if(isScreenHeight)
    {
        $(this).removeClass('fa-search-minus');
        $(this).addClass('fa-search-plus');
        return;
    }
    $(this).removeClass('fa-search-plus');
    $(this).addClass('fa-search-minus');
});


function findCurrentPage()
{
    var currentSlide = $('#pages').slick('slickCurrentSlide');
    return $('#pages .slick-track').children().eq(currentSlide).children().first().attr('value');
};

function continuePage(pageNumber)
{
    var length = $('#pages .slick-track').children().length;
    for(var i = 0; i < length; i++)
    {
        for(var j = 0; j < $('#pages .slick-track').children().eq(i).children().length; j++)
        {
            console.log('%s === %s', $('#pages .slick-track').children().eq(i).children().eq(j).attr('value'), pageNumber);
            if($('#pages .slick-track').children().eq(i).children().eq(j).attr('value') === pageNumber)
            {
                return i;
            }
        }
    }
};