exports.config = {
  allScriptsTimeout: 11000,

  specs: [
      '*.js'
    ],

  capabilities: {
      'browserName': 'firefox'
    },

  baseUrl: 'http://192.168.66.6:9000/',
  seleniumAddress : 'http://127.0.0.1:4444/wd/hub',

  framework: 'jasmine',

  jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    },
};
