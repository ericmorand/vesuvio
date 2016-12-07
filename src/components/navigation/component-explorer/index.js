const Vue = require('vue');

module.exports = Vue.component('component-explorer', {
  template: require('./templates/index.html'),
  props: {
    title: null
  },
  methods: {
    onMenuButtonClick: function(e) {
      this.$parent.$emit('app-bar:menu-button-click', e);
    }
  }
});