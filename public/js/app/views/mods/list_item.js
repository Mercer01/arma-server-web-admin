define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const Ladda = require('ladda')

  const swal = require('sweet-alert')

  const tpl = require('text!tpl/mods/list_item.html')

  const template = _.template(tpl)

  return Marionette.ItemView.extend({
    tagName: 'tr',
    template: template,

    events: {
      'click .destroy': 'deleteMod'
    },

    deleteMod: function (event) {
      const self = this
      sweetAlert({
          title: 'Are you sure?',
          text: 'The mod will be deleted from the server!',
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
