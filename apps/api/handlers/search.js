var _ = require('underscore');

var fixtures = [
  {
    id: 1,
    brand: 'Zanerobe',
    name: 'Lineback White',
    slug: 'lineback-white',
    image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
    url: 'http://zanerobe.com/product/lineback-white/',
    price: '59.95'
  },
  {
    id: 2,
    brand: 'Zanerobe',
    name: 'Cube White',
    slug: 'cube-white',
    image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
    url: 'http://zanerobe.com/product/cube-white/',
    price: '49.95'
  },
  {
    id: 3,
    brand: 'Zanerobe',
    name: 'Tall Tee - Black Acid',
    slug: 'tall-tee-black-acid',
    image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_142_MONO_0156.jpg',
    url: 'http://zanerobe.com/product/tall-tee-black-acid/',
    price: '39.95'
  }
];

function filterResults(query) {
  if ( !query ) {
    return [];
  }

  return _.filter(fixtures, function(fixture) {
    return fixture.brand.toLowerCase().indexOf(query) > -1 ||
           fixture.name.toLowerCase().indexOf(query) > -1;
  });
}

module.exports = {
  post: function(req, res) {
    /**
    * Return search fixtures for the time being.
    */
    console.log(req.param('query'));
    res.json({
      data: filterResults(req.param('query'))
    });
  }
};
