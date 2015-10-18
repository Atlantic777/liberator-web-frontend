'use strict';

var HomePage = function() {
  var greeting = element(by.binding('greeting'));
  var menubar  = element(by.name('menubar'));

  this.get = function() {
    browser.get('/');
  };

  this.getGreeting = function() {
    return greeting.getText();
  };

  this.getMenubar = function() {
    return menubar;
  };
};

var AuthPage = function() {
  var email    = element(by.name('email'));
  var password = element(by.name('password'));
  var button   = element(by.name('loginButton'));

  this.get = function() {
    browser.get('/#/auth/login');
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

var NewArticlePage = function() {

  this.get = function() {
    browser.get("/#/new_article/")
  }

};

describe('test redirect to auth', function() {
  it('should use a page object', function() {
    var homepage = new HomePage();

    homepage.get();
    browser.getCurrentUrl().then(function(value) {
      expect(value).toEqual("http://192.168.66.6:9000/#/auth/login");
    });
  });

  it('should login successfully', function() {
    var auth = new AuthPage();
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
    var auth = new AuthPage();
    auth.login();
  };

  it('should show greeting', function() {
    var home = new HomePage();
    home.get();

    expect(home.getGreeting()).toEqual("Hello from scope");
  })

  it('should have menubar', function() {
    var home = new HomePage();
    home.get();

    expect(home.getMenubar().isPresent()).toBe(true);
  });
});