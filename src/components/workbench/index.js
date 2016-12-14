require('../navigation/app-bar');
require('../navigation/component-explorer');
require('../resource-viewer');
require('../component-viewer');

const Vue = require('vue');

module.exports = Vue.component('workbench', {
  template: require('./templates/index.html'),
  props: {
    title: null,
    components: {
      type: Array,
      default: []
    },
    devices: {
      type: Array,
      default: []
    },
    directions: {
      type: Array,
      default: [
        {
          name: 'ltr',
          title: 'Left-to-rigth'
        },
        {
          name: 'rtl',
          title: 'Right-to-left'
        }
      ]
    }
  },
  data: function () {
    return {
      componentExplorerExpanded: false,
      component: null,
      resource: null,
      device: null,
      direction: null
    }
  },
  created: function () {
    this.$on('app-bar:menu-button-click', function () {
      this.componentExplorerExpanded = !this.componentExplorerExpanded;
    });

    this.$on('component-explorer:selection-did-change', function (item) {
      this.resource = item;
    });

    this.$on('component-viewer:device-did-change', function (device) {
      this.device = device;
    });

    this.$on('component-viewer:direction-did-change', function (direction) {
      this.direction = direction;
    });
  }
});