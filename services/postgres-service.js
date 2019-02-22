const camelCase = require('camelcase');

const snakeToCamel = object => Object.entries(object)
  .reduce((camel, [key, value]) => {
    camel[camelCase(key)] = value;
    return camel;
}, {});

const nestAddress = ({streetNumber, streetName, city, country, ...parent}) =>
  ({...parent, address: {streetNumber, streetName, city, country}});

const nestManager = ({givenName, familyName, managerId, ...parent}) =>
  ({...parent, manager: {id: managerId, givenName, familyName}});

module.exports = {snakeToCamel, nestAddress, nestManager};