define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const UploadView = require('app/views/missions/upload')

  const WorkshopView = require('app/views/missions/workshop')

  const ListView = require('app/views/missions/list')

  const tpl = require('text!tpl/missions/index.html')

  return Marionette.LayoutView.extend({
    template: _.template(tpl),

    regions: {
      uploadView: '#upload',
      workshopView: '#workshop',
      listView: '#list'
    },

    events: {
      'click #refresh': 'refresh'
    },

    onRender: function () {
      this.uploadView.show(new UploadView())
      this.workshopView.show(new WorkshopView())
      this.listView.show(new ListView({ collection: this.options.missions }))
    },

    refresh: function (event) {
      event.preventDefault()
      $.ajax({
        url: '/api/missions/refresh',
        type: 'POST',
        success: function (resp) {

        },
        error: function (resp) {

        }
      })
    }
  })
})
