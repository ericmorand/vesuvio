require('../navigation/app-bar');
require('../navigation/component-explorer');

const Vue = require('vue');

module.exports = Vue.component('workbench', {
  template: require('./templates/index.html'),
  props: {
    title: null
  },
  data: function() {
    return {
      componentExplorerExpanded: false
    }
  },
  created: function () {
    this.$on('app-bar:menu-button-click', function () {
      this.componentExplorerExpanded = !this.componentExplorerExpanded;
    });
  },
});