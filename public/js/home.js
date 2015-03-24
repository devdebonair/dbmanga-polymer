$.get('/api/v1/news/12', function(data){
    for(var i = 0; i < data.length; i++)
    {
        $('#article').append(
            '<div class="col s12 l4">' +
                '<div class="card">' +
                    '<div class="card-image">' +
                        '<img src="'+ data[i].coverUrl +'"></img>' +
                    '</div>' +
                    '<div class="card-content">' +
                        '<h5 class="black-text">'+ data[i].title.toUpperCase() +'</h5>' +
                        '<hr color="#f2f2f2">' +
                        '<p>'+ data[i].summary +'</p>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );    
    }
});