ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'menu_data'];

function ModalInstanceCtrl ($scope, $uibModalInstance, menu_data) {

  $scope.menu_data = menu_data;
  $scope.selected_menu = $scope.menu_data[0]

  $scope.ok = function () {
    $uibModalInstance.close($scope.menu);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.onChange = function () {
    /*$uibModalInstance.dismiss('cancel');*/
  };

  $scope.menuChanged = function(){

  }
  $scope.onApply = function () {
    $scope.menu_data[$scope.menu_data.indexOf($scope.selected_menu)] = angular.copy($scope.changed_menu);
    $scope.selected_menu=angular.copy($scope.changed_menu);
  };
  $scope.onCancel = function () {
    /*$uibModalInstance.dismiss('cancel');*/
  };
  $scope.onAdd = function () {
    $scope.menu_data.push($scope.new_menu);
    $scope.new_menu = '';
  };
}

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}