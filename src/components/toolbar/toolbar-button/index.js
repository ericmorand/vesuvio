const Vue = require('vue');

module.exports = Vue.component('toolbar-button', {
  template: require('./templates/index.html'),
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
});