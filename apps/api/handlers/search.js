module.exports = function(req, res, next) {
  /**
  * Return search fixtures for the time being.
  */
  var fixtures = [
    {
      id: 1,
      brand: 'Zanerobe',
      name: 'Lineback White',
      image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
      price: '59.95'
    },
    {
      id: 2,
      brand: 'Zanerobe',
      name: 'Cube White',
      image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
      price: '49.95'
    },
    {
      id: 3,
      brand: 'Zanerobe',
      name: 'Lineback White',
      image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
      price: '59.95'
    }
  ];

  res.json(fixtures);
};
