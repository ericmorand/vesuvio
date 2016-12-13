const Vue = require('vue');

module.exports = Vue.component('toolbar-button', {
  template: require('./templates/index.html'),
  props: {
    name: {
      type: String,
      required: true
    },
    data: null,
    title: null,
    label: null,
    active: {
      type: Boolean,
      default: false
    },
    icon: null
  },
  computed: {
    classes: function() {
      var classes = [];

      if (this.icon) {
        classes.push('icon');
        classes.push(this.icon);
      }

      if (this.active) {
        classes.push('active');
      }

      return classes;
    }
  },
  methods: {
    onClick: function(e) {
      this.$parent.$emit('toolbar-button:click', {
        name: this.name,
        data: this.data
      });
    }
  }
});