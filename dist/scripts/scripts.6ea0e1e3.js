"use strict";angular.module("abdulwahedAlansariFrontendApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","firebase","angular-loading-bar","monospaced.elastic","ckeditor","imgurUpload","ui.bootstrap"]).config(["msdElasticConfig",function(a){a.append="\n"}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/homepage.html",controller:"HomepageCtrl",controllerAs:"vm"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"vm"}).when("/quotes",{templateUrl:"views/quotes.html",controller:"QuotesCtrl",controllerAs:"vm"}).when("/quotes/new",{templateUrl:"views/quotes_new.html",controller:"QuotesNewCtrl",controllerAs:"vm"}).when("/articles",{templateUrl:"views/articles.html",controller:"ArticlesCtrl",controllerAs:"vm"}).when("/articles/new",{templateUrl:"views/articles_new.html",controller:"ArticlesNewCtrl",controllerAs:"vm"}).when("/article/:id/:action?",{templateUrl:"views/article.html",controller:"ArticleCtrl",controllerAs:"vm"}).when("/books",{templateUrl:"views/books.html",controller:"BooksCtrl",controllerAs:"vm"}).when("/books/new",{templateUrl:"views/books_new.html",controller:"BooksNewCtrl",controllerAs:"vm"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"})}]),angular.module("abdulwahedAlansariFrontendApp").controller("AboutCtrl",["$window","$firebaseObject","FIREBASE_REF","UserService",function(a,b,c,d){var e=b(c.child("about")),f=this;e.$loaded().then(function(){f.aboutHTML=e.$value}),this.isEnabled=a.CKEDITOR&&a.CKEDITOR.env.isCompatible,this.isVisitor=d.isVisitor,this.isAdmin=d.isAdmin,this.save=function(){var a=function(){d.setVisitor()};e.$value=this.aboutHTML,e.$save().then(a,a)}}]),angular.module("abdulwahedAlansariFrontendApp").controller("HomepageCtrl",function(){}),angular.module("abdulwahedAlansariFrontendApp").controller("QuotesCtrl",["$firebaseArray","FIREBASE_REF","UserService",function(a,b,c){var d=this.quotes=a(b.child("quotes")),e=null;this.isEditing=function(a){return e===a},this.edit=function(a){e=a};var f=this.cancel=function(){e=null};this.update=function(a){f(),d.$save(a)},this.isVisitor=c.isVisitor,this.isAdmin=c.isAdmin}]),angular.module("abdulwahedAlansariFrontendApp").controller("NavbarCtrl",["$location","UserService",function(a,b){function c(b){var c=a.path();return Array.isArray(b)?b.indexOf(c)>=0:c===b}this.getClass=function(a){return c(a)?"active":null},this.setVisitor=b.setVisitor,this.setAdmin=b.setAdmin,this.isVisitor=b.isVisitor,this.isAdmin=b.isAdmin}]),angular.module("abdulwahedAlansariFrontendApp").controller("ArticlesCtrl",["$firebaseArray","FIREBASE_REF","UserService",function(a,b,c){this.articles=a(b.child("articles")),this.isVisitor=c.isVisitor,this.isAdmin=c.isAdmin}]),angular.module("abdulwahedAlansariFrontendApp").controller("ArticleCtrl",["$routeParams","$location","$document","$firebaseObject","FIREBASE_REF","UserService",function(a,b,c,d,e,f){function g(a){var b=parseInt(j.style.fontSize)||12;j.style.fontSize=b+a+"px"}var h=d(e.child("articles/"+a.id)),i=this,j=c[0].getElementById("articleText");this.decreaseFont=function(){g(-2)},this.increaseFont=function(){g(2)},this.resetFont=function(){j.style.fontSize="12px"},this.isVisitor=f.isVisitor,this.isAdmin=f.isAdmin,h.$loaded().then(function(){i.article=h}).then(null,function(){b.path("/articles")}),this.isEditing=function(){return"edit"===a.action},this.save=function(){var c=function(){b.path("/article/"+a.id)};h.$save().then(c,c)},this.destroy=function(){var a=function(){b.path("/articles")};h.$remove().then(a,a)}}]),angular.module("abdulwahedAlansariFrontendApp").controller("BooksCtrl",["$firebaseArray","FIREBASE_REF","UserService",function(a,b,c){var d=this.books=a(b.child("books"));this.isVisitor=c.isVisitor,this.isAdmin=c.isAdmin;var e=null;this.isEditing=function(a){return e===a},this.edit=function(a){e=a};var f=this.cancel=function(){e=null};this.update=function(a){f(),d.$save(a)}}]),angular.module("abdulwahedAlansariFrontendApp").controller("BooksNewCtrl",["$location","FIREBASE_REF",function(a,b){var c=b.child("books");this.create=function(b){c.push(b),a.path("/books")}}]),angular.module("abdulwahedAlansariFrontendApp").constant("FIREBASE_REF",new Firebase("https://abdulwahed-alansari.firebaseio.com")),angular.module("abdulwahedAlansariFrontendApp").controller("ArticlesNewCtrl",["$location","$document","ImageService","FIREBASE_REF",function(a,b,c,d){function e(b){f.push(b),a.path("/articles")}var f=d.child("articles"),g=this;this.create=function(a){var d=b[0].getElementById("articleImage"),f=d.files.item(0);f?(g.uploading=!0,c.upload(f).then(function(b){g.uploading=!1,a.image=b,e(a)}).then(null,null,function(a){g.progress=a})):e(a)}}]),angular.module("abdulwahedAlansariFrontendApp").controller("QuotesNewCtrl",["$location","FIREBASE_REF",function(a,b){var c=b.child("quotes");this.create=function(b){c.push(b),a.path("/quotes")}}]),angular.module("abdulwahedAlansariFrontendApp").controller("ContactCtrl",["$location","$firebaseArray","FIREBASE_REF","UserService",function(a,b,c,d){var e=c.child("contacts");this.contacts=b(e),this.isVisitor=d.isVisitor,this.isAdmin=d.isAdmin,this.create=function(b){e.push(b),a.path("/")}}]),angular.module("abdulwahedAlansariFrontendApp").service("UserService",["$window",function(a){function b(b){return b?a.localStorage.setItem("userRole",b):a.localStorage.getItem("userRole")}this.isVisitor=function(){var a=b();return!a||"visitor"===a},this.isAdmin=function(){return"admin"===b()},this.setVisitor=function(){return b("visitor")},this.setAdmin=function(){return b("admin")}}]),angular.module("abdulwahedAlansariFrontendApp").service("ImageService",["imgurUpload",function(a){a.setClientId("4c46e8ba7a36fc6"),this.upload=function(b){return a.upload(b).then(function(a){return{name:b.name,url:a.data.link.replace(/^http:/,"https:")}})}}]),angular.module("abdulwahedAlansariFrontendApp").filter("truncate",function(){return function(a,b){if(b=b||100,!a||"string"!=typeof a||"number"!=typeof b||0>=b)return"";var c=a.split(" ");if(c.length<=b)return a;var d=c.slice(0,b),e=d.join(" ");return e+"..."}}),angular.module("abdulwahedAlansariFrontendApp").run(["$templateCache",function(a){a.put("views/about.html",'<header class="page-header"> <h1 class="text-center" dir="rtl">من أنا</h1> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li class="active">من أنا</li> </ol> </nav> <section class="container" ng-show="vm.isAdmin()"> <form name="aboutForm" ng-if="vm.isEnabled" ng-submit="vm.save()"> <div class="form-group"> <textarea class="form-control" dir="rtl" autofocus required ng-model="$parent.vm.aboutHTML" ckeditor></textarea> </div> <button type="submit" class="btn btn-block btn-lg btn-primary" ng-disabled="aboutForm.$invalid || aboutForm.$pristine">حفظ</button> </form> <p class="text-center" dir="rtl" ng-hide="vm.isEnabled"> لا يمكن تعديل هذه الصفحة باستخدام الجهاز أو المتصفح المستخدم حالياً. </p> </section> <section class="container" ng-show="vm.isVisitor()"> <div dir="rtl" ng-bind-html="vm.aboutHTML"></div> </section>'),a.put("views/article.html",'<header class="page-header"> <h1 class="text-center" dir="rtl" ng-bind="vm.article.title" ng-hide="vm.isEditing()"></h1> <div class="form-group container" dir="rtl" ng-show="vm.isEditing()"> <label class="sr-only" dir="rtl" for="articleTitle">العنوان</label> <input type="text" class="form-control" dir="rtl" id="articleTitle" ng-model="vm.article.title" placeholder="العنوان" autofocus required> </div> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li><a href="#/articles">مقالات</a></li> <li class="active" ng-bind="vm.article.title"></li> </ol> </nav> <section class="container"> <div class="text-center"> <div class="btn-group"> <button type="button" class="btn btn-default" ng-click="vm.resetFont()"> <span class="glyphicon glyphicon-text-size"></span> </button> <button type="button" class="btn btn-default" ng-click="vm.decreaseFont()"> <span class="glyphicon glyphicon-minus"></span> </button> <button type="button" class="btn btn-default" ng-click="vm.increaseFont()"> <span class="glyphicon glyphicon-plus"></span> </button> </div> </div> </section> <hr> <article> <section class="container"> <div class="thumbnail"> <img ng-src="{{vm.article.image.url}}" alt="{{vm.articl.image.name}}" ng-hide="vm.isEditing()" ng-show="vm.article.image"> <div class="caption"> <pre class="text-right" dir="rtl" id="articleText" ng-bind="vm.article.body" ng-hide="vm.isEditing()"></pre> <div class="form-group" dir="rtl" ng-show="vm.isEditing()"> <label class="sr-only" dir="rtl" for="articleBody">المحتوى</label> <textarea class="form-control" dir="rtl" id="articleBody" placeholder="المحتوى" required ng-model="vm.article.body" msd-elastic>\n          </textarea> </div> </div> </div> </section> <footer class="text-center" ng-show="vm.isAdmin()"> <div class="btn-group" ng-hide="vm.isEditing()"> <button type="button" class="btn btn-sm btn-danger" ng-click="vm.destroy()">حذف</button> <a ng-href="#/article/{{vm.article.$id}}/edit" class="btn btn-sm btn-primary">تعديل</a> </div> <div class="btn-group" ng-show="vm.isEditing()"> <button type="button" class="btn btn-sm btn-danger" ng-click="vm.destroy()">حذف</button> <button type="button" class="btn btn-sm btn-primary" ng-click="vm.save()">حفظ</button> </div> </footer> </article>'),a.put("views/articles.html",'<header class="page-header"> <h1 class="text-center" dir="rtl">مقالات</h1> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li class="active">مقالات</li> </ol> </nav> <section class="container"> <article class="panel panel-default" ng-repeat="article in vm.articles"> <header class="panel-heading text-center"> <a dir="rtl" ng-href="#/article/{{article.$id}}" ng-bind="article.title"></a> </header> <div class="panel-body text-center"> <section class="thumbnail"> <a ng-href="#/article/{{article.$id}}" alt="{{article.image.name}}" ng-show="article.image"> <img ng-src="{{article.image.url}}"> </a> <div class="caption"><pre class="text-right" dir="rtl">{{ article.body | truncate }}</pre></div> </section> </div> <footer class="panel-footer text-center" ng-show="vm.isAdmin()"> <div class="btn-group"> <button type="button" class="btn btn-sm btn-danger" ng-click="vm.articles.$remove(article)">حذف</button> <a ng-href="#/article/{{article.$id}}/edit" class="btn btn-sm btn-primary">تعديل</a> </div> </footer> </article> </section> <hr ng-show="vm.isAdmin()"> <footer class="container" ng-show="vm.isAdmin()"> <a href="#/articles/new" class="btn btn-success btn-lg btn-block">إضافة مقال</a> </footer>'),a.put("views/articles_new.html",'<header class="page-header"> <h1 class="text-center" dir="rtl">إضافة مقال</h1> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li><a href="#/articles">مقالات</a></li> <li class="active">إضافة مقال</li> </ol> </nav> <section class="container" ng-hide="vm.progress"> <form name="articleForm" ng-submit="vm.create(article)"> <div class="form-group" dir="rtl"> <label for="articleTitle">العنوان</label> <input type="text" class="form-control" id="articleTitle" autofocus required ng-model="article.title"> </div> <div class="form-group" dir="rtl"> <label for="articleImage">الصورة</label> <input type="file" class="form-control" id="articleImage"> </div> <div class="form-group" dir="rtl"> <label for="articleBody">المحتوى</label> <textarea class="form-control" id="articleBody" required ng-model="article.body" msd-elastic></textarea> </div> <button type="submit" class="btn btn-block btn-lg btn-success" ng-disabled="articleForm.$invalid || vm.uploading">إضافة المقال</button> </form> </section> <section class="container" ng-show="vm.progress"> <progressbar class="progress-striped" value="vm.progress" type="primary" max="100"></progressbar> </section>'),a.put("views/books.html",'<header class="page-header"> <h1 class="text-center" dir="rtl">كتب</h1> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li class="active">كتب</li> </ol> </nav> <section class="container"> <article class="panel panel-primary" ng-repeat="book in vm.books"> <header class="panel-heading text-center"> <span dir="rtl" ng-bind="book.title" ng-hide="vm.isEditing(book.$id)"></span> <input type="text" class="form-control" dir="rtl" autofocus required ng-model="book.title" ng-show="vm.isEditing(book.$id)"> </header> <div class="panel-body"> <pre dir="rtl" ng-bind="book.description" ng-hide="vm.isEditing(book.$id)"></pre> <textarea class="form-control" dir="rtl" placeholder="الوصف" ng-show="vm.isEditing(book.$id)" ng-model="book.description" msd-elastic>\n      </textarea> </div> <table class="table"> <tbody> <tr> <td class="text-center"> <span ng-bind="book.pages" ng-hide="vm.isEditing(book.$id)"></span> <input type="number" min="1" step="1" class="form-control" dir="rtl" ng-model="book.pages" ng-show="vm.isEditing(book.$id)"> </td> <th class="text-center">عدد الصفحات</th></tr> <tr> <td class="text-center"> <span ng-bind="book.price" ng-hide="vm.isEditing(book.$id)"></span> <input type="number" min="0" step="1" class="form-control" dir="rtl" ng-model="book.price" ng-show="vm.isEditing(book.$id)"> </td> <th class="text-center">السعر</th> </tr> </tbody> </table> <footer class="panel-footer text-center" ng-show="vm.isAdmin()"> <div class="btn-group" ng-hide="vm.isEditing(book.$id)"> <button type="button" class="btn btn-sm btn-danger" ng-click="vm.books.$remove(book)">حذف</button> <button type="button" class="btn btn-sm btn-primary" ng-click="vm.edit(book.$id)">تعديل</button> </div> <div class="btn-group" ng-show="vm.isEditing(book.$id)"> <button type="button" class="btn btn-sm btn-danger" ng-click="vm.books.$remove(book)">حذف</button> <button type="button" class="btn btn-sm btn-primary" ng-click="vm.update(book)">حفظ</button> </div> </footer> </article> </section> <hr ng-show="vm.isAdmin()"> <footer class="container" ng-show="vm.isAdmin()"> <a href="#/books/new" class="btn btn-lg btn-block btn-success">إضافة كتاب</a> </footer>'),a.put("views/books_new.html",'<header class="page-header"> <h1 class="text-center" dir="rtl">إضافة كتاب</h1> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li><a href="#/books">كتب</a></li> <li class="active">إضافة كتاب</li> </ol> </nav> <section class="container"> <form name="bookForm" ng-submit="vm.create(book)"> <div class="form-group" dir="rtl"> <label for="bookTitle">العنوان</label> <input type="text" class="form-control" id="bookTitle" autofocus required ng-model="book.title"> </div> <div class="form-group" dir="rtl"> <label for="bookPages">عدد الصفحات</label> <input type="number" min="1" step="1" class="form-control" id="bookPages" ng-model="book.pages"> </div> <div class="form-group" dir="rtl"> <label for="bookPrice">السعر</label> <input type="number" min="0" step="1" class="form-control" id="bookPrice" ng-model="book.price"> </div> <div class="form-group" dir="rtl"> <label for="bookDescription">الوصف</label> <textarea class="form-control" id="bookDescription" ng-model="book.description" msd-elastic></textarea> </div> <button type="submit" class="btn btn-block btn-lg btn-success" ng-disabled="bookForm.$invalid">إضافة الكتاب</button> </form> </section>'),a.put("views/contact.html",'<header class="page-header"> <h1 class="text-center" dir="rtl">راسلني</h1> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li class="active">راسلني</li> </ol> </nav> <section class="container" ng-show="vm.isAdmin()"> <article class="panel panel-primary" ng-repeat="contact in vm.contacts"> <header class="panel-heading text-center"><span dir="rtl" ng-bind="contact.title"></span></header> <div class="panel-body"><pre dir="rtl" ng-bind="contact.body"></pre></div> <table class="table"> <tbody> <tr><td class="text-center" ng-bind="contact.fullname"></td><th class="text-center">الاسم الكامل</th></tr> <tr> <td class="text-center"> <a target="_blank" ng-href="mailto:{{contact.email}}" ng-bind="contact.email"></a> </td> <th class="text-center">البريد الإلكتروني</th> </tr> </tbody> </table> <footer class="panel-footer text-center"> <button type="button" class="btn btn-sm btn-danger" ng-click="vm.contacts.$remove(contact)">حذف</button> </footer> </article> </section> <section class="container" ng-show="vm.isVisitor()"> <form name="contactForm" ng-submit="vm.create(contact)"> <div class="form-group" dir="rtl"> <label for="contactFullname">الاسم الكامل</label> <input type="text" class="form-control" id="contactFullname" autofocus required ng-model="contact.fullname"> </div> <div class="form-group" dir="rtl"> <label for="contactEmail">البريد الإلكتروني</label> <input type="email" class="form-control" id="contactEmail" required ng-model="contact.email"> </div> <div class="form-group" dir="rtl"> <label for="contactTitle">العنوان</label> <input type="text" class="form-control" id="contactTitle" required ng-model="contact.title"> </div> <div class="form-group" dir="rtl"> <label for="contactBody">المحتوى</label> <textarea class="form-control" id="contactBody" required ng-model="contact.body" msd-elastic></textarea> </div> <button type="submit" class="btn btn-block btn-lg btn-success" ng-disabled="contactForm.$invalid">راسلني</button> </form> </section>'),a.put("views/homepage.html",'<div class="jumbotron container-fluid text-center" style="margin-top: -4em"> <h1>عبدالواحد الأنصاري</h1> <p><a class="btn btn-success btn-lg" href="#/about" role="button">من أنا</a></p> </div>'),a.put("views/quotes.html",'<header class="page-header"> <h1 class="text-center" dir="rtl">مقتطفات</h1> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li class="active">مقتطفات</li> </ol> </nav> <section class="container text-center"> <article class="panel panel-default" ng-repeat="quote in vm.quotes"> <div class="panel-body"> <pre dir="rtl" ng-bind="quote.text" ng-hide="vm.isEditing(quote.$id)"></pre> <textarea class="form-control" dir="rtl" autofocus required ng-show="vm.isEditing(quote.$id)" ng-model="quote.text" msd-elastic>\n      </textarea> </div> <div class="panel-footer" ng-show="vm.isAdmin()"> <div aria-label="إدارة مقتطف" class="btn-group" role="group" ng-show="vm.isEditing(quote.$id)"> <button type="button" class="btn btn-sm btn-danger" ng-click="vm.quotes.$remove(quote)">حذف</button> <button type="button" class="btn btn-sm btn-primary" ng-click="vm.update(quote)">حفظ</button> </div> <div aria-label="إدارة مقتطف" class="btn-group" role="group" ng-hide="vm.isEditing(quote.$id)"> <button type="button" class="btn btn-sm btn-danger" ng-click="vm.quotes.$remove(quote)">حذف</button> <button type="button" class="btn btn-sm btn-primary" ng-click="vm.edit(quote.$id)">تعديل</button> </div> </div> </article> </section> <hr ng-show="vm.isAdmin()"> <footer class="container" ng-show="vm.isAdmin()"> <a href="#/quotes/new" class="btn btn-success btn-lg btn-block">إضافة مقتطف</a> </footer>'),a.put("views/quotes_new.html",'<header class="page-header"> <h1 class="text-center" dir="rtl">إضافة مقتطف</h1> </header> <nav class="container" dir="rtl"> <ol class="breadcrumb"> <li><a href="#/">الصفحة الرئيسية</a></li> <li><a href="#/quotes">مقتطفات</a></li> <li class="active">إضافة مقتطف</li> </ol> </nav> <section class="container"> <form name="quoteForm" ng-submit="vm.create(quote)"> <div class="form-group" dir="rtl"> <label for="quoteText">المحتوى</label> <textarea class="form-control" id="quoteText" autofocus required ng-model="quote.text" msd-elastic></textarea> </div> <button type="submit" class="btn btn-block btn-lg btn-success" ng-disabled="quoteForm.$invalid">إضافة المقتطف</button> </form> </section>')}]);