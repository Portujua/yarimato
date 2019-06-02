
;(() => {

class FullScreenReportController {
  constructor(Auth, ReportService, BroadcastService, $rootScope) {
    this.session = Auth.getSession();
    this.ReportService = ReportService;
    this.BroadcastService = BroadcastService;
    this.$rootScope= $rootScope;
  }

  $onInit() {
    this.loadingPromise = this.load();
  }

  load() {
   this.pages=15;
    //this.templateName = this.resolve.report._templateName;
    this.component= this.resolve.report.component;
    this.height = $(window).height() - 270;
  
    //this.BroadcastService.cast(this.resolve.report.component, this.height)
  }

  print() {

  }

  cancel() {
  this.pages=null;
    this.modalInstance.close(this.resolve.report.component);
  }

}

angular.module('app') 
  .component('fullScreenReport', {
    templateUrl: 'views/home/fullReport.html',
    controller: FullScreenReportController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
