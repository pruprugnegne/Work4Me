

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:49146/api/annunci', true);
request.onload = function () {

    
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(Object.keys(data).length);

    if (request.status >= 200 && request.status < 400) {

        for(let i = 0; i < Object.keys(data).length; i++){

            $('#primo').trigger('add.owl.carousel', [
            '<div class="card border-0 shadow">'+
                '<div class="card" style="width: 19rem;">'+
                    '<img src="https://i1.wp.com/www.giacomocusano.com/wp-content/uploads/2016/07/coastal-wash-web.jpg?fit=1024%2C682&ssl=1" class="img-thumbnail" alt="..." width="304" height="236">'+
                    '<div class="card-body">'+
                        '<h5 class="card-title">'+data[i].titolo+'</h5>'+
                        "<p class='card-text'>"+data[i].descrizione+"</p>"+
                        "<a href='Annuncio.html?id="+data[i]._id+"' class='btn btn-primary'>Open</a>"+
                    '</div>'+
                '</div>'+
            '</div>'
            ])
            .trigger('refresh.owl.carousel');

            $('#secondo').trigger('add.owl.carousel', [
                '<div class="card border-0 shadow">'+
                    '<div class="card" style="width: 19rem;">'+
                        '<img src="https://i1.wp.com/www.giacomocusano.com/wp-content/uploads/2016/07/coastal-wash-web.jpg?fit=1024%2C682&ssl=1" class="img-thumbnail" alt="..." width="304" height="236">'+
                        '<div class="card-body">'+
                            '<h5 class="card-title">'+data[i].titolo+'</h5>'+
                            "<p class='card-text'>"+data[i].descrizione+"</p>"+
                            "<a href='Annuncio.html?id="+data[i]._id+"' class='btn btn-primary'>Open</a>"+
                        '</div>'+
                    '</div>'+
                '</div>'
                ])
            .trigger('refresh.owl.carousel');

            $('#terzo').trigger('add.owl.carousel', [
                '<div class="card border-0 shadow">'+
                    '<div class="card" style="width: 19rem;">'+
                        '<img src="https://i1.wp.com/www.giacomocusano.com/wp-content/uploads/2016/07/coastal-wash-web.jpg?fit=1024%2C682&ssl=1" class="img-thumbnail" alt="..." width="304" height="236">'+
                        '<div class="card-body">'+
                            '<h5 class="card-title">'+data[i].titolo+'</h5>'+
                            "<p class='card-text'>"+data[i].descrizione+"</p>"+
                            "<a href='Annuncio.html?id="+data[i]._id+"' class='btn btn-primary'>Open</a>"+
                        '</div>'+
                    '</div>'+
                '</div>'
                ])
                .trigger('refresh.owl.carousel');

        }
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
    }
    
}

request.send();