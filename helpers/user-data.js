const requestIp = require('request-ip');
const publicIp = require('public-ip');
const geoip = require('geoip-lite');
const useragent = require('useragent');
const Promise = require('bluebird');

useragent('true');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === 'dev') {
        publicIp.v4()
          .then((result) => {
            resolve({
              geoip: geoip.lookup(result),
              agent: useragent.parse(req.headers['user-agent']),
              ip: result
            });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve({
          geoip: geoip.lookup(requestIp.getClientIp(req)),
          agent: useragent.parse(req.headers['user-agent']),
          ip: requestIp.getClientIp(req)
        });
      }
    });
  }
};
