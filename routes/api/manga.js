var Manga = require("../../database/models/ModelManga");

module.exports = function(router)
{
    router.route('/manga')
        
        .post(function(req, res){

            var manga = new Manga(req.body);
            manga.save(function(err, manga){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(manga);
            });
        });
    
    router.route('/manga/directory')
    
        .get(function(req, res) {
            Manga.find(null, 'title id', function(err, data){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(manga);
            });
        });
        
            
    router.route('/manga/search')
    
        .get(function(req, res){
            var title = req.query.title || new RegExp('.*','gi');
            var genres = req.query.genres || [/.*/];
            var status = req.query.status || [/.*/];
            var min = parseInt(req.query.min) || -1;
            var max = parseInt(req.query.max) || Number.MAX_VALUE;
            
            if(typeof genres === 'string')
            {
                genres = genres.split(" ");
            }
            
            if(typeof status === 'string')
            {
                status = status.split(" ");
            }
            
            Manga.find({ title: { $regex: title }, genres: { $all: genres }, status: { $in: status }, numOfChapters: { $gt: min, $lt: max } }, 'title coverUrl artist description genres numOfChapters status', { sort: { 'views.currentWeek': -1 } }, function(err, data){
                if(err)
                {
                    return res.status(404).json(err);
                }
                return res.status(200).json(manga);
            });
        });

        
    router.route('/manga/:manga_id')
        
        .get(function(req, res){
            Manga.findById( req.params.manga_id, req.query.select, function(err, manga){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(manga);
            });
        })
        
        .put(function(req, res){
            
            Manga.findByIdAndUpdate( req.params.manga_id, req.body, function(err, manga){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(manga);
            });
        })
        
        .delete(function(req, res){
            
            Manga.findByIdAndRemove( req.params.manga_id, function(err, manga){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(manga);
            });
        });
        
    router.route('/manga/:manga_id/likes')
    
        .put(function(req, res){
            Manga.findByIdAndUpdate(req.params.manga_id, { $inc: { likes: 1 }}, function(err, data){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(data.likes);
            })
        })
        
        .delete(function(req, res){
            Manga.findByIdAndUpdate(req.params.manga_id, { $inc: { likes: -1 }}, function(err, data){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(data.likes);
            })
        });
        
    router.route('/manga/:manga_id/chapters')
        
        .get(function(req, res){
            var fields = req.query.select.split(' ');
            var select = '';
            for(var i = 0; i < fields.length; i++)
            {
                if(fields[i].charAt(0) === '-')
                {
                    select += '-';
                }
                select += 'chapters.' + fields[i] + ' ';
            }
            
            Manga.findById(req.params.manga_id, select, function(err, manga){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(manga.chapters);
            });
        })
        
        .post(function(req, res){
            
            Manga.findByIdAndUpdate( req.params.manga_id, { $push: { chapters: req.body } },
                function(err, manga){
                    if(err)
                    {
                        return res.status(404).json({message: err});
                    }
                    return res.status(200).json(manga);
                });
        });
        
    router.route('/manga/:manga_id/chapters/:chapter_number')
        
        .get(function(req, res) {
            
            Manga.findById( req.params.manga_id, function(err, manga) {
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                
                var chapterToReturn = null;
                
                for( var i = 0; i < manga.chapters.length; i++ )
                {
                    if(manga.chapters[i].number === parseInt(req.params.chapter_number) )
                    {
                        chapterToReturn = manga.chapters[i];
                    }
                }
                
                if(!chapterToReturn)
                {
                    res.status(404).json({ error: "Chapter " + req.params.chapter_number +
                                        ' is not available.'});
                    return;
                }

                return res.status(200).json(chapterToReturn);
            });    
        })
        
        .delete(function(req, res) {
            
            Manga.findByIdAndUpdate(req.params.manga_id, { $pull: { chapters: { number: req.params.chapter_number }} },
                function(err, manga) {
                    if(err)
                    {
                        return res.status(404).json({message: err});
                    }
                    res.json(data);
                });
        });
    
    router.route('/manga/popular/:limit')
    
        .get(function(req, res) {
            
            Manga.findPopular(req.params.limit, function(err, data){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(data);
            });
        });
        
    router.route('/manga/trending/:limit')
    
        .get(function(req, res) {
            
            Manga.findTrending(req.params.limit, function(err, data){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(data);
            });
        });
        
    router.route('/manga/updated/:limit')
    
        .get(function(req, res) {
            
            Manga.findUpdated(req.params.limit, function(err, data){
                if(err)
                {
                    return res.status(404).json({message: err});
                }
                return res.status(200).json(data);
            });
        });
        
};