angular
  .module('app')
  .run(
    (
      $rootScope,
      PageService,
      editableOptions,
      editableThemes,
      toggleConfig,
      $timeout,
      $templateCache,
      Auth
    ) => {
      // Set IP

      // X-Editable settings (theme)
      editableThemes.bs3.inputClass = 'input-sm';
      editableThemes.bs3.buttonsClass = 'btn-sm';
      editableOptions.theme = 'bs3';
      editableOptions.icon_set = 'font-awesome';
      editableOptions.activate = 'select';

      // Toggle Config
      toggleConfig.on = 'Yes';
      toggleConfig.off = 'No';

      // List of maps in the system
      $rootScope.maps = [];

      // Add the inventory entry typeahead template
      $templateCache.put(
        'inventory-entry-typeahead',
        `
      <a class="pointer">
        <div class="pull-left margin-sm-right catalog-entry-image-container typeahead">
          <img ng-src="{{ match.model.catalogEntry.imagePath | defaultCatalogImage }}" default-catalog>
        </div>

        <p class="bold hug-bottom">{{ match.model.catalogEntry.name }} <small ng-if="match.model.serialNumber">{{ match.model.serialNumber }}</small></p>
        <small>in {{ match.model.storage.name }}</small>
      </a>
    `
      );

      $templateCache.put(
        'storage-inventory-entry-typeahead',
        `
      <a class="pointer">
        <p class="hug-bottom">{{ match.model.storage.name }}</p>
        <small ng-if="match.model.serialNumber"><span class="bold">Serial: </span>{{ match.model.serialNumber }}</small>
      </a>
    `
      );

      // Add the new filters template
      $templateCache.put(
        'table-action-buttons',
        `
      <i ng-click="$ctrl.filters = !$ctrl.filters" class="fa fa-fw fa-filter pointer text-muted small" uib-tooltip="Toggle Filters" tooltip-append-to-body="true"></i>
      <i ng-click="$ctrl.create()" ng-if="$ctrl.create" class="fa fa-fw fa-plus pointer text-muted small" uib-tooltip="Create" tooltip-append-to-body="true"></i>
    `
      );

      $templateCache.put(
        'table-filter-button',
        '<i ng-click="$ctrl.filters = !$ctrl.filters" class="fa fa-fw fa-filter pointer text-muted small" uib-tooltip="Toggle Filters" tooltip-append-to-body="true"></i>'
      );

      $templateCache.put(
        'table-refresh-button',
        '<i ng-click="$ctrl.load()" class="fa fa-fw fa-refresh pointer text-muted small" uib-tooltip="Refresh" tooltip-append-to-body="true"></i>'
      );

      $templateCache.put(
        'table-action-job-buttons',
        `
    <div class="dropdown block">
      <span class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-fw fa-bars"></i></span>

      <ul class="dropdown-menu fade in">
        <li ng-click="$ctrl.create()">
          <i class="fa fa-fw fa-plus pointer text-muted small"></i> Create
        </li>
        <li ng-click="$ctrl.showSearch = !$ctrl.showSearch;">
          <i class="fa fa-fw fa-search pointer text-muted small"></i> Search
        </li>
        <li ng-click="$ctrl.load()">
          <i class="fa fa-fw fa-refresh pointer text-muted small"></i> Refresh
        </li>
        <li ng-click="$ctrl.filters = !$ctrl.filters">
          <i class="fa fa-fw fa-filter pointer text-muted small"></i> Filters
        </li>
      </ul>
    </div>
  `
      );

      // Push every map initialized
      $rootScope.$on('mapInitialized', (evt, map) => {
        $rootScope.maps.push(map);
        $rootScope.$broadcast('resizeAllMaps');
      });

      // Resize all maps no visible
      // Will trigger in every tab change
      $rootScope.$on('resizeAllMaps', () => {
        _.each($rootScope.maps, (map) => {
          let center = map.getCenter();
          $timeout(() => {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
          }, 100);
        });
      });

      // Broadcasted before a route change. At this point the route services starts
      // resolving all of the dependencies needed for the route change to occur.
      // Typically this involves fetching the view template as well as any dependencies defined
      // in resolve route property. Once all of the dependencies are resolved $routeChangeSuccess
      // is fired.
      $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        // TODO: check if the current route requires Auth and the user is logged in
        // TODO: create a global array for routes that require Auth
      });

      // Broadcasted after a route dependencies are resolved. ngView listens
      // for the directive to instantiate the controller and render the view.
      $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
        // Updating page information
        PageService.get();
      });

      // Broadcasted if any of the resolve promises are rejected.
      $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => { });

      // Fired when a requested state cannot be found using the provided state name during transition. The event is broadcast
      // allowing any handlers a single chance to deal with the error (usually by lazy-loading the unfound state).
      $rootScope.$on('$stateNotFound', (event, unfoundState, fromState, fromParams) => { });

      // Fix for windows height
      $rootScope.$on('$viewContentLoaded', (event) => {
        // $('body, #sb-site').css('height', '1px');
        // $('body, #sb-site').css('height', 'auto');
      });
    }
  );
