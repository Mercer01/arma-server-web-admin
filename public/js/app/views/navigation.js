define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const BootstrapModal = require('backbone.bootstrap-modal')

  const ServersListView = require('app/views/navigation/servers/list')

  const SettingsView = require('app/views/settings')

  const tpl = require('text!tpl/navigation.html')

  return Marionette.ItemView.extend({
    template: _.template(tpl),

    events: {
      'click #settings': 'settings'
    },

    initialize: function (options) {
      this.settings = options.settings
      this.servers = options.servers
      this.serversListView = new ServersListView({ collection: this.servers })
    },

    onDomRefresh: function () {
      this.serversListView.setElement('#servers-list')
      this.serversListView.render()
    },

    settings: function (event) {
      event.preventDefault()
      const view = new SettingsView({ model: this.settings })
      new Backbone.BootstrapModal({ content: view, animate: true, cancelText: false }).open()
    }
  })
})
