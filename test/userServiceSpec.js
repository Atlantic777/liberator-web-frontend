'use strict';

describe('getting list of users', function() {
  var $myService, $httpBackend, users, handler, $http;

  beforeEach(module('Liberator'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get("$httpBackend");
    handler = $httpBackend.when("GET", "/api/v1/user")
      .respond("Hello world!");

    $httpBackend.when("GET", "scripts/auth/views/login.html").respond("");
    $httpBackend.when("GET", "http://192.168.66.6:8000/api/v1/users/").respond("hello");

    $http = $injector.get("$http");

    users = $injector.get("users");
  }))

  it('fetches all users', function() {
    $httpBackend.when("GET", "a").respond("");

    $http.get("a").success(function(value) {
      console.log("yaay");
      console.log(value);
    });

    console.log("hello");

    users.getUsers().then(function(value){
      console.log(value);
    });
    $httpBackend.flush();

  });
});
