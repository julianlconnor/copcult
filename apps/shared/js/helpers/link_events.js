define([
  'jquery',
  'backbone'
], function($, Backbone) {


  return function start() {
    var openLinkInTab = false;

    // Only need this for pushState enabled browsers
    if (Backbone.history && Backbone.history._hasPushState) {

      $(document).keydown(function(event) {
        if (event.ctrlKey || event.keyCode === 91) {
          openLinkInTab = true;
        }
      });

      $(document).keyup(function() {
        openLinkInTab = false;
      });

      // Use delegation to avoid initial DOM selection and allow all matching elements to bubble
      $(document).delegate("a[data-in-app]", "click", function(evt) {
        // Get the anchor href and protcol
        var href = $(this).attr("href");
        var protocol = this.protocol + "//";

        // Ensure the protocol is not part of URL, meaning its relative.
        // Stop the event bubbling to ensure the link will not cause a page refresh.
        if (!openLinkInTab && href.slice(protocol.length) !== protocol) {
          evt.preventDefault();
          evt.stopPropagation();

          // Note by using Backbone.history.navigate, router events will not be
          // triggered.  If this is a problem, change this to navigate on your
          // router.
          href = href.replace(/^\/w/, '');
          Backbone.history.navigate(href, true);
        }
      });
    }
  };
});
