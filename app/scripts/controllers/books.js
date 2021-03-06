'use strict';

/**
 * @ngdoc function
 * @name abdulwahedAlansariFrontendApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the abdulwahedAlansariFrontendApp
 */
angular.module('abdulwahedAlansariFrontendApp')
  .controller('BooksCtrl', function ($firebaseArray, FIREBASE_REF) {

    var books = this.books = $firebaseArray(FIREBASE_REF.child('books'));

    var editing = null;

    this.isEditing = function (bookId) { return editing === bookId; };

    this.edit = function (bookId) { editing = bookId; };

    var cancel = this.cancel = function () { editing = null; };

    this.update = function (book) {
      cancel();
      books.$save(book);
    };
  });
