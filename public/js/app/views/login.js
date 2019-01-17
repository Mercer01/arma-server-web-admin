define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const tpl = require('text!tpl/login.html')

  return Marionette.ItemView.extend({
    template: _.template(tpl)
  })
})
