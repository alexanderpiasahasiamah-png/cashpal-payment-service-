const VodafoneProvider = require('./vodafone.provider');

function getProvider(network) {
  // For now, only Vodafone supported
  return new VodafoneProvider();
}

module.exports = { getProvider };
