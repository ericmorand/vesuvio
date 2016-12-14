const Vue = require('vue');

module.exports = Vue.component('search-input', {
  template: require('./templates/index.html'),
  props: {
    name: null
  }
});