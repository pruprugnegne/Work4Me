
function funzione(){

const mostra = document.getElementById('mostra');
mostra.style.visibility = 'hidden';

const tAnnunci = document.getElementById('tAnnunci');
tAnnunci.style.removeProperty('visibility');


var params = {}; 
location.search.slice(1).split("&").forEach(function(pair) { 
    pair = pair.split("="); 
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]); 
});
console.log("Ciao");
let id = params['id'];

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:49146/api/utenti/annunci/'+id, true);
request.onload = function () {
    //console.log("Ciao");
    //console.log("Ciao");
    
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(Object.keys(data).length);

    if (request.status >= 200 && request.status < 400) {
        //console.log("Ciao");
        for(let i = 0; i < Object.keys(data).length; i++){
                
            $('#annunci').trigger('add.owl.carousel', [
            '<div class="card border-0 shadow">'+
                '<div class="card" style="width: 19rem;">'+
                    '<img src="https://i1.wp.com/www.giacomocusano.com/wp-content/uploads/2016/07/coastal-wash-web.jpg?fit=1024%2C682&ssl=1" class="img-thumbnail" alt="..." width="304" height="236">'+
                    '<div class="card-body">'+
                        '<h5 class="card-title">'+data[i].titolo+'</h5>'+
                        "<p class='card-text'>"+data[i].descrizione+"</p>"+
                        "<a href='Annuncio.html?id="+data[i]._id+"' class='btn btn-primary'>Open</a>"+
                        '<a class="delete btn btn-primary ms-2" onclick="remove('+"'"+data[i]._id+"', '"+ data[i]._idProprietario + "'" +')">Delete</a>'+
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
}

function remove(idAnnuncio,idUtente){
    const endpoint = 'http://localhost:49146/api/annunci/'+idAnnuncio;

    fetch(endpoint,{
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => window.location.href = 'Profile.html?id='+idUtente)
    .catch(err => console.log(err));
}