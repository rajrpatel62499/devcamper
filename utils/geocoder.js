const NodeGeoCoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER,
   
    // Optional depending on the providers
    // fetch: customFetchImplementation,
    apiKey: process.env.GECOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeoCoder(options);

module.exports = geocoder;
   