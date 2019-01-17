define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const ListItemView = require('app/views/logs/list_item')

  const tpl = require('text!tpl/logs/list.html')

  const template = _.template(tpl)

  return Marionette.CompositeView.extend({
    childView: ListItemView,
    childViewContainer: 'tbody',
    template: template
  })
})
