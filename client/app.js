var app = angular.module('app', []);
app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.cat = {};
    $scope.cats = [];

    var fetchCats = function(){
        return $http.get('/cats').then(function(response){
            if (response.status !== 200){
                throw new Error ('Failed to fetch cats from the API');
            }
            $scope.cat = {};
            $scope.cats = response.data;
            return response.data;
        });
    };

    $scope.add = function(cat){
        return $http.post('/add', cat).then(function() {
                console.log('Added');
                fetchCats();
            }
        );
    };

    fetchCats();
}]);