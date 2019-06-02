(() => {
  angular.module('app').directive('collapsiblePanel', () => ({
    template: `
    <button class="btn btn-collapsible btn-link padding-xs" uib-tooltip="Toggle Information Panel" tooltip-placement="right" tooltip-append-to-body="true">
      <i class="fa" ng-class="{ 'fa-caret-right': isCollapsed, 'fa-caret-left': !isCollapsed }"></i>
    </<button>`,
    restrict: 'E',
    replace: true,
    link: ($scope, element, attrs, api) => {
      $scope.isCollapsed = false;

      let el = element[0],
        parentRow = angular.element(el.parentElement),
        parentMargin = angular.element(parentRow[0].parentElement),
        parentDashboard = angular.element(parentMargin[0].parentElement),
        info = element.next(),
        details = info.next(),
        isCompact = _.isEmpty(attrs.compact) ? false : attrs.compact === 'true';

      // Set compact-layout to dashboard element
      if (isCompact && parentMargin.length) {
        if (!parentMargin.hasClass('dashboard')) {
          // Unwrap or remove margin-* div
          parentMargin.contents().unwrap();
          // Hay un margin-sm de por medio, por lo tanto el padre que le sigue es el verdadero
          if (parentDashboard.length && parentDashboard.hasClass('dashboard')) {
            parentDashboard.addClass('compact-layout');
          }
        } else {
          // No hay clase margin-sm de por medio
          parentMargin.addClass('compact-layout');
        }
      }

      // Alignment
      if (parentRow.length && parentRow.hasClass('row')) {
        parentRow.addClass('collapsible-row');
        // Add class pending on style attr
        if (!isCompact) {
          parentRow.addClass('align-items-start');
        } else {
          parentRow.addClass('no-gutters');
        }
      }

      if (details.length) {
        let detailClasses = details[0].className.split(' ');
        // Remove all classes
        details.removeClass();
        // Add class pending on style attr
        if (isCompact) {
          details.addClass('details-panel');
        }
        // Set old classes
        _.each(detailClasses, (value) => {
          if (!s.startsWith(value, 'col')) {
            details.addClass(value);
          }
        });

        // Find complements
        if (info.length) {
          let classes = info[0].className.split(' ');
          // Add class pending on style attr
          if (isCompact) {
            info.addClass('info-panel');
          }

          _.each(classes, (value) => {
            if (s.startsWith(value, 'col')) {
              let pos = _.lastIndexOf(value, '-'),
                name = value.substr(0, pos),
                number = parseInt(value.substr(pos + 1, value.length));

              if (_.isNaN(number) || number === 12) {
                // To avoid "col-0" classes
                number = 0;
              }

              // Add complement class
              details.addClass(`${name}-${12 - number}`);
            }
          });
        }
      }

      // Adding info-panel class
      if (info.length && isCompact) {
        info.addClass('info-panel');
      }

      element.on('click', () => {
        $scope.$apply(() => {
          // Toggle
          $scope.isCollapsed = !$scope.isCollapsed;

          if (info.length) {
            info.toggleClass('hide', $scope.isCollapsed);
          }

          if (details.length) {
            // Full width
            details.toggleClass('col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12', $scope.isCollapsed);
          }
        });
      });
    },
    scope: true
  }));
})();
