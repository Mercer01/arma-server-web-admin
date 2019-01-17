define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const swal = require('sweet-alert')

  const tpl = require('text!tpl/servers/list_item.html')

  const template = _.template(tpl)

  return Marionette.ItemView.extend({
    tagName: 'tr',
    template: template,

    events: {
      'click .clone': 'clone',
      'click .delete': 'delete'
    },

    modelEvents: {
      'change': 'serverUpdated'
    },

    clone: function (e) {
      const title = this.model.get('title') + ' Clone'
      const clone = this.model.clone()
      clone.set({ id: null, title: title })
      clone.save()
    },

    delete: function (event) {
      const self = this
      sweetAlert({
          title: 'Are you sure?',
          text: 'Your server configuration will be deleted!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn-danger',
          confirmButtonText: 'Yes, delete it!'
        },
        function () {
          self.model.destroy()
        })
    },

    serverUpdated: function (event) {
      this.render()
    }
  })
})
