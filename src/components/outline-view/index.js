const Vue = require('vue');

Vue.component('outline-view-item', {
  template: require('./templates/item.html'),
  props: {
    item: null,
    level: {
      type: Number,
      default: 0
    },
    selection: null,
    delegate: null
  },
  data: function () {
    return {
      expanded: false
    }
  },
  computed: {
    itemClass: function() {
      var result = {};

      // {'leaf': (item.children.length < 1), 'expanded': expanded, 'selected': selected}
      if (!this.item.children.length) {
        result.leaf = true;
      }

      if (this.expanded) {
        result.expanded = true;
      }

      if (this.selected) {
        result.selected = true;
      }

      if (this.delegate) {
        var additionalClass = this.delegate.outlineViewClassForItem(this, this.item);

        result[additionalClass] = true;
      }

      return result;
    },
    selected: function() {
      return (this.selection == this.item);
    }
  },
  created: function() {
    var that = this;

    this.$on('outline-view-item:click', function(item) {
      that.$parent.$emit('outline-view-item:click', item);
    });
  },
  methods: {
    onExpanderClick: function (e) {
      this.expanded = !this.expanded;
    },
    onItemClick: function(e) {
      this.$parent.$emit('outline-view-item:click', this.item);
    }
  }
});

module.exports = Vue.component('outline-view', {
  template: require('./templates/index.html'),
  props: {
    root: null,
    delegate: null
  },
  data: function() {
    return {
      selection: null
    }
  },
  created: function() {
    var that = this;

    this.$on('outline-view-item:click', function(item) {
      var shouldSelect = true;

      if (this.delegate) {
        shouldSelect = this.delegate.outlineViewShouldSelectItem(this, item);
      }

      if (shouldSelect) {
        that.selection = item;
      }
    });
  },
  watch: {
    selection: function(val, oldVal) {
        this.$parent.$emit('outline-view:selection-did-change', this.selection);
    }
  }
});