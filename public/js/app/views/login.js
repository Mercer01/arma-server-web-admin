define(function (require) {
  
  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    tpl = require('text!tpl/login.html')

  return Marionette.ItemView.extend({
    template: _.template(tpl)
  });
  
});
