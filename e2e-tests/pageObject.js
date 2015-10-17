'use strict';

var angularHomepage = function() {
  var greeting = element(by.binding('greeting'));

  this.get = function() {
    browser.get('http://192.168.66.6:9000');
  };

  this.getGreeting = function() {
    return greeting.getText();
  };
};

var authPage = function() {
  var email    = element(by.name('email'));
  var password = element(by.name('password'));
  var button   = element(by.name('loginButton'));

  this.get = function() {
    browser.get('http://192.168.66.6:9000/#/auth/login');
  };

  this.getEmail = function() {
    return email.getAttribute('value');
  };

  this.getPassword = function() {
    return password.getAttribute('value');
  };

  this.setEmail = function(value) {
    email.sendKeys(value);
  };

  this.setPassword = function(value) {
    password.sendKeys(value);
  };

  this.clickLogin = function(value) {
    button.click();
  };

  this.login = function() {
    this.setEmail('admin@example.com');
    this.setPassword('Sekrit');
    this.clickLogin();
  }

};

describe('test redirect to auth', function() {
  it('should use a page object', function() {
    var homepage = new angularHomepage();

    homepage.get();
    browser.getCurrentUrl().then(function(value) {
      expect(value).toEqual("http://192.168.66.6:9000/#/auth/login");
    });
  });

  it('should login successfully', function() {
    var auth = new authPage();
    auth.get();

    auth.setEmail('admin@example.com');
    expect(auth.getEmail()).toEqual("admin@example.com");

    auth.setPassword("Sekrit");
    expect(auth.getPassword()).toEqual("Sekrit");

    auth.clickLogin();

    browser.getCurrentUrl().then(function(value) {
      expect(value).toEqual("http://192.168.66.6:9000/#/");
    });
  });

});

describe('landing page', function() {
  beforeEach = function() {
    var auth = new authPage();
    auth.login();
  };

  it('should show greeting', function() {
    var home = new angularHomepage();
    home.get();

    expect(home.getGreeting()).toEqual("Hello from scope");
  })
});
