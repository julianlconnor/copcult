define([
  'jquery',
  'expect',
  'sinon',
  'react',
  'q',
  'jsx!shared/js/components/forms/inputs/mixin',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input',
  'shared/js/models/base',
], function($, expect, sinon, React, q, InputMixin, BaseFormMixin, FormInput, BaseModel) {

  describe('Input Mixin', function() {
    var ContainerForm;
    var root;

    beforeEach(function() {
      root = document.createElement('div');
    });

    it('renders the correct input type', function() {
      ContainerForm = React.createClass({
        mixins: [BaseFormMixin],

        handleSubmit: function(event) {
          event.preventDefault();
        },

        renderForm: function() {
          return React.DOM.form({ onSubmit: this.handleSubmit },
            React.DOM.fieldset(
              {},
              FormInput({attr: 'foo', type: 'textarea', ref: 'foo'})
            )
         );
        }
      });

      var tempForm = React.renderComponent(new ContainerForm({model: new BaseModel()}), root);
      var fieldInput = tempForm.refs.foo.refs.fieldInput;
      expect(fieldInput.getDOMNode().tagName).to.be('TEXTAREA');

    });

    it('correctly throws an error when using button group without options', function() {
      ContainerForm = React.createClass({
        mixins: [BaseFormMixin],

        handleSubmit: function(event) {
          event.preventDefault();
        },

        renderForm: function() {
          return React.DOM.form({ onSubmit: this.handleSubmit },
            React.DOM.fieldset(
              {},
              FormInput({attr: 'foo', type: 'selectGroup', ref: 'foo'})
            )
         );
        }
      });

      var model = new BaseModel();

      expect( function() {
        new ContainerForm({model: model}).bind(ContainerForm)
      }).to.throwException('A select group must be provided options');


    });

    it('sets the model correctly when using a button group', function() {
      var model = new BaseModel();
      var modelStub = sinon.stub(model, 'set');

      ContainerForm = React.createClass({
        mixins: [BaseFormMixin],

        handleSubmit: function(event) {
          event.preventDefault();
        },

        renderForm: function() {
          return React.DOM.form({ onSubmit: this.handleSubmit },
            React.DOM.fieldset(
              {},
              FormInput({attr: 'foo', type: 'selectGroup', ref: 'foo', options: ['1', '2']})
            )
         );
        }
      });

      var tempForm = React.renderComponent(new ContainerForm({model: model}), root);
      var fieldInput = tempForm.refs.foo.refs.fieldInput;
      fieldInput.props.children[0].props.onClick({ target: { value: 'bar' } });

      expect(modelStub.called).to.be(true);
      expect(modelStub.calledWith('foo','bar')).to.be(true);

    });


  });

});
