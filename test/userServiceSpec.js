var users_response = [{"id":2,"email":"john.doe@example.com","first_name":"John","last_name":"Doe","is_active":true,"groups":[],"user_permissions":[]},{"id":4,"email":"super.user@example.com","first_name":"Super","last_name":"User","is_active":true,"groups":[],"user_permissions":[]},{"id":1,"email":"admin@example.com","first_name":"","last_name":"","is_active":true,"groups":[],"user_permissions":[]}];

var users_endpoint = "http://192.168.66.6:8000/api/v1/users/";

describe('getting list of users', function() {
  'use strict';
  var $myService, $httpBackend, users, handler, $http;

  beforeEach(module('Liberator'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get("$httpBackend");
    $httpBackend.when("GET", "scripts/auth/views/login.html").respond("");
    $httpBackend.when("GET", users_endpoint).respond(users_response);

    $http = $injector.get("$http");
    users = $injector.get("users");
  }));

  it('fetches all users', function() {
    var users_data;

    users.getUsers().then(function(users) {
      users_data = users;
    });
    $httpBackend.flush();

    expect(users_data[0].email).toEqual("john.doe@example.com");
  });
});
