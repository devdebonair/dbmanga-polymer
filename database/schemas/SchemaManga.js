var Schema = require("mongoose").Schema;

var Manga = new Schema({
    title: {type: String, lowercase: true, trim: true},
    description: { type: String, required: true },
    coverUrl: { type: String, required: true },
    cover: {
        portrait: { type: String, required: true },
        landscape: { type: String, required: false }  
    },
    author: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    artist: String,
    genres: [String],
    subgenres: [String],
    numOfChapters: { type: Number, required: true, default: 0 },
    status: {type: String, lowercase: true, trim: true, required: true },
    chapters: [{
        number: { type: Number, required: true },
        title: { type: String, required: true },
        pages: [{
            comments: [{
                avatar: { type: String, required: true },
                username: { type: String, required: true },
                comment: { type: String, required: true }
            }],
            number: { type: Number, required: true },
            image: { type: String, required: true },
        }],
    }],
    views: { total: { type: Number, default: 0 }, currentMonth: { type: Number, default: 0 }, currentWeek: { type: Number, default: 0 } },
    updated_at: { type: Date, default: Date.now() }
});

Manga.statics.findUpdated = function(limit, callback)
{
    var dataLimit = limit || 25;
    if(dataLimit > 25 || dataLimit < 1)
    {
        dataLimit = 25;
    }
    this.find({}, '-chapters', { limit: dataLimit, sort: { updated_at: -1 } }, function(err, data){
        if(err)
        {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
};

Manga.statics.findPopular = function(limit, callback)
{
    var dataLimit = limit || 25;
    if(dataLimit > 25 || dataLimit < 1)
    {
        dataLimit = 25;
    }
    this.find(null, '-chapters', { limit: dataLimit, sort: { 'views.currentMonth': -1 } }, function(err, data){
        if(err)
        {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
};

Manga.virtual('preview').get(function(){
    var sortedChapters = this.chapters.sort(function(a,b){
        return a.number - b.number;
    });
    
    var selectedChapter = sortedChapters[0];
    
    var sortedPages = selectedChapter.pages.sort(function(a,b){
        return a.number - b.number;
    });
    
    return sortedPages.slice(0,4);
});

Manga.statics.findTrending = function(limit, callback)
{
    var dataLimit = limit || 25;
    if(dataLimit > 25 || dataLimit < 1)
    {
        dataLimit = 25;
    }
    this.find(null, '-chapters', { limit: dataLimit, sort: { 'views.currentWeek': -1 } }, function(err, data){
        if(err)
        {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
};

module.exports = Manga;