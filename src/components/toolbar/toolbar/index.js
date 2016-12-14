const Vue = require('vue');

module.exports = Vue.component('toolbar', {
  template: require('./templates/index.html'),
  props: {
    name: null
  }
});