'use strict';

/**
 * @ngdoc function
 * @name abdulwahedAlansariFrontendApp.controller:QuotesCtrl
 * @description
 * # QuotesCtrl
 * Controller of the abdulwahedAlansariFrontendApp
 */
angular.module('abdulwahedAlansariFrontendApp')
  .controller('QuotesCtrl', function ($firebaseArray, FIREBASE_REF) {

    var quotes = this.quotes = $firebaseArray(FIREBASE_REF.child('quotes'));

    var editing = null;

    this.isEditing = function (quoteId) { return editing === quoteId; };

    this.edit = function (quoteId) { editing = quoteId; };

    var cancel = this.cancel = function () { editing = null; };

    this.update = function (quote) {
      cancel();
      quotes.$save(quote);
    };
  });
