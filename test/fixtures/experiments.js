define({
  foo: {
    bar: function() {
    	return 'baz';
    },
    segmentation_test: function() {
    	return (this.segment(0.5, 'segmentation_test')) ? 'A' : 'B';
    }
  }
});