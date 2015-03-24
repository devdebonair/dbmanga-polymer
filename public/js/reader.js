var chapter = [
        {
            number: 1,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/001.png'
        },
        {
            number: 2,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/002.png',
        },
        {
            number: 3,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/003.png',
        },
        {
            number: 4,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/004.png',
        },
        {
            number: 5,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/005.png',
        },
        {
            number: 6,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/006.png',
        },
        {
            number: 7,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/007.png',
        },
        {
            number: 8,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/008.png',
        },
        {
            number: 9,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/009.png',
        },
        {
            number: 10,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/010.png',
        },
        {
            number: 11,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/011.png',
        },
        {
            number: 12,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/012.png',
        },
        {
            number: 13,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/013.png',
        },
        {
            number: 14,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/014.png',
        },
        {
            number: 15,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/015.png',
        },
        {
            number: 16,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/016.png',
        },
        {
            number: 17,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/017.png',
        },
        {
            number: 18,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/018.png',
        },
        {
            number: 19,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/019.png',
        },
        {
            number: 20,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/020.png',
        },
        {
            number: 21,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/021.png',
        },
        {
            number: 22,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/022.png',
        },
        {
            number: 23,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/023.png',
        },
        {
            number: 24,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/024.png',
        },
        {
            number: 25,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/025.png',
        },
        {
            number: 26,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/026.png',
        },
        {
            number: 27,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/027.png',
        },
        {
            number: 28,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/028.png',
        },
        {
            number: 29,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/029.png',
        },
        {
            number: 30,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/030.png',
        },
        {
            number: 31,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/031.png',
        },
        {
            number: 32,
            image: 'http://img.mangastream.com/cdn/manga/102/2705/032.png',
        }
    ];

var isDual = false;
var isLighted = true;
var isSlide = true;
var isScreenHeight = true;

buildSingleBook();

function buildSingleBook(height)
{
    this.height = height || $(window).height();
    
    for(var i = 0; i < chapter.length; i++)
    {
        $('#pages').append('<div class="center-align"><img src="'+ chapter[i].image +'"></img></div>');
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
    for(var i = 0; i < chapter.length; i++)
    {
        var toAppend = '<div class="center-align"><img src="'+ chapter[i].image +'"></img>';
        
        //If another page exists
        if(i+1 < chapter.length)
        {
            var image1 = new Image();
            image1.src = chapter[i].image;
            
            var image2 = new Image();
            image2.src = chapter[i+1].image;
            
            if( (image1.naturalWidth/image1.naturalHeight) < 0.8 && (image2.naturalWidth/image2.naturalHeight) < 0.8)
            {
                toAppend += '<img src="'+ chapter[i+1].image +'"></img>';
                i++;
            }
        }
        
        toAppend += '</div>'
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
        return
    }
    $(this).removeClass('fa-search-plus');
    $(this).addClass('fa-search-minus');
});