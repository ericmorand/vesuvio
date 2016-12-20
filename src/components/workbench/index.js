require('../navigation/app-bar');
require('../navigation/resource-explorer');
require('../data-viewer');
require('../url-viewer');

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
      default: function () {
        return [
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

    this.$on('resource-explorer:resource-did-change', function (item) {
      if (item) {
        this.component = item.component;
        this.resource = item;
      }
      else {
        this.component = null;
        this.resource = null;
      }
    });

    this.$on('url-viewer:device-did-change', function (device) {
      this.device = device;
    });

    this.$on('url-viewer:direction-did-change', function (direction) {
      this.direction = direction;
    });
  },
  methods: {
    onOverlayClick: function(e) {
      this.componentExplorerExpanded = false;
    },
    appBarIsPreviousButtonEnabled: function(appBar) {
      return true;
    },
    appBarIsNextButtonEnabled: function(appBar) {
      return false;
    }
  }
});