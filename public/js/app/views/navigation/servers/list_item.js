define(function (require) {

  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    tpl = require('text!tpl/navigation/servers/list_item.html'),

    template = _.template(tpl)

  return Marionette.ItemView.extend({
    tagName: "li",
    template: template
  });
});
