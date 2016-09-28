ReportsCtrl.$inject = ['$scope', '$filter', '$http'];

function ReportsCtrl($scope, $filter, $http) {
$scope.datePicker = {};
$scope.datePicker.date = {startDate: null, endDate: null};
$scope.branches = reports_branches;

// init
$scope.sort = {sortingOrder : 'order_number',reverse : false};

$scope.gap = 5;

$scope.filteredItems = [];
$scope.groupedItems = [];
$scope.itemsPerPage = 10;
$scope.pagedItems = [];
$scope.currentPage = 0;

$scope.total = '';
$scope.items = [];

/*var backend_url = 'http://latenightfood.me/dashboard/index.php/admin/vendor_data_2';*/
var backend_url = 'test_backend/vendor_data_2.txt';

var data = $.param({
             auoth: login_data,
        });

var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

$http.post(backend_url,data,config)
.success(function(data, status, headers, config) {
    console.log('success : ' + data);
    
    $scope.total = data.total;
    $scope.items = data.sales;

    $scope.search();

})
.error(function(data, status, headers, config) {
  alert( "failure message: " + JSON.stringify({data: data}));
});

var searchMatch = function (haystack, needle) {
    if (!needle) {
        return true;
    }
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
};

// init the filtered items
$scope.search = function () {
    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
        for(var attr in item) {
            if (searchMatch(item[attr], $scope.query))
                return true;
        }
        return false;
    });
    // take care of the sorting order
    if ($scope.sort.sortingOrder !== '') {
        $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
    }
    $scope.currentPage = 0;
    // now group by pages
    $scope.groupToPages();
};


// calculate page in place
$scope.groupToPages = function () {
    $scope.pagedItems = [];
    
    for (var i = 0; i < $scope.filteredItems.length; i++) {
        if (i % $scope.itemsPerPage === 0) {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
        } else {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
        }
    }
};

$scope.range = function (size,start, end) {
    var ret = [];        
                  
    if (size < end) {
        end = size;
        start = size-$scope.gap;
    }
    for (var i = start; i < end; i++) {
      if (i < 0) continue;
        ret.push(i);
    }        
  
    return ret;
};

$scope.prevPage = function () {
    if ($scope.currentPage > 0) {
        $scope.currentPage--;
    }
};

$scope.nextPage = function () {
    if ($scope.currentPage < $scope.pagedItems.length - 1) {
        $scope.currentPage++;
    }
};

$scope.setPage = function () {
    $scope.currentPage = this.n;
};
}