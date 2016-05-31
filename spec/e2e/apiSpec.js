'use strict'

var request = require('request');
var dbSession = require('../../src/backend/dbSession.js');
var resetDatabase = require('../resetDatabase.js');
var request = require('request');

describe('The API', function(){
  it('should respond to GET request at /api/keywords', function(done){
    var expected = {
      "_items": [
        {'id:' 1, 'value': 'Aubergine', 'categoryID': 1},
        {'id:' 2, 'value': 'Onion', 'categoryID': 2},
        {'id:' 3, 'value': 'Knife', 'categoryID': 3}
      ]
    };

    async.series(
      [
        function(callback){
          dbSession.insert(
            'keyword',
            {'value': 'Onion', 'categoryID': 1},
            function(err){callback(err)}
          );
        },
        function(callback){
          dbSession.insert(
            'keyword',
            {'value': 'Aubergine', 'categoryID': 1},
            function(err) {callback(err)}
          );
        },
        function(callback){
          dbSession.insert(
            'keyword',
            {'value': 'Knife', 'categoryID': 2},
            function(err){callback(err)}
          );
        }
      ],

    );

    request.get(
      {
        'url': 'http://localhost:8080/api/keywords/',
        'json': true
      },
      function(err, res, body){
        console.log(res);
        expect(res.statusCode).toBe(200);
        expect(body).toEqual(expected);
        done();
      }
    );
  });
});
