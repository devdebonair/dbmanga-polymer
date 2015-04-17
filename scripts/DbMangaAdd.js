var mongoose = require("mongoose");
var Manga = require("../database/models/ModelManga");
var Kissmanga = require("./manga-scraper").KissManga;

require("../database/db")(mongoose, function(err){
    if(err)
    {
        return console.log(err);
    }
    
    var scraper = new Kissmanga();
    
    var title = process.argv[2];
    scraper.series({mangaName: title }, function(err, data){
        if(err)
        {
            console.log(err);
        }
        
        for(var i = 0; i < data.chapters.length; i++)
        {
            if(!data.chapters[i].pages || data.chapters[i].pages.length === 0)
            {
                console.log('incomplete');
                return;
            }
        }
        
        var databaseObject = new Manga();
        databaseObject.title = title.toLowerCase().replace(/-/g,' ');
        databaseObject.description = data.description;
        databaseObject.coverUrl = data.coverUrl;
        databaseObject.cover.portrait = data.coverUrl;
        databaseObject.author = data.author;
        databaseObject.likes = Math.floor(Math.random() * (80000 - 0 + 1));

        var acceptedGenres = ['shounen','shoujo','slice of life', 'adventure', 'seinen', 'romance', 'ecchi', 'mature', 'harem'];

        databaseObject.genres = data.genres.map(function(str){
            return str.toLowerCase();
        }).filter( function( el ) {
            return acceptedGenres.indexOf( el ) > -1;
        });
        databaseObject.subgenres = data.genres.map(function(str){
            return str.toLowerCase();
        }).filter( function( el ) {
            return acceptedGenres.indexOf( el ) === -1;
        });
        
        databaseObject.numOfChapters = data.numOfChapters;
        databaseObject.status = data.status.toLowerCase().replace('completed','complete');
        databaseObject.chapters = data.chapters;
        databaseObject.views['total'] = Math.floor(Math.random() * (1000000 - 0 + 1));
        databaseObject.views['currentMonth'] = Math.floor(Math.random() * (1000000 - 0 + 1));
        databaseObject.views['currentWeek'] = Math.floor(Math.random() * (1000000 - 0 + 1));
        
        databaseObject.save(function(err, data){
            if(err)
            {
                console.log(err);
            }
            console.log('saved');
            return;
        });
        return;
    });
    return;
});