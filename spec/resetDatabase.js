'use strict'

var async = require('async');

var resetDatabase function(dbsession, callback){
  async.series(
    [
      function(callback){
        dbsession.remove('keyword', '1', function(err){
          callback(err);
        });
      },

      function(callback) {
        dbsession.remove('category', '1', function(err){
          callback(err);
        });
      }
    ],
    function (err, results){
      callback(err);
    }
  );
}

module.exports = resetDatabase;
