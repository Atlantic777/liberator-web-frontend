module.exports = [
    '$http',
    'API_URL',
    '$q',
    '$window',

    function userService($http, API_URL, $q, $window) {
      'use strict';
        function getUsers() {
            return $http.get(API_URL + 'users/').then(function(value) {
              return value.data;
            });
        }

        function getUser(user_id) {
            return $http.get(API_URL + 'users/' + user_id + '/');
        }

        return {
            getUsers : getUsers,
            getUser  : getUser,
        };
    }
];
