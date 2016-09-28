AddBranchCtrl.$inject = ['$scope', '$state'];

function AddBranchCtrl($scope, $state) {
  $scope.size='small';
  $scope.type='circle';
  $scope.imageDataURI='';
  $scope.resImageDataURI='';
  $scope.resImgFormat='image/*';
  $scope.resImgQuality=1;
  $scope.selMinSize=100;
  $scope.resImgSize=200;
  //$scope.aspectRatio=1.2;
  $scope.onChange=function($dataURI) {
    console.log('onChange fired');
  };
  $scope.onLoadBegin=function() {
    console.log('onLoadBegin fired');
  };
  $scope.onLoadDone=function() {
    console.log('onLoadDone fired');
  };
  $scope.onLoadError=function() {
    console.log('onLoadError fired');
  };
  var handleFileSelect=function(evt) {
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.imageDataURI=evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
  $scope.$watch('resImageDataURI',function(){
    //console.log('Res image', $scope.resImageDataURI);
  });

  $scope.menu_data = [];
  

  $scope.menu_data = branch_menu;
  $scope.menu = branch_menu[0];
  $scope.users = [];

  $scope.new_user = {name: '', phone: ''};


  $scope.onAddUser = function() {
    if ($scope.new_user.name == '')
      return;
    $scope.new_user.phone = "+" + $scope.new_user.phone;
    $scope.users.push($scope.new_user);
    $scope.new_user = {name: '', phone: ''};
  }

  $scope.onSubmit = function () {
    new_item = {};
    new_item.branch_name = $scope.$$childTail.branch_name;

    new_item.users = "";
    $scope.users.forEach(function(user) {
      new_item.users += (user.name + ",");
    });
    new_item.users = new_item.users.slice(0, -1);
    
    new_item.last_sale = "";

    manage_branch_table_items.push(new_item);

    $state.go('app.managebranch');
  }

  $scope.onCancel = function () {
    $state.go('app.managebranch');
  }
}