define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const MissionRotation = require('app/models/mission_rotation')

  const ListItemView = require('app/views/servers/missions/rotation/list_item')

  const tpl = require('text!tpl/servers/missions/rotation/list.html')

  return Marionette.CompositeView.extend({
    childView: ListItemView,
    childViewContainer: 'tbody',
    template: _.template(tpl),

    events: {
      'click .add-mission': 'addMission'
    },

    addMission: function (e) {
      e.preventDefault()
      this.collection.add(new MissionRotation())
    }
  })
})
