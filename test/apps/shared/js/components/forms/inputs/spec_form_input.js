define([
  'jquery',
  'expect',
  'sinon',
  'q',
  'react',
  'underscore',
  'shared/js/models/base',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input',
  'react.backbone'
], function($, expect, sinon, q, React, _, BaseModel, BaseFormMixin, FormInput) {

  describe('React base form', function() {
    var root, formView, testModel;

    var TU = React.addons.TestUtils;

    var ExampleForm = React.createClass({
      mixins: [BaseFormMixin],

      handleSubmit: function(event) {
        event.preventDefault();
        return this.props.model.save();
      },

      renderForm: function() {
        /* jshint newcap: false */
        return React.DOM.form({ onSubmit: this.handleSubmit },
          React.DOM.fieldset({},
            FormInput({attr: 'foo', className: 'foo', ref: 'foo'}),
            FormInput({attr: 'bar', className: 'bar'}),
            FormInput({attr: 'baz', className: 'baz', ref: 'baz', hideError: true})
          )
        );
      }
    });

    var TestModel = BaseModel.extend({
      errorMessages: {
        foo: 'wtf mate',
        bar: 'omg why',
        baz: 'oh shit'
      },

      validation: {
        foo: {
          pattern: /^foo$/
        },

        bar: {
          pattern: /^bar$/
        },

        baz: {
          pattern: /^baz$/
        }
      }
    });

    beforeEach(function() {
      root = document.createElement('div');
      testModel = new TestModel();
      formView = React.renderComponent(new ExampleForm({model: testModel}), root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('works', function() {
      expect(formView).to.be.ok();
    });

    it('updates the attr value when user changes field', function() {
      var el = root.querySelector('input.foo');
      el.value = 'foo';
      TU.Simulate.change(el);

      expect(testModel.get('foo')).to.be('foo');
    });

    it('updates the input value when the attr value is changed', function() {
      var el = root.querySelector('input.foo');
      testModel.set('foo', 'foo');

      expect(el.value).to.be('foo');
    });

    describe('validation', function() {

      it('does not display validation errors when hideError is passed', function(done) {
        var baz = formView.refs.baz;
        var input = baz.refs.fieldInput.getDOMNode();
        input.value = 'ba';

        TU.Simulate.submit(formView.getDOMNode());

        /**
        * Note: first wait for the input to re-render, then wait for async
        * backbone.validate events to trigger.
        */
        TU.nextUpdate(baz, function() {
          _.defer(function() {
            var validationError = baz.refs.validationError.getDOMNode();
            expect(validationError.classList.contains('show-validation')).to.be(false);
            done();
          });
        });
      });

      it('handles specific server-side errors', function() {
        // grab form, trigger `validated` with appropriate args and
        // ensure that server-side error dom elements exist

        testModel.trigger('validated', false, testModel, {
          _serverSide: true,
          foo: testModel.errorMessages.foo
        });

        var formInput = formView.refs.foo;

        var errorDiv = TU.findRenderedDOMComponentWithClass(formInput, 'validation-error');

        expect(errorDiv.props.children).to.be(testModel.errorMessages.foo);

        // continue displaying errors after revalidation
        testModel.trigger('validated', true, testModel);
        expect(errorDiv.props.children).to.be(testModel.errorMessages.foo);
        expect(errorDiv.props.className).to.contain('show-validation');
      });

    });

  });

});
