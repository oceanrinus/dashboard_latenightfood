ModalCtrl.$inject = ['$scope', '$uibModal', '$log'];

function ModalCtrl	($scope, $uibModal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.menu_data = branch_menu;

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/pages/menu.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        menu_data: function () {
          return $scope.menu_data;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}