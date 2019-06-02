angular
  .module('app')
  /**
   * @ngdoc property
   * @name app.property:APP_INFO
   * @returns {object} An object with the following fields:
   * - version of release
   * - date of release
   */
  .constant('APP_INFO', {
    name: 'Yarimato',
    version: '1.0.0',
    day: 1,
    month: 6,
    year: 2019,
    // NOTE: do not touch this
    get date() {
      return new Date(this.year, this.month - 1, this.day);
    }
  })
  /**
   * Min date
   */
  .constant('MIN_DATE', () => {
    let date = new Date();
    date.setDate(1);
    date.setMonth(0);
    date.setYear(1971);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  });
