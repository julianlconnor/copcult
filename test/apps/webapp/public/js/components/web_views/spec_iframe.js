define([
  'expect',
  'sinon',
  'react',
  'jsx!shared/js/components/spinner',
  'jsx!shabu/public/js/components/web_views/iframe'
], function(expect, sinon, React, Spinner, WebViewIframe) {

  var TU = React.addons.TestUtils;

  describe('Web view Iframe', function() {

    describe('initial rendering', function() {
      var iframe;
      beforeEach(function() {
        iframe = TU.renderIntoDocument(new WebViewIframe({
          handleEvent: sinon.stub()
        }));
      });

      it('calls handleEvent when google closure event is triggered', function() {
        window.goog.events.dispatchEvent(window.goog.dom.getElement('header'), 'foo');

        expect(iframe.props.handleEvent.called).to.be(true);
        expect(iframe.props.handleEvent.args[0][0]).to.be('foo');
      });

      it('displays the spinner while the isLoaded method is being called', function() {
        expect(iframe.getInitialState().isLoading).to.be(true);
        expect(TU.findRenderedComponentWithType(iframe, Spinner)).to.be.ok();
      });
    });


    describe('"isLoaded"', function() {
      var webview;
      var iframe;

      beforeEach(function() {
        webview = new WebViewIframe({
          handleEvent: sinon.stub(),
          timeout: 1
        });

        sinon.stub(webview, 'componentDidMount');
        iframe = TU.renderIntoDocument(webview);
      });

      it('should return a fulfilled promise if it loads innerHTML of the "iframe"', function(done) {
        // fake iframe contents
        var getDOMNodeStub = sinon.stub(iframe.iframe, 'getDOMNode');
        getDOMNodeStub.returns({ contentDocument: { body: { innerHTML: true } } });
        var promise = iframe.isLoaded();
        promise.finally(function() {
          expect(promise.isFulfilled()).to.be(true);
          done();
        });
      });

      it('should return a rejected promise when it times out', function(done) {
        var getDOMNodeStub = sinon.stub(iframe.iframe, 'getDOMNode');
        getDOMNodeStub.returns({ contentDocument: { body: { innerHTML: false } } });
        var promise = iframe.isLoaded();
        promise.finally(function() {
          expect(promise.isFulfilled()).to.be(false);
          done();
        });
      });
    });

  });
});
