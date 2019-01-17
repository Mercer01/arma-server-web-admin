define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const tpl = require('text!tpl/servers/missions/available/list_item.html')

  const template = _.template(tpl)

  return Marionette.ItemView.extend({
    tagName: 'tr',
    template: template,

    events: {
      'click .add': 'add'
    },

    add: function () {
      this.trigger('add', this.model)
    }
  })
})
