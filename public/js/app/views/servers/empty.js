define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const tpl = require('text!tpl/servers/empty.html')

  return Marionette.ItemView.extend({
    tagName: 'tr',
    template: _.template(tpl),

    initialize: function (options) {
      this.servers = options.servers
    }
  })
})
