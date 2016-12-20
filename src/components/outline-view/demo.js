require('.');
require('../demo/index');

var Vue = require('vue');

var demo = Vue.component('demo-outline-view', {
  created: function () {
    this.$on('outline-view:selection-did-change', function (item) {
      console.log(item);
    });
  }
});

new Vue({
  el: '#app'
});
