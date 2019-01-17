define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const swal = require('sweet-alert')

  const tpl = require('text!tpl/servers/info.html')

  return Marionette.LayoutView.extend({
    template: _.template(tpl),

    events: {
      'click #start': 'start',
      'click #stop': 'stop'
    },

    start: function (event) {
      const self = this
      event.preventDefault()
      $.ajax({
        url: '/api/servers/' + this.model.get('id') + '/start',
        type: 'POST',
        success: function (resp) {
          self.model.set('pid', resp.pid)
          self.render()
        },
        error: $.noop
      })
    },

    stop: function (event) {
      const self = this
      event.preventDefault()
      sweetAlert({
          title: 'Are you sure?',
          text: 'The server will stopped.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn-warning',
          confirmButtonText: 'Yes, stop it!'
        },
        function () {
          $.ajax({
            url: '/api/servers/' + self.model.get('id') + '/stop',
            type: 'POST',
            success: function (resp) {
              self.model.set('pid', resp.pid)
              self.render()
            },
            error: $.noop
          })
        })
    }
  })
})
