define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const ListItemView = require('app/views/servers/missions/available/list_item')

  const tpl = require('text!tpl/servers/missions/available/list.html')

  return Marionette.CompositeView.extend({
    childView: ListItemView,
    childViewContainer: 'tbody',
    template: _.template(tpl),

    buildChildView: function (item, ChildViewType, childViewOptions) {
      const self = this
      const options = _.extend({ model: item }, childViewOptions)
      const view = new ChildViewType(options)
      view.on('add', function (model) {
        self.trigger('add', model)
      })
      return view
    }
  })
})
