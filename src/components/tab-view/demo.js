require('.');
require('../demo');

let Vue = require('vue');

new Vue({
  el: '#app',
  props: {
    tabs: [],
    selectedTab: null
  },
  methods: {
    addTab: function () {
      let randomColor = Math.round(Math.random() * 1000000);
      let randomStatus = Math.round(Math.random() * 3);
      let randomTitle = Math.round(Math.random() * 3);

      switch (randomStatus) {
        case 1:
          randomStatus = 'error';
          break;
        case 2:
          randomStatus = 'warning';
          break;
        default:
          randomStatus = 'success';
      }

      switch (randomTitle) {
        case 1:
          randomTitle = 'lorem/ipsum';
          break;
        case 2:
          randomTitle = 'lorem/ipsum/dolor';
          break;
        default:
          randomTitle = 'lorem/ipsum/dolor/sit';
      }

      let tab = {
        title: randomTitle,
        status: randomStatus,
        content: '<img src=\"//placehold.it/1920x1080/' + randomColor + '?text=' + randomTitle + '\">'
      };

      this.tabs.push(tab);
      this.selectedTab = tab;
    }
  }
});