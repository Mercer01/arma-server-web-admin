define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const tpl = require('text!tpl/servers/missions/rotation/list_item.html')

  const template = _.template(tpl)

  return Marionette.ItemView.extend({
    tagName: 'tr',
    template: template,

    events: {
      'click button.delete': 'delete',
      'change select#difficulty': 'changed',
      'change input#name': 'changed'
    },

    changed: function (e) {
      const val = $(e.target).val()
      this.model.set(e.target.id, val)
    },

    delete: function (e) {
      e.preventDefault()
      this.model.destroy()
    },

    onRender: function () {
      const difficulty = this.model.get('difficulty')
      const $option = this.$el.find('#difficulty option[value=\'' + difficulty + '\']')
      $option.attr('selected', 'selected')
    }
  })
})
