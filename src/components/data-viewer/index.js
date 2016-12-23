const Vue = require('vue');
const path = require('path');

require('../pretty-print');

module.exports = Vue.component('data-viewer', {
  template: require('./templates/index.html'),
  props: {
    data: null,
    lang: null
  }
});