define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const swal = require('sweet-alert')

  const tpl = require('text!tpl/logs/list_item.html')

  const template = _.template(tpl)

  return Marionette.ItemView.extend({
    tagName: 'tr',
    template: template,

    events: {
      'click .destroy': 'deleteLog'
    },

    deleteLog: function (event) {
      const self = this
      sweetAlert({
        title: 'Are you sure?',
        text: 'The log will be deleted from the server!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Yes, delete it!'
      },
      function () {
        self.model.destroy()
      })
    }
  })
})
