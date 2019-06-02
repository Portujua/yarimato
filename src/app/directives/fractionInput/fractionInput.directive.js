(() => {
  angular.module('app').directive('fractionInput', (NumericUtil) => ({
    restrict: 'E',
    replace: true,
    require: 'ngModel',
    templateUrl: 'app/directives/fractionInput/fractionInput.html',
    link: ($scope, element, attrs, ngModel) => {
      $scope.decimalFocused = () => {
        $scope.fractionDisabled = true;
        $scope.decimalDisabled = false;
      };

      $scope.fractionFocused = () => {
        $scope.decimalDisabled = true;
        $scope.fractionDisabled = false;
      };

      $scope.decimalChanged = () => {
        if (_.isNull($scope.decimal) || _.isUndefined($scope.decimal)) {
          $scope.fraction = null;
          return;
        }
        $scope.fraction = NumericUtil.toFraction($scope.decimal);
      };

      $scope.fractionChanged = () => {
        if (_.isNull($scope.fraction) || _.isUndefined($scope.fraction) || $scope.fraction === '') {
          $scope.decimal = null;
          return;
        }
        $scope.decimal = NumericUtil.round(Ratio.parse($scope.fraction).valueOf(), 6);
      };

      ngModel.$validators.required = (modelValue, viewValue) => {
        // 1) si es requerido pero el modelValue esta vacio
        if (
          attrs.required &&
          (_.isNaN(modelValue) || _.isNull(modelValue) || _.isUndefined(modelValue) || !_.isFinite(modelValue))
        ) {
          return ($scope.isValid = false);
        }
        return ($scope.isValid = true);
      };

      // Initial setting
      $scope.decimalChanged();
      $scope.decimalFocused();
    },
    scope: {
      decimal: '=ngModel',
      change: '&ngChange'
    }
  }));
})();
