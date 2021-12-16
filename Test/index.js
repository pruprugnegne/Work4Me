var test = require('tape');
var request = require('supertest');
var app = require('../API');

test('Test 1: Annunci ritornati correttamente', function (assert) {

    request(app)
        .get('/api/annunci/test')
        .expect('Content-Type', /json/)     //array?
        .expect(200)
        .end(function (err, res) {

            var isNotZero = false;
            var count = res.body.length;
            
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
        "_idProprietario": "000000000000000000000001", "titolo": "TitoloTesting", "descrizione": "Testing",
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