var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

var MongoClient = require("mongodb").MongoClient;
const { request, response } = require("express");
var CONNECTION_STRING = "mongodb+srv://admin:LaC8ubnAvlGxSOnv@cluster0.bnp7x.mongodb.net/test?authSource=admin&replicaSet=atlas-u1s8jo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

var DATABASE = "test01";
var database;
var ObjectId = require('mongodb').ObjectId; 

var crypto = require('crypto');

var cors = require('cors');
const { stringify } = require("querystring");
app.use(cors());

app.listen(49146, () => {

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
    })
    console.log("APIs Running");
});


function refGenerator(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.get('/', (request, response) => {
    response.json('Hello World');
})


app.get('/api/annunci', (request, response) => {                                    //Ritorna annunci

    database.collection("Annunci").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })

})

app.get('/api/annunci/test', (request, response) => {                                    //Ritorna annunci test

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        //console.log("Mongo DB Connection Successfull");
        database.collection("AnnunciTest").find({}).toArray((error, result) => {
            if (error) {
                console.log(error);
            }

            result = JSON.parse(JSON.stringify(result));
            response.status(200).send(result);
        });
    });

})


app.get('/api/annunci/count', (request, response) => {                                    //Ritorna numero annunci

    database.collection("Annunci").count({}, function (error, numOfDocs) {
        if (error) {
            console.log(error);
        }
        
        var c = numOfDocs;
        console.log(c);
        response.json(c);
        
    })

})

app.get('/api/utenti', (request, response) => {                                    //Ritorna utenti

    database.collection("Utenti").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })

})


app.get('/api/utenti/:id', (request, response) => {                                    //Ritorna info di uno specifico utente

    const id = ObjectId(request.params.id);
    database.collection("Utenti").find({"_id": id}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }
        //console.log(request.body['id']);
        response.send(result);
    })

})

app.get('/api/annunci/:id', (request, response) => {                                    //Ritorna info di uno specifico annuncio

    const id = ObjectId(request.params.id);
    database.collection("Annunci").find({"_id":id}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(request.body['id']);
        response.send(result);
    })

})


app.get('/api/utenti/annunci/:id', (request, response) => {                             //Ritorna annunci creati da un certo utente
    
    const id = ObjectId(request.params.id);
    database.collection("Annunci").find({"_idProprietario": id}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(request.body['idProprietario']);
        response.send(result);
    })

})


app.post('/api/utenti', (request, response) => {            //Crea nuovo utente

    var referral = refGenerator(13);
    var password = request.body['password'];
    var hash = crypto.createHash('sha256').update(password).digest('hex');

    database.collection("Utenti").insertOne({
        email: request.body['email'],
        passwordHash: hash,
        refCode: referral,
        invitedBy: request.body['invitedBy'],
        preferiti: [],
        recensioni: 0,
        badges: [],
        foto: "foto"
    });
    response.json("Added Successfully");

})


app.post('/api/annunci', (request, response) => {               //Crea nuovo annuncio

    database.collection("Annunci").insertOne({
        _idProprietario: ObjectId(request.body['idProprietario']),          //??    
        titolo: request.body['titolo'],
        descrizione: request.body['descrizione'],
        costo: request.body['costo'],
        luogo: request.body['luogo'],
        categoria: request.body['categoria'],
        foto: request.body['foto'],                                         //??    Array di stringhe
        voti: [],
        segnalazioni: 0,
        sponsorizzato: false,
        nascosto: false
    });

    response.json("Added Successfully");

})


app.post('/api/annunci/test', (request, response) => {               //Crea nuovo annuncio test

    database.collection("AnnunciTest").insertOne({
        _idProprietario: ObjectId(request.body['idProprietario']),          //??    
        titolo: request.body['titolo'],
        descrizione: request.body['descrizione'],
        costo: request.body['costo'],
        luogo: request.body['luogo'],
        categoria: request.body['categoria'],
        foto: request.body['foto'],                                         //??    Array di stringhe
        voti: [],
        segnalazioni: 0,
        sponsorizzato: false,
        nascosto: false
    });

    response.json("Added Successfully");

})


app.put('/api/utenti', (request, response) => {

    console.log(request.body['id']);

    database.collection("Utenti").updateOne(
        {
            "_id": ObjectId(request.body['id'])
        },
        {
            $set:
            {
                "email": request.body['email'],
                "passwordHash": request.body['password'],
                "foto": "foto"
            }

        }
    );

    response.json("Updated Successfully");
})


app.put('/api/annunci', (request, response) => {

    database.collection("Annunci").updateOne(
        {
            "_id": ObjectId(request.body['id'])
        },
        {
            $set:
            {
                "titolo": request.body['titolo'],
                "descrizione": request.body['descrizione'],
                "costo": request.body['costo'],
                "luogo": request.body['luogo'],
                "categoria": request.body['categoria'],
                "foto": "foto",
            }

        }
    );

    response.json("Updated Successfully");
})


app.delete('/api/utenti/:id', (request, response) => {

    const id = ObjectId(request.params.id);
    database.collection("Utenti").deleteOne( {"_id": id} );
    response.json("Deleted Successfully");

})


app.delete('/api/annunci/:id', (request, response) => {

    const id = ObjectId(request.params.id);
    database.collection("Annunci").deleteOne( {"_id":id} );
    response.json("Deleted Successfully");
    
})

