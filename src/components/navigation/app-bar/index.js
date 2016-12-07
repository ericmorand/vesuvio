const Vue = require('vue');

module.exports = Vue.component('app-bar', {
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