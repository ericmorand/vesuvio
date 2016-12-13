require('.');
require('../../demo/index');

var Vue = require('vue');

var demo = Vue.component('demo-toolbar-button', {
  created: function() {
    this.$on('toolbar-button:click', function (item) {
      console.log(item);
    });
  }
});

new Vue({
  el: '#app'
});
