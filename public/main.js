var radioSearch = angular.module('radioSearch', []);

function mainController($scope, $http) {
    $scope.formData = {},
    $scope.artists = [{
        'image_url': 'http://iscale.iheart.com/catalog/artist/744880?ops=fit(250,0)',
        'description': 'Feat. August Alsina, Jeremih and more',
        'name': 'The Weeknd'}, 
        { 'image_url': 'http://iscale.iheart.com/catalog/artist/57706?ops=fit(250,0)',
        'description': 'Feat. Ariana Grande, Demi Lovato and more',
        'name': 'Selena Gomez'},
        { 'image_url': 'http://iscale.iheart.com/catalog/artist/30005067?ops=fit(250,0)',
        'description': 'Feat. Nelly, Lyaz, Wiz Khalifia and more',
        'name': 'R. City'},
        { 'image_url': 'http://iscale.iheart.com/catalog/artist/44368?ops=fit(250,0)',
        'description': 'Feat. Shawnn Mendes, One Direction and more',
        'name': 'Justin Beiber' },
        { 'image_url': 'http://iscale.iheart.com/catalog/artist/43557?ops=fit(250,0)',
        'description': 'Feat. Lyaz, Dillon Francis & DJ Snake and more',
        'name': 'Major Lazer'},
        { 'image_url': 'http://iscale.iheart.com/catalog/artist/33221?ops=fit(250,0)',
        'description': 'Feat. Meghan Trainor, Katy Perry and more',
        'name': 'Taylor Swift'}
    ];

    $scope.createSearch = function() {
        $http.get('search/' + $scope.formData.artist)
        .success(function(data) {
            $scope.formData = {};
            $scope.artists = [];
            $scope.tempArtists = JSON.parse(data.body);

            $scope.tempArtists.artists.map(function(obj, index){ 
                return( index < 6 ?  $scope.artists.push({'image_url': 'http://iscale.iheart.com/catalog/artist/' + obj.artistId + '?ops=fit(250,0)', 'name' : obj.artistName, "radio_link" : "http://www.iheart.com/artist/" + obj.artistName.replace(/[^a-zA-Z-]/g, "-") + "-" + obj.artistId}) : $scope.artists);
            });   
        })

        .error(function(data) {
            console.log('Error: ', data);
        });
   
    };

}

