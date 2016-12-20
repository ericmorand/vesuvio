const Vue = require('vue');

module.exports = Vue.component('app-bar', {
  template: require('./templates/index.html'),
  props: {
    title: null,
    delegate: null
  },
  computed: {
    isPreviousButtonEnabled: function() {
      if (this.delegate) {
        return this.delegate.appBarIsPreviousButtonEnabled(this);
      }

      return true;
    },
    isNextButtonEnabled: function() {
      if (this.delegate) {
        return this.delegate.appBarIsNextButtonEnabled(this);
      }

      return true;
    }
  },
  methods: {
    refreshUi: function() {

    },
    onMenuButtonClick: function(e) {
      this.$parent.$emit('app-bar:menu-button-click', e);
    },
    onPreviousButtonClick: function(e) {
      this.$parent.$emit('app-bar:previous-button-click', e);
    },
    onNextButtonClick: function(e) {
      this.$parent.$emit('app-bar:next-button-click', e);
    }
  }
});