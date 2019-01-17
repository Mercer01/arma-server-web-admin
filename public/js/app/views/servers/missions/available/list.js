define(function (require) {

  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    ListItemView = require('app/views/servers/missions/available/list_item'),
    tpl = require('text!tpl/servers/missions/available/list.html')

  return Marionette.CompositeView.extend({
    childView: ListItemView,
    childViewContainer: "tbody",
    template: _.template(tpl),

    buildChildView: function(item, ChildViewType, childViewOptions){
      const self = this
      const options = _.extend({ model: item }, childViewOptions)
      const view = new ChildViewType(options)
      view.on('add', function (model) {
        self.trigger('add', model);
      });
      return view;
    },
  });

});
