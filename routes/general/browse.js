module.exports = function(router, passport, manga, user)
{
    router.route('/browse')
        .get(function(req, res){
            res.render('partials/browse', { 
                meta:{ 
                    title: 'Debonair Manga - Read Online for Free', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: ''
                }
            });
        });
};