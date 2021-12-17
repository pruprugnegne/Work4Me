
var params = {}; 
location.search.slice(1).split("&").forEach(function(pair) { 
    pair = pair.split("="); 
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]); 
});

let id = params['id'];

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:49146/api/utenti/'+id, true);
request.onload = function () {

    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {

        /*for(let i = 0; i < Object.keys(data).length; i++){
            if(data[i]._id == id){

                let nome = document.getElementById('nome');
                nome.innerHTML = data[i].nome;

                let congome = document.getElementById('cognome');
                cognome.innerHTML = data[i].cognome;

                let dataNascita = document.getElementById('dataNascita');
                dataNascita.innerHTML = data[i].dataNascita;

                let email = document.getElementById('email');
                email.innerHTML = data[i].email;

                let recensioni = document.getElementById('recensioni');
                recensioni.innerHTML = data[i].recensioni;

            }
        }*/

        let nome = document.getElementById('nome');
        nome.innerHTML = data[0].nome;

        let congome = document.getElementById('cognome');
        cognome.innerHTML = data[0].cognome;

        let dataNascita = document.getElementById('dataNascita');
        dataNascita.innerHTML = data[0].dataNascita;

        let email = document.getElementById('email');
        email.innerHTML = data[0].email;

        let recensioni = document.getElementById('recensioni');
        recensioni.innerHTML = data[0].recensioni;    

    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
    }
    
}

request.send();
