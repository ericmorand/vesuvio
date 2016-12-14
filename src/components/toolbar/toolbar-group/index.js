require('../toolbar-button');

const Vue = require('vue');

module.exports = Vue.component('toolbar-group', {
  template: require('./templates/index.html'),
  props: {
    title: null
  }
});