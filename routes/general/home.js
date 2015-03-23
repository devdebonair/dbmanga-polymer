module.exports = function(router, passport, manga, user)
{
    router.route('/')
    
        .get(function(req, res){
            
            res.render('partials/home', {
                user: req.user,
                meta:{ 
                    title: 'Debonair Manga - Responsive Online Manga Reader', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: 'manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                }
            });
        });
};