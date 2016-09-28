// Core Admin App configuration
var appName = 'Core Admin';
var breadcrumbPrefix = true;

// General
var headTitle = 'Core Admin';

//Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

var config = {  
    digitsConsumerKey: 'L4P1DaHZBVoyNUiuP0XZ7Z1yo'
};

var login_data = [];

var dashboard_pie_chart = {
    labels : ['Download Sales', 'In-Store Sales'],
    data : [600, 500]
}

var dashboard_line_chart = {
    labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    series : ['Series A', 'Series B'],
    data : [
        [65, 69, 80, 67, 81, 56, 55, 40],
        [28, 38, 40, 19, 67, 86, 27, 90]
    ]
}
var dashboard_pie_chart = { data : []};
var dashboard_line_chart = { data : []};

var dashboard_table_items = [
    {"name":1,"user":"name 1","items_sold":"description 1","last_active":"field3 1"}, 
    {"name":2,"user":"name 2","items_sold":"description 1","last_active":"field3 2"}, 
    {"name":3,"user":"name 3","items_sold":"description 1","last_active":"field3 3"}, 
    {"name":4,"user":"name 4","items_sold":"description 1","last_active":"field3 4"}, 
    {"name":5,"user":"name 5","items_sold":"description 1","last_active":"field3 5"}, 
    {"name":6,"user":"name 6","items_sold":"description 1","last_active":"field3 6"}, 
    {"name":7,"user":"name 7","items_sold":"description 1","last_active":"field3 7"}, 
    {"name":8,"user":"name 8","items_sold":"description 1","last_active":"field3 8"}, 
    {"name":9,"user":"name 9","items_sold":"description 1","last_active":"field3 9"}
];

var branch_menu = ['test1', 'test2', 'test3', 'test4', 'test5'];
var user_phone_number = '+962786666207';

var reports_branches = ['branch1', 'branch2', 'branch3', 'branch4', 'branch5'];
var reports_table_items = [
    {"id":1,"time":"name 1","name":"description 1","quantity":"field3 1","bill":"field4 1"},
    {"id":2,"time":"name 2","name":"description 1","quantity":"field3 1","bill":"field4 1"},
    {"id":3,"time":"name 3","name":"description 1","quantity":"field3 1","bill":"field4 1"},
    {"id":4,"time":"name 4","name":"description 1","quantity":"field3 1","bill":"field4 1"},
    {"id":5,"time":"name 5","name":"description 1","quantity":"field3 1","bill":"field4 1"},
    {"id":6,"time":"name 6","name":"description 1","quantity":"field3 1","bill":"field4 1"},
    {"id":7,"time":"name 7","name":"description 1","quantity":"field3 1","bill":"field4 1"},
    {"id":8,"time":"name 8","name":"description 8","quantity":"field3 8","bill":"field4 8"},
    {"id":9,"time":"name 9","name":"description 9","quantity":"field3 9","bill":"field4 9"}
];

var manage_branch_table_items = [
    {"branch_name":1,"users":"name 1","last_sale":"10"},
    {"branch_name":2,"users":"name 2","last_sale":"20"},
    {"branch_name":3,"users":"name 3","last_sale":"30"},
    {"branch_name":4,"users":"name 4","last_sale":"40"},
    {"branch_name":5,"users":"name 5","last_sale":"50"},
    {"branch_name":6,"users":"name 6","last_sale":"60"},
    {"branch_name":7,"users":"name 7","last_sale":"70"},
    {"branch_name":8,"users":"name 8","last_sale":"80"},
    {"branch_name":9,"users":"name 9","last_sale":"90"}
];

var edit_branch_table_items = [{name: 'aaa', desc: 'aaa desc', pic: 'uploads/1.png', price: '$100'},
    {name: 'bbb', desc: 'bbb desc', pic: 'uploads/2.png', price: '$200'},
    {name: 'ccc', desc: 'ccc desc', pic: 'uploads/3.png', price: '$300'},
    {name: 'ddd', desc: 'ddd desc', pic: 'uploads/4.png', price: '$400'},
    {name: 'eee', desc: 'eee desc', pic: 'uploads/5.png', price: '$500'}
];

var settings_table_items = [
    {"month":1,"total":"name 1","number":"10"},
    {"month":2,"total":"name 2","number":"20"},
    {"month":3,"total":"name 3","number":"30"},
    {"month":4,"total":"name 4","number":"40"},
    {"month":5,"total":"name 5","number":"50"},
    {"month":6,"total":"name 6","number":"60"},
    {"month":7,"total":"name 7","number":"70"},
    {"month":8,"total":"name 8","number":"80"},
    {"month":9,"total":"name 9","number":"90"}
];

angular
    .module('app', [
        'ui.router',
        'oc.lazyLoad',
        'ncy-angular-breadcrumb',
        'angular-loading-bar',
        'daterangepicker',
        'ngImgCrop',
        'ngAnimate',
        'ui.bootstrap',
        'ngFileUpload'
    ])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
    }])
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess',function(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.$state = $state;

        $('#digits-sdk').load(function () {
            // Initialize Digits using the API key.
            Digits.init({ consumerKey: config.digitsConsumerKey })
              .done(function() {
                console.log('Digits initialized.');
              })
              .fail(function() {
                console.log('Digits failed to initialize.');
              });
          });
        
        return $rootScope.$stateParams = $stateParams;
    }]);
