define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const tpl = require('text!tpl/servers/parameters/list_item.html')

  const template = _.template(tpl)

  return Marionette.ItemView.extend({
    tagName: 'tr',
    template: template,

    events: {
      'click button.delete': 'delete',
      'change input#parameter': 'changed',
      'click button.clone': 'clone'
    },

    changed: function (e) {
      const val = $(e.target).val()
      this.model.set(e.target.id, val)
    },

    delete: function (e) {
      e.preventDefault()
      this.model.destroy()
    }
  })
})
