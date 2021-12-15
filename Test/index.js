var test = require('tape');
var request = require('supertest');
var app = require('../API');

test('Annunci ritornati correttamente', function (assert) {

    request(app)
        .get('/api/annunci/test')
        .expect('Content-Type', /json/)     //array?
        .expect(200)
        .end(function (err, res) {
            var expectedUsers = [
              {
                "_id": {
                  "$oid": "61b1b99895c880c19dab8a33"
                },
                "_idProprietario": {
                  "$oid": "313233343536373839303132"
                },
                "titolo": "Dogsitter a Trento",
                "descrizione": "Offro servizi di dogsitting nei pressi di Trento e dintorni",
                "costo": "5",
                "luogo": "Trento",
                "categoria": "AnimaliDomestici",
                "foto": "foto",
                "voti": [
                  "4",
                  "5"
                ],
                "segnalazioni": 0,
                "sponsorizzato": true,
                "nascosto": false
              },{
                "_id": {
                  "$oid": "61b1c0baa1f86a1ede42740d"
                },
                "_idProprietario": {
                  "$oid": "61af3a1ed80d6205e1439553"
                },
                "titolo": "Curo il tuo giardino",
                "descrizione": "Servizi di giardinaggio per terreni di piccole-medie dimensioni",
                "costo": "7.5",
                "luogo": "Civezzano",
                "categoria": "Giardinaggio",
                "foto": "foto",
                "voti": [],
                "segnalazioni": 0,
                "sponsorizzato": false,
                "nascosto": false
              },{
                "_id": {
                  "$oid": "61b1c150a1f86a1ede42740e"
                },
                "_idProprietario": {
                  "$oid": "61af3a1ed80d6205e1439553"
                },
                "titolo": "Falciatura dei campi",
                "descrizione": "Offro servizi di giardinaggio per terreni di grandi dimensioni",
                "costo": "10",
                "luogo": "Borgo Valsugana",
                "categoria": "Giardinaggio",
                "foto": "foto",
                "voti": [],
                "segnalazioni": 0,
                "sponsorizzato": false,
                "nascosto": false
              }
            ];

            assert.error(err, 'Nessun errore');
            assert.same(res.body, expectedUsers, 'Valori di ritorno conformi a quelli previsti');
            assert.end();
        });

});