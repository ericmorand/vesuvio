require('.');
require('../demo');

let Vue = require('vue');

let demo = Vue.component('demo-workbench', {
  created: function () {
    this.$on('app-bar:menu-button-click', function(e) {
      console.log(e);
    });
  }
});

new Vue({
  el: '#app'
});
