
var params = {}; 
location.search.slice(1).split("&").forEach(function(pair) { 
    pair = pair.split("="); 
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]); 
});

//Provvisoria
let id = params['id'];

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:49146/api/annunci/'+id, true);
request.onload = function () {

    
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(Object.keys(data).length);

    if (request.status >= 200 && request.status < 400) {

        /*
        for(let i = 0; i < Object.keys(data).length; i++){
            if(data[i]._id == id){
                
                //Cambio titolo
                let titolo = document.getElementById('titolo');
                titolo.innerHTML = data[i].titolo;
            
                //Cambio descrizione
                let descrizione = document.getElementById('descrizione');
                descrizione.innerHTML = data[i].descrizione;

                //Cambio prezzo
                let prezzo = document.getElementById('prezzo');// Preleva solo la parte intera
                prezzo.innerHTML = data[i].costo;

                //Cambio rating
                let rating = document.getElementById('rating');//Ancora da testare
                let sum = 0;
                let n = data[i].voti.length;
                let r = 0;
                for(let j = 0 ; j < n && n != 0; j++){
                    sum += data[i].voti[j];
                }
                if(n != 0)
                    r = sum/n;

                console.log(r);
                rating.innerHTML = r;
                
            }
        }
        */

        //Cambio titolo
        let titolo = document.getElementById('titolo');
        titolo.innerHTML = data[0].titolo;

        //Cambio descrizione
        let descrizione = document.getElementById('descrizione');
        descrizione.innerHTML = data[0].descrizione;

        //Cambio prezzo
        let prezzo = document.getElementById('prezzo');// Preleva solo la parte intera
        prezzo.innerHTML = data[0].costo;

        //Cambio rating
        let rating = document.getElementById('rating');//Ancora da testare
        let sum = 0;
        let n = data[0].voti.length;
        let r = 0;
        for(let j = 0 ; j < n && n != 0; j++){
            sum += data[0].voti[j];
        }
        if(n != 0)
            r = sum/n;

        console.log(r);
        rating.innerHTML = r;


    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
    }
    
}

request.send();