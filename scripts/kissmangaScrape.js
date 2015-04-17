var mongoose = require("mongoose");
var Manga = require("../database/models/ModelManga");
var Kissmanga = require("./manga-scraper").KissManga;
var fs = require("fs");

var directory = fs.readFileSync('mangalist', 'utf8').split('\n');
var counter = 0;

require("../database/db")(mongoose, function(err){
    if(err)
    {
        return console.log(err);
    }
    
    var scraper = new Kissmanga();
    var stream = fs.createWriteStream('failed');
    
    fetchAndSave();
    
    function fetchAndSave()
    {
        scraper.series({mangaName: directory[counter]}, function(err, data){
            if(err)
            {
                console.log(err);
                counter++;
                stream.write(directory[counter] + '\n')
                if(counter < directory.length)
                {
                    return fetchAndSave();
                }
            }
            
            for(var i = 0; i < data.chapters.length; i++)
            {
                if(!data.chapters[i].pages || data.chapters[i].pages.length === 0)
                {
                    console.log('%s incomplete.\tCounter:\t%d\n\n', directory[counter], counter);
                    stream.write(directory[counter] + '\n')
                    counter++;
                    if(counter < directory.length)
                    {
                        return fetchAndSave();
                    }
                }
            }
            
            
            var databaseObject = new Manga();
            databaseObject.title = directory[counter].toLowerCase().replace(/-/g,' ');
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
                console.log('%s saved.\tCounter:\t%d\n\n', databaseObject.title, counter);
                if(counter < directory.length)
                {
                    counter++;
                    return fetchAndSave();
                }
            });
        });        
    }
});