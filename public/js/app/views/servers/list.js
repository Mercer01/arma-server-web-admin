define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const Server = require('app/models/server')

  const AddServerView = require('app/views/servers/form')

  const EmptyView = require('app/views/servers/empty')

  const ListItemView = require('app/views/servers/list_item')

  const tpl = require('text!tpl/servers/list.html')

  const template = _.template(tpl)

  return Marionette.CompositeView.extend({
    childView: ListItemView,
    childViewContainer: 'tbody',
    template: template,

    emptyView: EmptyView,

    events: {
      'click #add-server': 'addServer'
    },

    buildChildView: function (item, ChildViewType, childViewOptions) {
      // build the final list of options for the item view type
      let options = _.extend({ model: item }, childViewOptions)

      if (ChildViewType == EmptyView) {
        options = _.extend({ servers: this.collection }, options)
      }

      // create the item view instance
      const view = new ChildViewType(options)
      // return it
      return view
    },

    addServer: function () {
      const view = new AddServerView({ model: new Server(), servers: this.collection })
      new Backbone.BootstrapModal({ content: view, servers: this.collection }).open()
    }
  })
})
