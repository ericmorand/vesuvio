var Vue = require('vue');

module.exports = Vue.component('tab-view', {
  template: require('./templates/tab-view.html'),
  props: {
    tabs: []
  },
  computed: {
    content: function () {
      if (this.selectedTab) {
        return this.selectedTab.content;
      }

      return null;
    }
  },
  data: function () {
    return {
      selectedTab: null
    }
  },
  ready: function () {
    if (!this.selectedTab) {
      this.selectedTab = this.tabs[0];
    }
  },
  methods: {
    onTabClick: function (tab) {
      this.selectedTab = tab;
    },
    onTabCloseButtonClick: function (tab) {
      let index = this.tabs.indexOf(tab);

      if (index > -1) {
        this.tabs.splice(index, 1);

        if (this.selectedTab == tab) {
          if (index == 0) {
            this.selectedTab = this.tabs[0];
          }
          else {
            this.selectedTab = this.tabs[index - 1];
          }
        }
      }
    }
  }
});