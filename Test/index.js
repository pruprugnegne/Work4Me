var test = require('tape');
var request = require('supertest');
var app = require('../API');

test('Test 1: Annunci ritornati correttamente', function (assert) {

    request(app)
        .get('/api/annunci/test')
        .expect('Content-Type', /json/)     //array?
        .expect(200)
        .end(function (err, res) {
            /*
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
            */

            var isNotZero = false;
            var count = res.body.length;
            //console.log("\n\n\n\nNumero el: " + count);
            
            if(count > 0){
              isNotZero = true;
            }

            assert.error(err, 'Nessun errore');
            assert.equal(true, isNotZero, 'Valori di ritorno conformi a quelli previsti');
            assert.end();
        });

});

test('Test 2: Annuncio aggiunto correttamente', function (assert) {

  request(app)
      .post('/api/annunci/test')
      .send({
        "_idProprietario": "000000000000000000000000", "titolo": "TitoloTesting", "descrizione": "Testing",
        "costo": "0", "luogo" : "LuogoTesting", "categoria" : "CategoriaTesting", "foto" : "FotoTesting", "voti" : [], 
        "segnalzioni" : 0, "sponsorizzato" : false, "nascosto" : "false"
      })
      .end((err, res) => {

          if (err) {
              reject(new Error('Errore durante la creazione di un nuovo annuncio, err: ' + err))
          }

          assert.error(err, 'Nessun errore');
          assert.isEqual("Added Successfully", res.body, "Valori inseriti come previsto")
          assert.end();
      });

});