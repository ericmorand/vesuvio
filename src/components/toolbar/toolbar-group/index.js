require('../toolbar-button');

const Vue = require('vue');

module.exports = Vue.component('toolbar-group', {
  template: require('./templates/index.html'),
  props: {
    title: null,
    buttons: {
      type: Array,
      default: []
    }
  },
  created: function() {
    this.$on('toolbar-button:click', function (item) {
      console.log(item);
    });
  },
  methods: {
    onMenuButtonClick: function(e) {
      this.$parent.$emit('app-bar:menu-button-click', e);
    }
  }
});