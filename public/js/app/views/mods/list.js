define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const ListItemView = require('app/views/mods/list_item')

  const tpl = require('text!tpl/mods/list.html')

  const template = _.template(tpl)

  return Marionette.CompositeView.extend({
    childView: ListItemView,
    childViewContainer: 'tbody',
    template: template,

    events: {
      'click #refresh': 'refresh'
    },

    refresh: function (event) {
      event.preventDefault()
      $.ajax({
        url: '/api/mods/refresh',
        type: 'POST',
        success: function (resp) {

        },
        error: function (resp) {

        }
      })
    }
  })
})
