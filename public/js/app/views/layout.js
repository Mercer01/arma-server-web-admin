define(function (require) {
  
  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    tpl = require('text!tpl/layout.html')

  return Marionette.LayoutView.extend({
    template: _.template(tpl),
    
    regions: {
      navigation: "#navigation",
      content: "#content"
    }
  });
  
});
