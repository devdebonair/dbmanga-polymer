module.exports = function(router, passport, manga, user)
{
    router.route('/')
    
        .get(function(req, res){
            res.render('partials/genres', { layout: 'layout' });
        });
};