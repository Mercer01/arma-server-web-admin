const async = require('async')
const events = require('events')
const filesize = require('filesize')
const fs = require('fs.extra')
const path = require('path')
const SteamWorkshop = require('steam-workshop')

const Missions = function (config) {
  this.config = config
  this.missions = []
  this.steamWorkshop = new SteamWorkshop(this.missionsPath())

  this.updateMissions()
}

Missions.prototype = new events.EventEmitter()

Missions.prototype.missionsPath = function () {
  return path.join(this.config.path, 'mpmissions')
}

Missions.prototype.missionPath = function (name) {
  return path.join(this.missionsPath(), name)
}

Missions.prototype.updateMissions = function (cb) {
  const self = this
  fs.readdir(this.missionsPath(), function (err, files) {
    if (err) {
      console.log(err)

      if (cb) {
        return cb(err)
      }

      return
    }

    async.map(files, function (filename, cb) {
      fs.stat(self.missionPath(filename), function (err, stat) {
        if (err) {
          console.log(err)
          return cb(err)
        }

        cb(null, {
          dateCreated: new Date(stat.ctime),
          dateModified: new Date(stat.mtime),
          name: filename,
          size: stat.size,
          sizeFormatted: filesize(stat.size)
        })
      })
    }, function (err, missions) {
      if (!err) {
        self.missions = missions
        self.emit('missions', missions)
      }

      if (cb) {
        cb(err, missions)
      }
    })
  })
}

Missions.prototype.handleUpload = function (uploadedFile, cb) {
  const filename = decodeURI(uploadedFile.originalname.toLowerCase())
  const self = this
  fs.move(uploadedFile.path, path.join(this.missionsPath(), filename), function (err) {
    self.updateMissions()

    if (cb) {
      cb(err)
    }
  })
}

Missions.prototype.delete = function (missionName, cb) {
  const self = this
  fs.unlink(path.join(this.missionsPath(), missionName), function (err) {
    self.updateMissions()

    if (cb) {
      cb(err)
    }
  })
}

Missions.prototype.downloadSteamWorkshop = function (id, cb) {
  if (!id) {
    return cb(new Error('Not a valid Steam Workshop ID: ' + id))
  }

  const self = this

  this.steamWorkshop.downloadFile(id, function (err) {
    self.updateMissions()

    if (cb) {
      cb(err)
    }
  })
}

module.exports = Missions
