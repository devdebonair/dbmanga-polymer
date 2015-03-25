module.exports = function(router, passport, manga, user, article)
{
    var recentArticles = null;
    
    article.find({}, '', { sort: { published: '-1' }, limit: 15 }, function(err, data){
        if(err)
        {
            console.log(err);
            return;
        }
        recentArticles = data;
    });
    
    router.route('/')
    
        .get(function(req, res){
            res.render('partials/home', {
                user: req.user,
                articles: recentArticles,
                meta:{ 
                    title: 'Debonair Manga - Responsive Online Manga Reader', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: 'manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                }
            });
        });
};