DigitsLoginCtrl.$inject = ['$window', '$scope', '$state', '$http'];

function DigitsLoginCtrl($window, $scope, $state, $http) {

  $scope.menu_data = [];
  $scope.menu = "first";

  $scope.onLoginButtonClick = function() {
    Digits.logIn().done($scope.onLogin).fail($scope.onLoginFailure);
  };

  $scope.onLogin = function(loginResponse) {
    console.log('Digits login succeeded.');

    var oAuthHeaders = $scope.parseOAuthHeaders(loginResponse.oauth_echo_headers);
   // oAuthHeaders = "Hello";
   login_data = loginResponse;

    var backend_url = 'http://latenightfood.me/dashboard/index.php/admin/do_login';

    var data = $.param({
                 auoth: oAuthHeaders,
                
            });
  
    var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

    $http.post(backend_url,data,config)
    .success(function(data, status, headers, config) {
        console.log('success : ' + data);
        $scope.onDigitsSuccess();
        alert(data);
    })
    .error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
  }

  $scope.onDigitsSuccess = function(response) {
    console.log('Digits phone number retrieved.');
    //console.log('this is global variable : ' + config.digitsConsumerKey);
    
    $scope.menu_data = branch_menu;
    //console.log($scope.menu_data);
    $state.go('app.main');
  }

  $scope.parseOAuthHeaders = function(oAuthEchoHeaders) {
    var credentials = oAuthEchoHeaders['X-Verify-Credentials-Authorization'];
    var apiUrl = oAuthEchoHeaders['X-Auth-Service-Provider'];

    return {
      apiUrl: apiUrl,
      credentials: credentials
    };
  }

  $scope.onLoginFailure = function(loginResponse) {
    console.log('Digits login failed.');
  }
}