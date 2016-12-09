const Vue = require('vue');

module.exports = Vue.component('outline-view', {
  template: require('./templates/index.html'),
  props: {
    root: null
  },
  data: function() {
    return {
      expanded: false
    }
  },
  methods: {

  }
});