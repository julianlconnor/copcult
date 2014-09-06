define([
  'expect',
  'sinon',
  'react',
  'jsx!shared/js/components/ladda',
], function(expect, sinon, React, LaddaButton) {

  describe('Signup View', function() {
    var root;

    beforeEach(function() {
      root = document.createElement('div');
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('becomes disabled when the state/prop disabled is true', function() {
      var ladda = React.renderComponent(new LaddaButton({
        disabled: false
      }), root);
      
      expect(ladda.getDOMNode().hasAttribute('disabled')).to.be(false);
      ladda.setProps({ disabled: true });
      expect(ladda.getDOMNode().hasAttribute('disabled')).to.be(true);
    });

  });

});
