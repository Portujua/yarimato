angular.module('app')
  /**
   * @ngdoc property
   * @name app.property:API
   * @returns {object} An object with the following fields:
   * - API version
   * - Port number
   * - Protocol used (HTTP or HTTPS)
   * - Host name or IP address
   * - Prefixes
   * - URL form by the previous fields
   *
   * @description
   * Information about the API.
   *
   * **Note:** -
   */
  .constant('API', {
    /**
     * The environment to be used. Options: testing|distribution
     * @type {String}
     */
    _environment: 'production',

    /**
     * Testing and distribution configuration
     * NOTE: DO NOT TOUCH THIS IN RUNNING TIME
     * @type {Object}
     */
    production: {
      version: '',
      port: '3000',
      protocol: 'http',
      host: 'localhost',
      prefix: ''
    },

    /**
     * Returns the URL given an environment
     * @return {String}
     */
    get url() {
      let api = this[this._environment] ? this[this._environment] : this.testing;

      return (
        api.protocol + '://' + api.host + (api.port ? ':' + api.port : '') + '/' + api.prefix + (api.prefix ? '/' : '') + api.version + (api.version ? '/' : '')
      );
    }
  });
