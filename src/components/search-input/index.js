const Vue = require('vue');
const lodash = require('lodash');

module.exports = Vue.component('search-input', {
  template: require('./templates/index.html'),
  props: {
    delegate: null
  },
  data: function() {
    return {
      input: null,
      value: null
    }
  },
  mounted: function() {
    var that = this;
    var inputs = this.$el.getElementsByTagName('input');

    if (inputs.length > 0) {
      for (var i = 0; i < inputs.length; i++) {
        that.input = inputs[i];
      }
    }

    this.value = that.input.value;

    this.input.oninput = lodash.throttle(this.onInputValueChange, 500, {
      leading: false
    });
  },
  methods: {
    onInputValueChange: function(e) {
      this.value = e.target.value;
    }
  },
  watch: {
    value: function(val) {
      if (this.delegate) {
        this.delegate.valueDidChange(val);
      }

      this.$parent.$emit('search-input:value-did-change', val);
    }
  }
});