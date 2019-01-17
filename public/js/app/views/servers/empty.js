define(function (require) {

  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    tpl = require('text!tpl/servers/empty.html')

  return Marionette.ItemView.extend({
    tagName: "tr",
    template: _.template(tpl),

    initialize: function (options) {
      this.servers = options.servers;
    },
  });

});
