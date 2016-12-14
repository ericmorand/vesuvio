require('.');
require('../demo/index');

var Vue = require('vue');

var demo = Vue.component('demo-search-input', {
  created: function () {
  }
});

new Vue({
  el: '#app'
});
