module.exports = function(router, passport, manga, user)
{
    router.route('/manga/:manga_name')
    
        .get(function(req, res) {
            var name = req.params.manga_name.replace(/_/gi, ' ').toLowerCase();
            manga.findOne({ title: name }, '-chapter.pages', null, function(err, data){

                if(err)
                {
                    req.redirect(301,'/');
                    return;
                }
                
                res.render('partials/manga', { 
                    layout: 'layout',
                    user: req.user,
                    manga: data,
                    preview: data.preview,
                    meta:{ 
                        title: 'Debonair Manga - Read ' + data.title + ' Online for Free', 
                        description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                        keywords: data.title + data.author + ', manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                    } 
                });
            });
        });
    
    router.route('/manga/:manga_name/:chapter')
        .get(function(req, res) {
            
            var chapterNumber = parseInt(req.params.chapter);
            var chapterToReturn = null;
            
            manga.findOne({ title: req.params.manga_name.replace(/_/g,' ') }, 'title chapters', function(err, data){
                if(err)
                {
                    console.log(err);
                    res.redirect(301, '');
                    return;
                }
                
                for(var i = 0; i < data.chapters.length; i++)
                {
                    if(data.chapters[i].number === chapterNumber)
                    {
                        chapterToReturn = data.chapters[i];
                    }
                }

                res.render('partials/reader', { 
                    layout: 'layout',
                    title: data.title,
                    chapter: chapterToReturn,
                    meta:{ 
                        title: 'Debonair Manga - Read Online for Free', 
                        description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                        keywords: ''
                    }
                });
            });
        });
};