define(function (require) {
  'use strict'

  const $ = require('jquery')

  const Backbone = require('backbone')

  const LayoutView = require('app/views/layout')

  const NavigationView = require('app/views/navigation')

  const ServersView = require('app/views/servers/list')

  const LogsListView = require('app/views/logs/list')

  const MissionsView = require('app/views/missions/index')

  const ModsListView = require('app/views/mods/list')

  const ServerView = require('app/views/servers/view')

  const Logs = require('app/collections/logs')

  const Missions = require('app/collections/missions')

  const Mods = require('app/collections/mods')

  const Settings = require('app/models/settings')

  const Servers = require('app/collections/servers')

  const $body = $('body')

  const missions = new Missions()

  const mods = new Mods()

  const settings = new Settings()

  const servers = new Servers()

  const layoutView = new LayoutView({ el: $body }).render()

  return Backbone.Router.extend({

    routes: {
      'logs': 'logs',
      'missions': 'missions',
      'mods': 'mods',
      'servers/:id': 'server',
      '': 'home'
    },

    initialize: function () {
      layoutView.navigation.show(new NavigationView({ settings: settings, servers: servers }))

      let initialized = false

      const socket = io.connect()
      socket.on('missions', function (_missions) {
        missions.set(_missions)
      })
      socket.on('mods', function (_mods) {
        mods.set(_mods)
      })
      socket.on('servers', function (_servers) {
        servers.set(_servers)

        if (!initialized) {
          initialized = true
          Backbone.history.start()
        }
      })
      socket.on('settings', function (_settings) {
        settings.set(_settings)
      })
    },

    home: function () {
      layoutView.content.show(new ServersView({ collection: servers }))
    },

    logs: function () {
      const logs = new Logs()
      logs.fetch()
      layoutView.content.show(new LogsListView({ collection: logs }))
    },

    missions: function () {
      layoutView.content.show(new MissionsView({ missions: missions }))
    },

    mods: function () {
      layoutView.content.show(new ModsListView({ collection: mods }))
    },

    server: function (id) {
      const server = servers.get(id)
      if (server) {
        layoutView.content.show(new ServerView({
          model: server,
          missions: missions,
          mods: mods
        }))
      } else {
        this.navigate('#', true)
      }
    }

  })
})
