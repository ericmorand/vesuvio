require('.');
require('../demo/index');

var Vue = require('vue');

var demo = Vue.component('demo-search-input', {
  created: function () {
    this.$on('search-input:value-did-change', function(val) {
      console.log('search-input:value-did-change', val);
    })
  }
});

new Vue({
  el: '#app'
});
