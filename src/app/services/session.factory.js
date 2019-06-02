angular.module('app')
  .factory('Session', (StorageService) => {

    class Session extends BaseFactory {
      constructor({ id = null, username = null, token = null, name = null, role = null, email = null, profilePicturePath = null, expirationTime = 60, isActive = true }) {
        // Parent
        super({ id, username, token, name, role, email, profilePicturePath, expirationTime, isActive });
      }
    };

    return Session;
  });
