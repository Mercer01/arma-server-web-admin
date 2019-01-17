define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const tpl = require('text!tpl/layout.html')

  return Marionette.LayoutView.extend({
    template: _.template(tpl),

    regions: {
      navigation: '#navigation',
      content: '#content'
    }
  })
})
