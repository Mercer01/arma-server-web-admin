const _ = require('lodash')

const Settings = function (config) {
  this.config = config
}

Settings.prototype.getPublicSettings = function () {
  return _.pick(this.config, ['game', 'path', 'type'])
}

module.exports = Settings
