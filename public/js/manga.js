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
    
    $.get('/api/v1/manga/'+ manga._id +'/chapters/1', function(data){
        for(var i = 0; i < 4; i++)
        {
            $('#manga-preview').append(
                '<div class="col s12 m6 l3">' +
                    '<img class="responsive-img materialboxed" src="'+ data.pages[i].image +'"></img>' +
                '</div>'
            );
        }
        $('.materialboxed').materialbox();
    });
});