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

            $scope.tempArtists.artists.map(function(obj, index, arr){ 
                return( index < 6 ?  $scope.data.push({"image_url": 'http://iscale.iheart.com/catalog/artist/' + obj.artistId + '?ops=fit(250,0)', "name" : obj.artistName}) : $scope.data);
            });
           
        })
        .error(function(data) {
            console.log('Error: ', data);
        });
   
    };

}

