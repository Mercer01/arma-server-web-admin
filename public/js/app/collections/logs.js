define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Log = require('app/models/log')

  return Backbone.Collection.extend({
    comparator: 'name',
    model: Log,
    url: '/api/logs/'
  })
})
