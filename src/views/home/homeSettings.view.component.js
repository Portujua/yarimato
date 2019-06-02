(() => {
  class HomeSettingsController {
    constructor(HomeService, $filter, ReportService, $scope) {
      this.HomeService = HomeService;
      this.$filter = $filter;
      this.ReportService = ReportService;
      //  this.global= { text: null };

   
    }



    $onInit() {
      this.load();
    }

    

    load() {
      this.models = {
        selected: null,
        lists: {
          available: [],
          showing: []
        }
      };

      this.loadingPromise = this.HomeService.listAvailableDashboardItems().then((response) => {
        this.models.lists.available = response.data;
        _.each(this.models.lists.available, (item) => {
          if (!_.isNull(item.tags)) {
            item.tags = item.tags.replace(/ /g, '');
            item.newTags = item.tags.split(',');
          }
        });

        this.loadingPromise = this.HomeService.listMyDashboardItems().then((response) => {
          let dashboardItems = [];

          _.each(response.data, (item) => {
            if (!_.isNull(item.dashboardItem.tags)) {
              item.dashboardItem.tags = item.dashboardItem.tags.replace(/ /g, '');
              item.dashboardItem.newTags = item.dashboardItem.tags.split(',');
            }
            dashboardItems.push(item.dashboardItem);
          });

          let data = dashboardItems;

          // We remove from available ones the selected ones
          let newList = [];

          for (let i = 0; i < this.models.lists.available.length; i++) {
            let c = false;

            for (let k = 0; k < data.length; k++) {
              c = c | (data[k].id.toUpperCase() === this.models.lists.available[i].id.toUpperCase());
            }

            if (!c) {
              newList.push(this.models.lists.available[i]);
            }
          }

          this.models.lists.available = newList;
          this.models.lists.showing = data;

          this.setIcons(this.models.lists.available);
          this.setIcons(this.models.lists.showing);
        });
      });
    }

    move(title, list){
       let i =_.findIndex(list, {
        title : title
      });
      list.splice(i,1);
    }

    setIcons(list) {
      _.each(list, (value) => {
        if (s.include(value.type, 'TABLE')) {
          value.icon = 'fa-table';
        }
        if (s.include(value.type, 'LINE_CHART')) {
          value.icon = 'fa-line-chart';
        }
        if (s.include(value.type, 'COLUMN_CHART')) {
          value.icon = 'fa-bar-chart';
        }
        if (s.include(value.type, 'BAR_CHART')) {
          value.icon = 'fa-table';
        }
        if (s.include(value.type, 'MAP')) {
          value.icon = 'fa-map-marker';
        }
        if (s.include(value.type, 'PIE_CHART')) {
          value.icon = 'fa-pie-chart';
        }
        if (value.type === 'SUMMARY') {
          value.icon = 'fa-hashtag';
        }
      });
    }

    selectAll(value) {
      if (value) {
        _.each(this.models.lists.available, (item) => {
          this.models.lists.showing.push(item);
        });

        this.models.lists.available = [];
      } else {
        _.each(this.models.lists.showing, (item) => {
          this.models.lists.available.push(item);
        });

        this.models.lists.showing = [];
      }
    }

    save() {
      this.isSaving = true;
      // let dashboardItemUserRequest = [];

      // // We assign the displayOrder
      // for (let i = 0; i < this.models.lists.showing.length; i++) {
      //   dashboardItemUserRequest.push({
      //     dashboardItem: this.models.lists.showing[i],
      //     order: i
      //   })

      //   this.models.lists.showing[i].order = i;
      //   this.models.lists.showing[i].displayOrder = i;
      // }

      let payload = angular.copy(this.models.lists.showing);

      // Remove icons
      _.each(payload, (value) => {
        delete value.icon;
        delete value.newTags;
      });

      this.HomeService.saveDashboard(payload)
        .then((response) => {
          // this.HomeService.saveDashboard(dashboardItemUserRequest).then((response) => {
          this.modalInstance.close(response);
        })
        .finally(() => {
          this.isSaving = false;
        });
    }

    cancel() {
      this.modalInstance.dismiss('cancel');
    }
  }

  angular.module('app').component('homeSettingsView', {
    templateUrl: 'views/home/homeSettings.view.html',
    controller: HomeSettingsController,
    bindings: {
      modalInstance: '<',
      resolve: '<'
    }
  });
})();
