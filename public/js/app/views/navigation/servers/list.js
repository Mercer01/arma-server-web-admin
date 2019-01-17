define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const ListItemView = require('app/views/navigation/servers/list_item')

  return Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: ListItemView
  })
})
