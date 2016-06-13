'use strict';

(function(){
  var app =angular.module('app');

  app.controller('KeywordsController', function($scope, Repositoryfactory, resolveEntity){
    //front end init
    //resolveEntity is a helper function that is used in partials/*html to display
    //the keyword category based on its id
    $scope.resolveEntity = resolveEntity;

    //a repository is the connection between this cotroller and the rest api
    var KeywordCategoriesRepository = new Repositoryfactory({
      endpoint: 'keywords/categories',
      retrieveItems: function(data){
        return data._items;
      }
    });

    // one for keywords also
    var KeywordsRepository = new Repositoryfactory({
      endpoint: 'keywords',
      retrieveItems: function(data){
        return data._items;
      }
    });

    //when the frontend load we want the cotroller to immediately load all
    //keyword categories and categories from the api
    KeywordCategoriesRepository.readAll().then(function(keywordCategories){
      $scope.keywordCategories = keywordCategories;
      KeywordsRepository.readAll().then(function(keywords){
        $scope.keywords = keywords;
      });
    });

    //the grid code
    $scope.keywordsGridOptions = {
      data: 'keywords',
      enableCellSelection: false,
      enableCellEdit: true,
      keepLastSelected: false,
      enableRowSelection: false,
      multiSelect: false,
      enableSorting: true,
      enableColumnResize:true,
      enableColumnReordering: true,
      showFilter: false,
      rowHeight: '40',
      columnDefs: [
        {
          field: 'id',
          displayName: 'ID',
          enableCellEdit: false,
          width: '80px'
        },
        {
          field: 'value',
          displayName: 'Value'
        },
        {
          //The keyword category field does not use the build in cell template
          field: 'keywordCategoryID',
          displayName: 'Category',
          cellTemplate: 'app/keywords/partials/keywordsCategoryGridCell.html',
          editableCellTemplate: 'app/keywords/partials/keywordCategoryGridCellEditor.html'
        },
        {
          //same for the operations column
          field: '',
          displayName: 'Operations',
          cellTemplate: 'app/keywords/partials/operationsGridCell.html',
          enableCellEdit: false,
          sortable: false
        }
      ]
    };

    //frontend operations called when the frontend operations is operated
    $scope.createKeyword = function(newKeyword) {
      $scope.$broadcast('ngGridEventEndCellEdit');
      if(newKeyword.value.length > 0){
        KeywordsRepository.createOne(newKeyword).then(function(){
          KeywordsRepository.readAll().then(function(keywords){
            $scope.keywords = keywords;
          });
        });
      }
    };

    $scope.updateKeyword = function(keyword){
      $scope.$broadcast('ngGridEventEndCellEdit');
      KeywordsRepository.updateOne(keyword);
    };

    $scope.deleteKeyword = function(keyword){
      $scope.$broadcast('ngGridEventEndCellEdit');
      KeywordsRepository.deleteOne(keyword).then(function(){
        KeywordsRepository.readAll().then(function(keywords){
          $scope.keywords = keywords;
        });
      });
    };

    //functions to make the grid word for the category selects
    $scope.stopEditingKeywordCategory = function(){
      $scope.$broadcast('ngGridEventEndCellEdit');
    };

    $scope.$on('ngGridEventRows', function(newRows){
      $scope.$broadcast('ngGridEventEndCellEdit');
    });
  });
})();
