angular.module('flashcardApp')
  .factory('alert', function($uibModal) {

    function show(action, event) {
      return $uibModal.open({
        templateUrl: 'views/modalContent.html',
        controller: function() {
          console.log('modal ctrl loaded');
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };

  });
