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
    }
  },
  data: function() {
    return {
      componentExplorerExpanded: false,
      component: null,
      resource: null
    }
  },
  created: function () {
    this.$on('app-bar:menu-button-click', function () {
      this.componentExplorerExpanded = !this.componentExplorerExpanded;
    });

    this.$on('component-explorer:selection-did-change', function (item) {
      this.resource = item;
    });
  }
});