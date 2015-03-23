module.exports = function(router, passport)
{
    router.route('/library')
    
        .get(function(req, res){
            
            var library = req.user.library;
            
            res.render('partials/library', {
                user: req.user,
                library: library,
                meta:{ 
                    title: 'Debonair Manga - Responsive Online Manga Reader', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: 'manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                }
            });
        });
};