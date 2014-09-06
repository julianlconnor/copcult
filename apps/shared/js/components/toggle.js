define([
], function() {

  /*
   * The littlest mixin.
   * (Will eventually have helper(s) around toggling between components /with animations/)
   */

  var ToggleMixin = {
    getInitialState: function() {
      return { toggled: false };
    },

    toggle: function() {
      this.setState({
        toggled: !this.state.toggled
      });
    }
  };

  return ToggleMixin;
});
