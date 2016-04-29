var radioSearch = angular.module('radioSearch', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $scope.createSearch = function() {
        $http.get('search/' + $scope.formData.artist)
        .success(function(data) {
            $scope.data = JSON.parse(data.body);
            console.log($scope.data); 
        })
        .error(function(data) {
            console.log('Error: ', data);
        });
   
    };

}

