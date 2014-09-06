define([
  'q',
  'sinon',
  'react',
  'backbone',
  'jsx!shabu/public/js/components/settings/item',
], function(q, sinon, React, Backbone, SettingsItem) {

  var TU = React.addons.TestUtils;

  describe('Settings Item', function() {

    it('successfully returns the correct URL', function() {
      var item = new SettingsItem({
        item: 'foo',
        group: 'bar',
      });
      expect(SettingsItem.getUrl(item.props.group, item.props.item, item.props.inApp))
        .to.be('/settings/bar/foo');

      item = new SettingsItem({
        item: 'foo',
        group: 'bar',
        inApp: false
      });
      expect(SettingsItem.getUrl(item.props.group, item.props.item, item.props.inApp))
        .to.be('/account/settings/foo');

    });

    it('handles click', function() {
      var backboneStub = sinon.stub(Backbone.history, 'navigate');
      var item = new SettingsItem({
        item: 'foo',
        group: 'bar'
      });
      var url = SettingsItem.getUrl(item.props.group, item.props.item, item.props.inApp);

      var renderedItem = TU.renderIntoDocument(item);
      TU.Simulate.click(renderedItem.refs.link);

      expect(backboneStub.called).to.be(true);
      expect(backboneStub.calledWith(url)).to.be(true);
      backboneStub.restore();
    });
  });
});
