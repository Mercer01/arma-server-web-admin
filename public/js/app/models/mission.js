define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  return Backbone.Model.extend({
    defaults: {
      name: ''
    },
    idAttribute: 'name',
    urlRoot: '/api/missions/'
  })
})
