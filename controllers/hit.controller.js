const path = require('path');

const env = process.env.NODE_ENV;

module.exports = {
  saveHit: (db, url, hitUserData) => {
    const Hit = db.import(path.resolve(__dirname, '../models/hit.model'));
    db.sync()
      .then(() => Hit.create({
        url,
        date: Date.now(),
        ip: hitUserData.ip,
        browserFamily: hitUserData.agent.family,
        browserVersionMajor: hitUserData.agent.major,
        browserVersionMinor: hitUserData.agent.minor,
        browserVersionPatch: hitUserData.agent.patch,
        deviceFamily: hitUserData.agent.device.family,
        deviceVersionMajor: hitUserData.agent.device.major,
        deviceVersionMinor: hitUserData.agent.device.minor,
        deviceVersionPatch: hitUserData.agent.device.patch,
        osFamily: hitUserData.agent.os.family,
        osVersionMajor: hitUserData.agent.os.major,
        osVersionMinor: hitUserData.agent.os.minor,
        osVersionPatch: hitUserData.agent.os.patch,
        country: hitUserData.geoip.country,
        region: hitUserData.geoip.region,
        city: hitUserData.geoip.city,
        lat: hitUserData.geoip.ll[0],
        lon: hitUserData.geoip.ll[1]
      })
      )
      .then(hit => {
        if (env === 'dev') {
          console.log(hit.get({
            plain: true
          }));
        }
      })
      .catch(error => {
        throw error;
      });
  }
};
