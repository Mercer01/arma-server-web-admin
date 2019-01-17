const events = require('events')
const fs = require('fs.extra')
const path = require('path')

const Mods = function (config) {
  this.config = config
  this.mods = []
}

Mods.prototype = new events.EventEmitter()

Mods.prototype.delete = function (mod, cb) {
  const self = this
  fs.rmrf(path.join(this.config.path, mod), function (err) {
    cb(err)

    if (!err) {
      self.updateMods()
    }
  })
}

Mods.prototype.updateMods = function () {
  const self = this
  fs.readdir(self.config.path, function (err, files) {
    if (err) {
      console.log(err)
    } else {
      const mods = files.filter(function (file) {
        return file.charAt(0) === '@'
      }).map(function (name) {
        return {
          name: name
        }
      })

      self.mods = mods
      self.emit('mods', mods)
    }
  })
}

module.exports = Mods
