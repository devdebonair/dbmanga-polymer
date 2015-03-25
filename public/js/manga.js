$(function(){
    
    $('#manga-chapter-list').mmenu({
       "header": {
          "title": manga.title,
          "add": true,
          "update": true
       },
       "searchfield": {
          "placeholder": "Find Chapter",
          "noResults": "No chapter found.",
          "add": true,
          "search": true
       },
       "offCanvas": {
           "position": "right",
           "zposition": "front"
       },
       "dragOpen": true,
       "classes": "mm-white"
    });
    
    $('.materialboxed').materialbox();
});