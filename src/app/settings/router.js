angular.module('app')
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      // .state('login', {
      //   url: '/',
      //   template: '<login></login>',
      //   title: 'Sign in'
      // })
      // .state('logout', {
      //   url: '/logout',
      //   title: 'Sign out',
      //   controller: 'LogoutController',
      //   // The following line, is for routes that require authentication
      //   resolve: {
      //     authRequired: ['Auth', (a) => {
      //       return a.checkSession();
      //     }]
      //   },
      // })
      .state('root', {
        template: '<root></root>',
        // resolve: {
        //   authRequired: ['Auth', (a) => {
        //     return a.checkSession();
        //   }]
        // },
        // Remove this route from breadcrumbs
        ncyBreadcrumb: { skip: true }
      })
      .state('root.home', {
        url: '/',
        template: '<home></home>',
        title: 'Home',
        // resolve: {
        //   authRequired: ['Auth', (a) => {
        //     return a.checkSession();
        //   }]
        // },
        // Breadcrumbs info
        ncyBreadcrumb: { label: 'Home' }
      })
      .state('root.sales', {
        url: '/sales',
        template: '<sales-list></sales-list>',
        title: 'Sales',
        // resolve: {
        //   authRequired: ['Auth', (a) => {
        //     return a.checkSession();
        //   }]
        // },
        // Breadcrumbs info
        ncyBreadcrumb: { label: 'Sales' }
      })
      .state('root.inventory', {
        url: '/inventory',
        template: '<inventory-list></inventory-list>',
        title: 'Inventory',
        // resolve: {
        //   authRequired: ['Auth', (a) => {
        //     return a.checkSession();
        //   }]
        // },
        // Breadcrumbs info
        ncyBreadcrumb: { label: 'Inventory' }
      })
      .state('root.products', {
        url: '/products',
        template: '<products-list></products-list>',
        title: 'Products',
        // resolve: {
        //   authRequired: ['Auth', (a) => {
        //     return a.checkSession();
        //   }]
        // },
        // Breadcrumbs info
        ncyBreadcrumb: { label: 'Products' }
      })
      ;

    $urlRouterProvider.otherwise('/');
  });
