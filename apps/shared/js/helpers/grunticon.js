define([], function() {
  var grunticon = function(type) {
    var css = [
      '/w/build/stylesheets/' + type + '/svg.css',
      '/w/build/stylesheets/' + type + '/png.css',
      '/w/build/stylesheets/' + type + '/fallback.css'
    ];
    var w = window;
    var svg = !!w.document.createElementNS && 
              !!w.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && 
              !!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1') &&
              !(window.opera && navigator.userAgent.indexOf('Chrome') === -1);

    var loadCSS = function(data) {
      var link = w.document.createElement('link');
      var ref = w.document.getElementsByTagName('script')[0];

      link.rel = 'stylesheet';
      link.href = css[ data && svg ? 0 : data ? 1 : 2 ];

      ref.parentNode.insertBefore(link, ref);
    };

    var img = new w.Image();

    img.onerror = function() {
      loadCSS(false);
    };

    img.onload = function() {
      loadCSS(img.width === 1 && img.height === 1);
    };

    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  };

  //grunticon('emoji');
  grunticon('icons');
  grunticon('assets');
});
