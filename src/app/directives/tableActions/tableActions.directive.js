(() => {
  angular.module('app').directive('tableActions', ($compile) => ({
    restrict: 'EA',
    replace: true,
    transclude: true,
    templateUrl: 'app/directives/tableActions/tableActions.html',
    link: ($scope, element, attrs, api, transclude) => {
      let isTranscluded = false;

      $scope.searchValue = {
        text: null
      };

      let defaultValues = {
        refresh: true,
        filter: true,
        create: false,
        export: false,
        collapse: false,
        search: false
      };
      // Default values: Show/hide options (buttons)
      $scope._buttonSettings = _.extend(defaultValues, $scope.buttonSettings || {});

      // Globals
      $scope.isAllExpanded = false;

      $scope.onClickRefresh = () => {
        $scope.isAllExpanded = false;
      };

      $scope.onClickFilter = () => {
        $scope.filterToggleValue = !$scope.filterToggleValue;
      };

      $scope.onClickCollapse = (list) => {
        $scope.isAllExpanded = !$scope.isAllExpanded;
        // Si hay una funcion para tratar el collapse la llamo
        if (_.isFunction($scope.onCollapse)) {
          return;
        }
        _.each(list, (item) => {
          item.isShowing = $scope.isAllExpanded;
        });
      };

      $scope.onSearchClick = () => {
        $scope.searchToggleValue = !$scope.searchToggleValue;

        if (_.isBoolean($scope.searchToggleValue) && $scope.searchToggleValue) {
          if (_.isFunction($scope.onHideSearch)) {
            $scope.onHideSearch();
          }
        } else {
          if (_.isFunction($scope.onSearch) && !_.isEmpty($scope.searchValue.text)) {
            $scope.onSearch({ query: '' });
            $scope.searchValue.text = null;
          }
        }
      };

      // Manual transclude
      if (!isTranscluded) {
        element.find('#transclude').replaceWith(
          transclude(() => {
            isTranscluded = true;
          })
        );
      }
    },
    scope: {
      // Options (buttons)
      buttonSettings: '=buttonSettings',
      // Methods
      onRefresh: '&onRefresh',
      onFilter: '&onFilter', // paramName: value
      onCreate: '&onCreate',
      onExport: '&onExport',
      onCollapse: '&?onCollapse',
      onSearch: '&onSearch',
      onAutocomplete: '&onAutocomplete',
      onHideSearch: '&onHideSearch',
      // Values
      filterToggleValue: '=filterToggleValue',
      searchToggleValue: '=?searchToggleValue',
      useExternalSearch: '=useExternalSearch',
      list: '=list',
      avoidCreate: '=avoidCreate'
    }
  }));
})();
