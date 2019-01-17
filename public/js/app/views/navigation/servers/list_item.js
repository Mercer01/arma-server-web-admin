define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const tpl = require('text!tpl/navigation/servers/list_item.html')

  const template = _.template(tpl)

  return Marionette.ItemView.extend({
    tagName: 'li',
    template: template
  })
})
