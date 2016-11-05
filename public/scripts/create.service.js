angular.module('flashcardApp')
  .service('CreateService', CreateService);

function CreateService($http) {
  var service = this;

  service.createSet = function(setInfo) {
    console.log('Service received:', setInfo)
    return $http({
      method: 'POST',
      url: '/flashcards/set',
      data: setInfo
    }).then(function() {
      console.log('POST successful');
    });
  };

}
