define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Server = require('app/models/server')

  return Backbone.Collection.extend({
    comparator: function (a, b) {
      return a.get('title').toLowerCase().localeCompare(b.get('title').toLowerCase())
    },
    model: Server,
    url: '/api/servers/'
  })
})
