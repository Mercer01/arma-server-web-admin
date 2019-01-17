define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Marionette = require('marionette')

  const MissionRotations = require('app/collections/mission_rotations')

  const AvailableListView = require('app/views/servers/missions/available/list')

  const RotationListView = require('app/views/servers/missions/rotation/list')

  const tpl = require('text!tpl/servers/missions/index.html')

  return Marionette.LayoutView.extend({
    template: _.template(tpl),

    regions: {
      availableView: '#available',
      rotationView: '#rotation'
    },

    modelEvents: {
      'change': 'serverUpdated'
    },

    initialize: function (options) {
      this.missions = options.missions

      this.rotationCollection = new MissionRotations(this.model.get('missions'))

      const self = this

      this.availableListView = new AvailableListView({ collection: this.missions })
      this.availableListView.on('add', function (model) {
        self.rotationCollection.add([{
          name: model.get('name').replace('.pbo', '')
        }])
      })
      this.rotationListView = new RotationListView({ collection: this.rotationCollection })
    },

    onRender: function () {
      this.availableView.show(this.availableListView)
      this.rotationView.show(this.rotationListView)
    },

    serverUpdated: function () {
      this.rotationCollection.set(this.model.get('missions'))
    },

    serialize: function () {
      return {
        missions: this.rotationCollection.toJSON()
      }
    }
  })
})
