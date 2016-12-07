require('.');
require('../../demo');

let Vue = require('vue');

let demo = Vue.component('demo-navigation-component-explorer', {
  created: function () {
    this.$on('app-bar:menu-button-click', function(e) {
      console.log(e);
    });
  }
});

new Vue({
  el: '#app'
});
