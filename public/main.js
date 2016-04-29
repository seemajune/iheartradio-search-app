var radioSearch = angular.module('radioSearch', []);

function mainController($scope, $http) {
    $scope.formData = {},
    $scope.data = [];

    $scope.createSearch = function() {
        $http.get('search/' + $scope.formData.artist)
        .success(function(data) {
            $scope.formData = {};
            $scope.data = [];
            $scope.tempArtists = JSON.parse(data.body);
        
            $scope.tempArtists.artists.map(function(info, artist){ return($scope.data.length < 6 ? $scope.data[artist] = info : $scope.data);});
            console.log($scope.data);
        })
        .error(function(data) {
            console.log('Error: ', data);
        });
   
    };

}

