(() => {
  class ExporterService {
    constructor($filter) {
      this.$filter = $filter;
    }

    saveAs(fileName = 'unnamed', fileExtension = 'txt', content = '\n', type = 'text/plain') {
      let file = new Blob([content], { type });
      let downloadLink = document.createElement('a');
      downloadLink.download = `${fileName}_${this.$filter('date')(new Date(), 'yyyy-MM-dd@HH.mm.ss')}.${fileExtension}`;
      downloadLink.innerHTML = 'Download File';

      if (!window.URL) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(file);
      } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(file);
        downloadLink.onclick = function(event) {
          document.body.removeChild(event.target);
        };
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
      }
      downloadLink.click();
    }

    saveAsExcel(fileName, content) {
      this.saveAs(fileName, 'xlsx', content, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    saveAsCSV(fileName, content) {
      this.saveAs(fileName, 'csv', content);
    }
  }

  angular.module('app').service('ExporterService', ExporterService);
})();
