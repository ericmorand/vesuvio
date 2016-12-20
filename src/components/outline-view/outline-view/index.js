var Vue = require('vue');
var TreeModel = require('tree-model');

require('../outline-view-item');

module.exports = Vue.component('outline-view', {
  template: require('./templates/index.html'),
  props: {
    root: null,
    // delegate: null,
    level: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      tree: null,
      expandedNodes: [],
      selectedNodes: []
    }
  },
  computed: {

  },
  created: function() {
    this.$on('outline-view-item:item-click', function(item) {
      this.$parent.$emit('outline-view:item-click', item);
    });

    this.$on('outline-view-item:expander-click', function(item) {
      this.$parent.$emit('outline-view:expander-click', item);
    });

    var tree = new TreeModel();

    this.tree = tree.parse(this.root);

    console.log(this.tree.all());

    var that = this;

    this.walk = function(item, depth) {
      item.depth = depth;
      item.expanded = false;

      if (item.children.length > 0) {
        item.children.forEach(function(child) {
          that.walk(child, depth + 1);
        });
      }
    };

    this.walk(this.root, 0);
  },
  methods: {
    onExpanderClick: function (node) {
      // this.$parent.$emit('outline-view-item:expander-click', this.item);

      if (this.isNodeExpanded(node)) {
        this.collapseNode(node, true);
      }
      else {
        this.expandNode(node, false);
      }
    },
    onItemClick: function(node) {
      // this.$parent.$emit('outline-view-item:item-click', this.item);

      if (this.isNodeSelected(node)) {
        this.deselectNode(node);
      }
      else {
        this.selectNode(node);
      }
    },
    isNodeLeaf: function(node) {
      return (node.children.length < 1);
    },
    isNodeExpanded: function(node) {
      return this.expandedNodes.indexOf(node) > -1;
    },
    isNodeSelected: function(node) {
      return this.selectedNodes.indexOf(node) > -1;
    },
    isNodeVisible: function(node) {
      var that = this;

      var walk = function(node) {
        if (node.parent) {
          if (that.isNodeExpanded(node.parent)) {
            return walk(node.parent);
          }
          else {
            return false;
          }
        }
        else {
          return that.isNodeExpanded(node);
        }
      };

      return walk(node);
    },
    collapseNode: function(node, collapseChildren) {
      var that = this;
      var index = this.expandedNodes.indexOf(node);

      if (index > -1) {
        this.expandedNodes.splice(index, 1);

        if (collapseChildren) {
          // collapse children nodes
          node.walk(function (childNode) {
            var index = that.expandedNodes.indexOf(childNode);

            if (index > -1) {
              that.expandedNodes.splice(index, 1);
            }
          });
        }
      }
    },
    expandNode: function(node, expandChildren) {
      this.expandedNodes.push(node);

      if (expandChildren) {
        // todo
      }
    },
    selectNode: function(node) {
      if (this.selectedNodes.indexOf(node) < 0) {
        this.selectedNodes.push(node);
      }
    },
    deselectNode: function(node) {
      var index = this.selectedNodes.indexOf(node);

      if (index > -1) {
        this.selectedNodes.splice(index, 1);
      }
    },
    getNodeClasses: function(node) {
      var classes = [];

      if (this.isNodeLeaf(node)) {
        classes.push('leaf');
      }

      if (this.isNodeExpanded(node)) {
        classes.push('expanded');
      }

      if (this.isNodeSelected(node)) {
        classes.push('selected');
      }

      return classes;
    }
  },
  watch: {
    root: function(val) {
      this.walk(val, 0);
    }
  }
});