define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const Ladda = require('ladda')

  const IframeTransport = require('jquery.iframe-transport')

  const Mission = require('app/models/mission')

  const tpl = require('text!tpl/missions/workshop.html')

  return Marionette.ItemView.extend({
    template: _.template(tpl),

    events: {
      'click form button': 'submit'
    },

    initialize: function (options) {
      this.missions = options.missions
    },

    submit: function () {
      const self = this
      const $form = this.$el.find('form')

      const $downloadBtn = $form.find('button[type=submit]')
      const laddaBtn = Ladda.create($downloadBtn.get(0))
      laddaBtn.start()

      $.ajax({
        url: '/api/missions/workshop',
        type: 'POST',
        data: {
          id: $form.find('input.workshop').val()
        },
        dataType: 'json',
        success: function (data) {
          laddaBtn.stop()
          self.render()
        },
        error: function () {
          laddaBtn.stop()
        }
      })
    }
  })
})
