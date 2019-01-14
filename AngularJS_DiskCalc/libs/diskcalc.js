    var app = angular.module('myApp', []);
    app.controller('myCtrl', function ($scope) {
      $scope.units = [{
          site: "1000",
          unit: "KB"
        },
        {
          site: "1000000",
          unit: "MB"
        },
        {
          site: "1000000000",
          unit: "GB"
        },
        {
          site: "1000000000000",
          unit: "TB"
        },
        {
          site: "1000000000000000",
          unit: "PB"
        },
        {
          site: "1000000000000000000",
          unit: "EB"
        }
      ];
    });
