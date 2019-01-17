define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const tpl = require('text!tpl/servers/players.html')

  return Marionette.LayoutView.extend({
    template: _.template(tpl),
    templateHelpers: {
      players: function () {
        return _.sortBy(this.state.players, function (player) {
          return player.name
        })
      }
    }
  })
})
