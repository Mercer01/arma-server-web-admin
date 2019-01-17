define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  return Backbone.Model.extend({
    defaults: {
      admin_password: '',
      allowed_file_patching: 1,
      auto_start: false,
      battle_eye: false,
      file_patching: false,
      forcedDifficulty: '',
      max_players: null,
      mods: [],
      motd: '',
      number_of_headless_clients: 0,
      parameters: [],
      password: '',
      persistent: false,
      port: 2302,
      state: null,
      title: '',
      von: false,
      verify_signatures: false
    },
    urlRoot: '/api/servers/'
  })
})
