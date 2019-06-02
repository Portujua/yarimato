function stringToDate(input) {
  // http://jsfiddle.net/kQZw8/157/
  let regexIso8601 = /^\d{4}-\d{1,2}-\d{1,2}(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/i,
    regexTime = /^([\d]{1,2}):([\d]{1,2}):([\d]{1,2})(\.\d*)?$/i,
    minDate = '1971-01-01';

  // Ignore things that aren't objects.
  if (typeof input !== 'object') {
    return input;
  }

  for (let key in input) {
    if (!input.hasOwnProperty(key)) {
      continue;
    }

    let value = input[key],
      match;

    // Process "HH:mm.ss"
    if (typeof value === 'string' && value.match(regexTime)) {
      // Append current date
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      // Padding
      month = (month < 10 ? '0' : '') + month;
      day = (day < 10 ? '0' : '') + day;
      // input[key] = value = `${year}-${month}-${day}T${value}Z`;
      input[key] = value = `${minDate}T${value}Z`;
    }

    // Check for string properties which look like dates.
    // TODO: Improve this regex to better match ISO 8601 date strings.
    if (typeof value === 'string' && (match = value.match(regexIso8601))) {
      // match[1] = "THH:mm:ssZ" or null if the date is "2017-12-25"
      // We need to append the current time THH:mm:ssZ
      match[1] = !match[1] ? new Date().toJSON().substr(10) : '';
      // Get date string
      let dateStr = match[0] + match[1];
      // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
      let milliseconds = Date.parse(dateStr);
      if (!isNaN(milliseconds)) {
        let year = parseInt(dateStr.substr(0, 4));
        let month = parseInt(dateStr.substr(5, 2)) - 1;
        let day = parseInt(dateStr.substr(8, 2));
        let hours = parseInt(dateStr.substr(11, 2));
        let minutes = parseInt(dateStr.substr(14, 2));
        let seconds = parseInt(dateStr.substr(17, 2));
        input[key] = new Date(year, month, day, hours, minutes, seconds);
      }
    } else if (typeof value === 'object') {
      // Recurse into object
      stringToDate(value);
    }
  }
}

function dateToString(input) {
  let regexIso8601 = /\d{4}-\d{1,2}-\d{1,2}(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)/gi;

  if (typeof input === 'string') {
    let matches = input.match(regexIso8601) || [];

    matches.forEach((value) => {
      let date = new Date(value);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      month = (month < 10 ? '0' : '') + month;
      day = (day < 10 ? '0' : '') + day;
      hours = (hours < 10 ? '0' : '') + hours;
      minutes = (minutes < 10 ? '0' : '') + minutes;
      seconds = (seconds < 10 ? '0' : '') + seconds;

      let strDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

      input = input.replace(new RegExp(value, 'ig'), strDate);
    });
  }
  return input;
}

angular.module('app').config(($httpProvider) => {
  $httpProvider.defaults.transformResponse.push((response) => {
    stringToDate(response);
    return response;
  });

  $httpProvider.defaults.transformRequest.push((request) => {
    return dateToString(request);
  });

  $httpProvider.interceptors.push([
    '$q',
    '$location',
    '$injector',
    '$rootScope',
    '$timeout',
    ($q, $location, $injector, $rootScope, $timeout) => {
      return {
        request: (config) => {
          let Auth = $injector.get('Auth');

          return config || $q.when(config);
        },

        response: (response) => {
          $rootScope.$broadcast('resizeAllMaps');
          return response || $q.when(response);
        },

        responseError: (rejection) => {
          let toastr = $injector.get('toastr'),
            Auth = $injector.get('Auth'),
            type = 'error',
            textContent = 'Something went wrong. Please, try again.';

          // No internet
          if (rejection.status === -1) {
            return $q.reject(rejection);
          }

          if (rejection.status === 401) {
            type = 'warning';

            if (_.isEmpty(Auth.getSession())) {
              textContent = 'Wrong username/password combination.';
            } else {
              textContent = 'Your session has expired. Re-enter your credentials.';
              // Despues de mostrar el mensaje redirijo
              Auth.goLogin();
            }
          }

          if (rejection.status === 403) {
            if (rejection.data && _.isArray(rejection.data.message)) {
              textContent = _.size(rejection.data.message) > 1 ? rejection.data.message.join('.<br>') : `${_.first(rejection.data.message)}.`;
            } else {
              //textContent = `${rejection.data.message}.`;
              // Forbiden
              textContent = 'Your permissions are not sufficient to access this feature.';
            }
          }

          if (rejection.status === 404) {
            // Forbiden
            // Forbiden
            textContent = 'Sorry but the service you are looking for has not been found.';
          }

          if (rejection.status === 400 || rejection.status === 500) {
            if (rejection.data && rejection.data.message) {
              // Repeated item
              if (_.contains(rejection.data.message, 'Repeated Item')) {
                textContent = 'The value you\'re trying to create already exists.';
                type = 'warning';
              }

              // Dele regions with subregions
              else if (_.contains(rejection.data.message, 'Can not delete this region, it has subregions attached to it')) {
                textContent = 'Can not delete this region, it has subregions.';
                type = 'warning';
              }

              // Dele regions with subregions
              else if (_.contains(rejection.data.message, 'Can not delete this region, it has subregions attached to it')) {
                textContent = 'Can not delete this region, it has subregions.';
                type = 'warning';
              }

              // Dele regions with Basins attached
              else if (_.contains(rejection.data.message, 'Can not delete this region, it has Basins attached to it')) {
                textContent = 'Can not delete this region, it has Basins attached to it';
                type = 'warning';
              }

              // Item has childrens
              else if (_.contains(rejection.data.message, 'Can not delete this category, it has entities attached to it')) {
                textContent = 'Item can not be deleted because it has other related items.';
                type = 'warning';
              }

              // No coordinator
              // Personnel not in this position on job
              else if (_.contains(rejection.data.message, 'Personnel not in this position on job')) {
                textContent = 'Only coordinators can do that action.';
                type = 'warning';
              }

              // Hour overlap
              else if (_.contains(rejection.data.message, 'Hours Overlapped')) {
                textContent = 'The hours that you are trying to create overlap with others.';
                type = 'warning';
              }

              // Inventory quantity
              else if (_.contains(rejection.data.message, 'VIOLATION:InventoryEntry.quantityAvailable  Quantity available can not be negative ')) {
                textContent = 'There aren\'t enough pieces to ship.';
                type = 'warning';
              }

              // Email Not found recovery password
              else if (rejection.config.data.email && _.contains(rejection.data.message, `User With email ${rejection.config.data.email} Not Found`)) {
                textContent = 'This email doesn\'t exist.';
                type = 'warning';
              }

              // Token expire
              else if (rejection.config.data.email && _.contains(rejection.data.message, 'Reset Password Request Expired')) {
                textContent = 'The time allowed for the change of your password has expired or the password has already been changed previously.';
                type = 'warning';
              } else {
                if (_.isArray(rejection.data.message)) {
                  textContent = _.size(rejection.data.message) > 1 ? rejection.data.message.join('.<br>') : `${_.first(rejection.data.message)}.`;
                } else {
                  textContent = `${rejection.data.message}.`;
                }
              }
            }
          }

          // Message
          switch (type) {
            case 'warning':
              toastr.warning(textContent, 'Warning');
              break;
            default:
              toastr.error(textContent, 'Message');
          }

          console.error('Failed with', rejection);
          return $q.reject(rejection);
        }
      };
    }
  ]);
});
