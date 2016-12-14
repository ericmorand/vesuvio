require('.');
require('../demo');
require('../responsive.html');

var Vue = require('vue');

var demo = Vue.component('demo-workbench', {
  created: function () {
    this.$on('app-bar:menu-button-click', function(e) {
      console.log(e);
    });
  }
});

new Vue({
  el: '#app'
});
