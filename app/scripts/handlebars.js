/*global define:false */
define(function() {
  'use strict';

  var Handlebars = window.Handlebars,
      baseURL = (window.baseUrl || '') + '../templates/';

  Handlebars.getTemplate = function(name) {

    // this.templates is populated by with the precompiled
    // templates, if they exist. If this.templates doesn't 
    // exist, or the requested template is missing, try to 
    // load it.
    if (!Handlebars.templates || !Handlebars.templates[name]) {
      $.ajax({
        url: baseURL + name + '.handlebars',
        dataType: 'html',
        async: false,
        success: function(data) {
          if (!Handlebars.templates) {
            Handlebars.templates = {};
          }
          Handlebars.templates[name] = Handlebars.compile(data);
        },
        error: function() {
          console.error('Failed to load: ' + name); // EXEMPT
        }
      });
    }
    return Handlebars.templates[name];
  };
});
