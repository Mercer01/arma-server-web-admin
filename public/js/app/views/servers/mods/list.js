define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const Mods = require('app/collections/mods')

  const ModsListView = require('app/views/mods/list')

  const ListItemView = require('app/views/servers/mods/list_item')

  const tpl = require('text!tpl/servers/mods/list.html')

  return ModsListView.extend({
    childView: ListItemView,
    template: _.template(tpl),

    events: {
      'click .check-all': 'checkAll',
      'click .uncheck-all': 'uncheckAll'
    },

    buildChildView: function (item, ChildViewType, childViewOptions) {
      const options = _.extend({ model: item, server: this.options.server }, childViewOptions)
      const view = new ChildViewType(options)
      return view
    },

    changeAllCheckbox: function (checked) {
      this.$('input:checkbox').map(function (idx, el) {
        return $(el).prop('checked', checked)
      })
    },

    checkAll: function (e) {
      e.preventDefault()
      this.changeAllCheckbox(true)
    },

    uncheckAll: function (e) {
      e.preventDefault()
      this.changeAllCheckbox(false)
    },

    serialize: function () {
      return {
        mods: this.$('input:checkbox:checked').map(function (idx, el) {
          return $(el).val()
        }).get()
      }
    }
  })
})
