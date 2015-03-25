var isDual = false;
var isLighted = true;
var isSlide = true;
var isScreenHeight = true;

buildSingleBook();
function buildSingleBook(height)
{
    this.height = height || $(window).height();
    
    for(var i = 0; i < chapter.pages.length; i++)
    {
        $('#pages').append('<div class="center-align"><img src="'+ chapter.pages[i].image +'"></img></div>');
    }
    
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
    for(var i = 0; i < chapter.pages.length; i++)
    {
        var toAppend = '<div class="center-align"><img src="'+ chapter.pages[i].image +'"></img>';
        console.log(chapter.pages[i].image);
        //If another page exists
        if(i+1 < chapter.pages.length)
        {
            var image1 = new Image();
            image1.src = chapter.pages[i].image;
            
            var image2 = new Image();
            image2.src = chapter.pages[i+1].image;
            
            if( (image1.naturalWidth/image1.naturalHeight) < 0.8 && (image2.naturalWidth/image2.naturalHeight) < 0.8)
            {
                toAppend += '<img src="'+ chapter.pages[i+1].image +'"></img>';
                i++;
            }
        }
        
        toAppend += '</div>';
        console.log(toAppend);
        $('#pages').append(toAppend);
    }
    
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
    
    $('#pages').slick('unslick');
    $('#pages').empty();

    if(isDual)
    {
        buildDualBook();
        $(this).removeClass('fa-files-o');
        $(this).addClass('fa-file-o');
        return;
    }
    buildSingleBook();
    $(this).removeClass('fa-file-o');
    $(this).addClass('fa-files-o');
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