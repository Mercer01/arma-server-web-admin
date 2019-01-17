define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const ModListItemView = require('app/views/mods/list_item')

  const tpl = require('text!tpl/servers/mods/list_item.html')

  const template = _.template(tpl)

  return ModListItemView.extend({
    tagName: 'tr',
    template: template,

    templateHelpers: function () {
      return {
        enabled: this.options.server.get('mods').indexOf(this.model.get('name')) > -1
      }
    }
  })
})
