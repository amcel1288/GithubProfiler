(function() {
    'use strict';

    angular
        .module('app')
        .controller('GithubController', GithubController);

    GithubController.$inject = ['$http'];

    /* @ngInject */
    function GithubController($http) {
        var vm = this;

        vm.callGithubApi = callGithubApi;
        
        vm.statusResult = '';
        vm.slinging = '';
        vm.hide = true;
        vm.callRepos = callRepos;
   
     	///////////////

      function callGithubApi(user) {
        $http
            .get('http://api.github.com/users/'+ user +'?access_token=07f3a9b871af225491ddca40cbe768246e56d716')
            .then(function(response) {
              vm.userData = response.data;
              console.log(vm.userData);
              vm.status = vm.userData.hireable;
              vm.slinging = 'Slinging code since ';
              vm.hide = false;
              vm.repos = response.data.repos_url;
              

              if(vm.status == true) {
                vm.statusResult = 'Looking for work';
                vm.statusColor = 'text-success';
              } else {
                vm.statusResult = 'Not looking for work';
                vm.statusColor = 'text-danger';
              }
            })
            .catch(function(error) {
              alert('An error occured downloading from Github');
            });

      }
       function callRepos() {
       console.log(vm.repos +'?access_token=07f3a9b871af225491ddca40cbe768246e56d716')

        $http
            .get(vm.repos +'?access_token=07f3a9b871af225491ddca40cbe768246e56d716')
            .then(function(response) {
            vm.reposData = response.data;
          })
            .catch(function(error) {
              alert('An error occured downloading from Github');
          });

      }
    }
})();
